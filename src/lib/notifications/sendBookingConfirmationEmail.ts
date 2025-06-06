import fetch from 'node-fetch';

const BREVO_API_KEY = process.env.BREVO_API_KEY!;
const SENDER_EMAIL = 'mike@solutionsdeveloped.co.uk';
const SENDER_NAME = 'Iris Infinity Studio';
const ADMIN_EMAIL = 'mike@solutionsdeveloped.co.uk';

export async function sendBookingConfirmationEmail({
  to,
  name,
  date,
  time,
  people,
  isAdminCopy = false
}: {
  to: string;
  name: string;
  date: string;
  time: string;
  people: number;
  isAdminCopy?: boolean;
}) {
  const html = isAdminCopy
    ? `
      <div style="font-family:Poppins,sans-serif;color:#fff;background:#000;padding:20px;border-radius:8px;">
        <h2 style="color:#94f7ff;">New Booking Received</h2>
        <p><strong>Customer:</strong> ${name} (${to})</p>
        <p><strong>Date:</strong> ${date}</p>
        <p><strong>Time:</strong> ${time}</p>
        <p><strong>People:</strong> ${people}</p>
      </div>
    `
    : `
      <div style="font-family:Poppins,sans-serif;color:#fff;background:#000;padding:20px;border-radius:8px;">
        <h2 style="color:#94f7ff;">Booking Confirmed</h2>
        <p>Hi <strong>${name}</strong>,</p>
        <p>Your session at <strong>Iris Infinity Studio</strong> is confirmed:</p>
        <ul>
          <li><strong>Date:</strong> ${date}</li>
          <li><strong>Time:</strong> ${time}</li>
          <li><strong>People:</strong> ${people}</li>
        </ul>
        <p>We look forward to seeing you!</p>
        <p style="color:#aaa;">Star maps, soul prints, and iris photography ✨</p>
      </div>
    `;

  const payload = {
    sender: { name: SENDER_NAME, email: SENDER_EMAIL },
    to: [{ email: to }],
    subject: isAdminCopy
      ? `New Booking from ${name}`
      : `Your Iris Studio Booking Confirmation`,
    htmlContent: html,
  };

  const res = await fetch('https://api.brevo.com/v3/smtp/email', {
    method: 'POST',
    headers: {
      'api-key': BREVO_API_KEY,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const text = await res.text();
    console.error(`❌ Booking email failed to ${to}:`, text);
  } else {
    console.log(`✅ Booking email sent to ${to}`);
  }

  // Also notify admin
  if (!isAdminCopy) {
    await sendBookingConfirmationEmail({
      to: ADMIN_EMAIL,
      name,
      date,
      time,
      people,
      isAdminCopy: true,
    });
  }
}
