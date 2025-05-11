import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();


export const sendCredentialsMail = async ({ name, email, password }) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.MAIL_USER,       // 🔐 Replace with your email
      pass: process.env.MAIL_PASS           // 🔐 Use an App Password, not your real one
    }
  });

  const mailOptions = {
    from: `EMS Admin ${process.env.MAIL_USER}`,
    to: email,
    subject: 'Your Admin Account Credentials',
    html: `
      <p>Hi <strong>${name}</strong>,</p>
      <p>Your admin account has been created.</p>
      <p><strong>Login ID:</strong> ${email}</p>
      <p><strong>Password:</strong> ${password}</p>
      <p>Please log in and change your password.</p>
    `
  };

  await transporter.sendMail(mailOptions);
};
