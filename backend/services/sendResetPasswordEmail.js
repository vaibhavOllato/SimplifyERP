import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendResetPasswordEmail = (to, resetLink) => {
  const mailOptions = {
    from: `"Simplifly Support" <${process.env.EMAIL_USER}>`,
    to,
    subject: '🔑 Reset Your Password',
    html: `
      <div style="font-family: Arial, sans-serif; background: #f4f6f8; padding: 30px;">
        <div style="max-width: 600px; margin: auto; background: #ffffff; border-radius: 8px; padding: 20px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
          <h2 style="color: #0ea5e9;">Reset your password</h2>
          <p style="font-size: 16px; color: #333;">You requested a password reset. Click the link below to reset your password.</p>
          <a href="${resetLink}" style="display: inline-block; background-color: #0ea5e9; color: white; padding: 10px 20px; border-radius: 4px; text-decoration: none;">Reset Password</a>
          <p style="font-size: 14px; color: #888;">If you did not request this, please ignore this email.</p>
          <p style="font-size: 14px; color: #888;">Cheers,<br/><strong>The Simplifly Team</strong></p>
        </div>
      </div>
    `
  };

  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending reset password email:", error);
        reject(error);
      } else {
        console.log("Reset password email sent:", info.response);
        resolve(info.response);
      }
    });
  });
};

export default sendResetPasswordEmail;
