// src/lib/utils/email.ts
import { Resend } from 'resend';

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

export async function sendEmail({ to, subject, html }: { to: string; subject: string; html: string }) {
  if (!resend) {
    console.log('Resend not configured. Email would be sent to:', to, 'Subject:', subject);
    return { success: false, reason: 'Email service not configured' };
  }

  try {
    const data = await resend.emails.send({
      from: 'Himalya Sparsh <noreply@himalyaspersh.com>',
      to: [to],
      subject,
      html,
    });
    return { success: true, data };
  } catch (error) {
    console.error('Email send error:', error);
    return { success: false, error };
  }
}
