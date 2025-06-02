import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { name, email, message } = await req.json();

  const brevoResponse = await fetch('https://api.brevo.com/v3/smtp/email', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'api-key': process.env.BREVO_API_KEY!, // Set this in .env.local
    },
    body: JSON.stringify({
      sender: {
        name: 'Iris Infinity Studio',
        email: 'mike@solutionsdeveloped.co.uk', // Must be validated in Brevo
      },
      to: [
        {
          email: 'mike@solutionsdeveloped.co.uk', // Where you want to receive messages
        },
      ],
      subject: `New Contact Form Message from ${name}`,
      htmlContent: `
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong><br>${message}</p>
      `,
    }),
  });

  if (!brevoResponse.ok) {
    console.error(await brevoResponse.text());
    return NextResponse.json({ success: false }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
