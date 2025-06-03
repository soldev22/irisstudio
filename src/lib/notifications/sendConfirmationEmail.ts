// src/lib/notifications/sendConfirmationEmail.ts
import fetch from 'node-fetch';

const BREVO_API_KEY = process.env.BREVO_API_KEY!;
const SENDER_EMAIL = 'mike@solutionsdeveloped.co.uk'; // verified Brevo sender
const SENDER_NAME = 'Iris Infinity Studio';

export async function sendConfirmationEmail(
  to: string,
  name: string,
  title: string,
  isAdminCopy: boolean = false,
  price: string = '',
  line1: string = '',
  city: string = '',
  postcode: string = '',
  country: string = ''
) {
  const addressBlock = [line1, city, postcode, country].filter(Boolean).join('<br/>');

  const htmlContent = isAdminCopy
    ? `
      <div style="font-family: Poppins, sans-serif; color: #fff; background: #000; padding: 20px;">
        <h2 style="color: #00ffff;">Admin Notification</h2>
        <p><strong>Customer:</strong> ${name} (${to})</p>
        <p><strong>Product:</strong> ${title}</p>
        <p><strong>Price:</strong> £${price}</p>
        <p><strong>Shipping Address:</strong><br/>${addressBlock}</p>
      </div>
    `
    : `
      <div style="font-family: Poppins, sans-serif; color: #fff; background: #000; padding: 20px;">
        <h2 style="color: #00ffff;">Thanks for your order, ${name}!</h2>
        <p>Your <strong>${title}</strong> is now being prepared.</p>
        <p><strong>Total Paid:</strong> £${price}</p>
        <p>We’ll ship it to:</p>
        <p>${addressBlock}</p>
        <p>We’re thrilled to create something special just for you.</p>
        <p>Love & Light,<br/>The Iris Infinity Team</p>
      </div>
    `;

  const payload = {
    sender: {
      name: SENDER_NAME,
      email: SENDER_EMAIL,
    },
    to: [
      {
        email: to,
        name,
      },
    ],
    subject: isAdminCopy ? `New Order from ${name}` : `Thank you for your order, ${name}!`,
    htmlContent,
  };

  try {
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
      console.error(`❌ Email failed to ${to}:`, text);
    } else {
      console.log(`✅ Email sent to ${to}`);
    }
  } catch (err) {
    console.error(`❌ Email error for ${to}:`, err);
  }
}
