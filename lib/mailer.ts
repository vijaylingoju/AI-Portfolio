// utils/mailer.ts
import nodemailer from "nodemailer";

// Lazy transporter
let transporter: nodemailer.Transporter;

function createSmtpTransport() {
  return nodemailer.createTransport({
    host: "smtp.gmail.com", // Gmail SMTP host :contentReference[oaicite:3]{index=3}
    port: 465, // SSL port :contentReference[oaicite:4]{index=4}
    secure: true,
    auth: {
      user: process.env.SMTP_USER!,
      pass: process.env.SMTP_PASS!,
    },
  });
}


function getTransporter() {
  if (transporter) return transporter;

  transporter = createSmtpTransport();

  return transporter;
}

/**
 * sendEmail sends an email to yourself via Gmail, using either SMTP+AppPwd or OAuth2.
 * @param subject – Subject of the email
 * @param body    – Plain-text body (auto-wrapped as HTML)
 */
export async function sendEmail(
  subject: string,
  body: string
): Promise<{ messageId: string; previewUrl?: string }> {
  const t = getTransporter();
  const info = await t.sendMail({
    from: process.env.EMAIL_ADDRESS || process.env.SMTP_USER!,
    to: process.env.EMAIL_ADDRESS || process.env.SMTP_USER!,
    subject,
    text: body,
    html: `<p>${body.replace(/\n/g, "<br>")}</p>`,
  });

  // Ethereal preview if in dev without real SMTP
  const previewUrl = nodemailer.getTestMessageUrl(info);
  return { messageId: info.messageId, previewUrl: previewUrl || undefined };
}
