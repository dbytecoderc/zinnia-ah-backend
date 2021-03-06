import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const email = process.env.EMAIL;
const host = process.env.SMTP_HOST;
const port = process.env.SMTP_PORT;
const username = process.env.SMTP_USERNAME;
const pass = process.env.SMTP_MAIL_PASSWORD;

export const transporter = nodemailer.createTransport({
  host,
  port,
  auth: {
    user: username,
    pass,
  },
  pool: true,
  rateLimit: true,
  maxConnections: 1,
  maxMessages: 3,
});

export const sendMailer = async body => {
  const { receivers, subject, text, html } = body;

  const allRecipientEmail = receivers.join(', ');

  const mailOptions = {
    from: email,
    to: allRecipientEmail,
    subject,
    text,
    html,
  };

  try {
    return await transporter.sendMail(mailOptions);
  } catch (err) {
    throw err;
  }
};
