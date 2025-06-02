import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { name, email, message } = await req.json();

  const brevoApiKey = process.env.BREVO_API_KEY!;
  const studioEmail = 'mike@solutionsdeveloped.co.uk'; // Must be a validated Brevo sender

  // 1. Send TO YOU
  const notifyStudio = fetch('https://api.brevo.com/v3/smtp/email', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'api-key': brevoApiKey,
    },
    body: JSON.stringify({
      sender: { name: 'Iris Infinity Studio', email: studioEmail },
      to: [{ email: 'mike@solutionsdeveloped.co.uk' }],
      subject: `New Contact Form Message from ${name}`,
      htmlContent: `
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong><br>${message}</p>
      `,
    }),
  });

  // 2. Auto-respond TO USER
  const autoReply = fetch('https://api.brevo.com/v3/smtp/email', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'api-key': brevoApiKey,
    },
    body: JSON.stringify({
      sender: { name: 'Iris Infinity Studio', email: studioEmail },
      to: [{ email }],
      subject: 'Thanks for contacting Iris Infinity Studio',
      htmlContent: `
        <p>Hi ${name},</p>
        <p>Thanks for reaching out to Iris Infinity Studio. We’ve received your message and will get back to you shortly.</p>
        <p>In the meantime, feel free to explore our gallery or book a studio session online.</p>
        <p><strong>Website:</strong> <a href="https://irisinfinity.studio">irisinfinity.studio</a></p>
        <p>Warm wishes,<br/>The Iris Infinity Studio Team</p>
      `,
    }),
  });

  const [notifyResult, autoReplyResult] = await Promise.all([notifyStudio, autoReply]);

  if (!notifyResult.ok || !autoReplyResult.ok) {
    console.error('Notify status:', notifyResult.status);
    console.error('Auto-reply status:', autoReplyResult.status);
    return NextResponse.json({ success: false }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
