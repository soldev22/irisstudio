// src/lib/notifications/sendConfirmationEmail.ts
import fetch from 'node-fetch';

const BREVO_API_KEY = process.env.BREVO_API_KEY!;
const SENDER_EMAIL = 'mike@solutionsdeveloped.co.uk'; // Replace with your verified Brevo sender

type EmailType = 'success' | 'cancel' | 'fail';

export async function sendConfirmationEmail(email: string, name: string, product: string, type: EmailType = 'success') {
  const subjectMap = {
    success: `Thanks for your order: ${product}`,
    cancel: `We noticed you didn’t finish your Iris Infinity order`,
    fail: `Looks like there was a payment issue with your order`,
  };

  const messageMap = {
    success: `
      <p>Hi ${name},</p>
      <p>You're amazing — and so are we. Together, we’re greater.</p>
      <p>Thank you for ordering <strong>${product}</strong>. We’ll get started right away!</p>
    `,
    cancel: `
      <p>Hi ${name},</p>
      <p>We saw you started an Iris Infinity order but didn’t finish. Can we help with anything?</p>
      <p>We’re here to answer questions or walk you through next steps!</p>
    `,
    fail: `
      <p>Hi ${name},</p>
      <p>It looks like your payment didn’t go through. No worries — these things happen.</p>
      <p>Want to try again or need help? We're here for you.</p>
    `,
  };

  const response = await fetch('https://api.brevo.com/v3/smtp/email', {
    method: 'POST',
    headers: {
      'api-key': BREVO_API_KEY,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      sender: { name: 'Iris Infinity Studio', email: SENDER_EMAIL },
      to: [{ email, name }],
      subject: subjectMap[type],
      htmlContent: messageMap[type],
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    console.error('Brevo send error:', error);
    throw new Error('Failed to send confirmation email');
  }

  return true;
}