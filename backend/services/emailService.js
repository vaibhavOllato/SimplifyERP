// import nodemailer from 'nodemailer';
// import dotenv from 'dotenv';
// dotenv.config();

// const transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS,
//   },
// });

//  const sendWelcomeEmail = (to, name) => {
//   const mailOptions = {
//     from: process.env.EMAIL_USER,
//     to,
//     subject: 'Welcome to Simplifly!',
//     text: `Hello ${name},\n\nWelcome to Simplifly! We are excited to have you.\n\nRegards,\nSimplifly Team`,
//   };

//   return new Promise((resolve, reject) => {
//     transporter.sendMail(mailOptions, (error, info) => {
//       if (error) {
//         console.error("Email sending failed:", error);
//         reject(error);
//       } else {
//         console.log("Email sent:", info.response);
//         resolve(info.response);
//       }
//     });
//   });
// };

// export default sendWelcomeEmail;



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

const sendWelcomeEmail = (to, name) => {
  const mailOptions = {
    from: `"Simplifly Support" <${process.env.EMAIL_USER}>`,
    to,
    subject: '🎉 Welcome to Simplifly!',
    html: `
      <div style="font-family: Arial, sans-serif; background: #f4f6f8; padding: 30px;">
        <div style="max-width: 600px; margin: auto; background: #ffffff; border-radius: 8px; padding: 20px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
          <h2 style="color: #0ea5e9;">Welcome to <span style="color: #0e7490;">Simplifly</span>, ${name} 👋</h2>
          <p style="font-size: 16px; color: #333;">We're thrilled to have you on board! 🎉</p>
          <p style="font-size: 16px; color: #555;">You can now explore the features of Simplifly ERP and start managing your business like a pro.</p>
          <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;" />
          <p style="font-size: 14px; color: #888;">If you have any questions or need help, feel free to reach out to us.</p>
          <p style="font-size: 14px; color: #888;">Cheers,<br/><strong>The Simplifly Team</strong></p>
        </div>
      </div>
    `
  };

  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Email sending failed:", error);
        reject(error);
      } else {
        console.log("Email sent:", info.response);
        resolve(info.response);
      }
    });
  });
};

export default sendWelcomeEmail;
