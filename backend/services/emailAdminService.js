// import nodemailer from "nodemailer";

// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS,
//   },
// });

// /**
//  * Send admin notification for shop registration
//  * @param {Object} shopDetails - Includes shopName, ownerName, email, phone, gstNumber
//  */
// export const sendAdminShopNotification = async (shopDetails) => {
//   const { shopName, ownerName, email, phone, gstNumber } = shopDetails;

//   const mailOptions = {
//     from: process.env.EMAIL_USER,
//     to: process.env.ADMIN_EMAIL,
//     subject: "New Shop Registration Request",
//     html: `
//       <h3>New Shop Registration</h3>
//       <p><strong>Shop Name:</strong> ${shopName}</p>
//       <p><strong>Owner:</strong> ${ownerName}</p>
//       <p><strong>Email:</strong> ${email}</p>
//       <p><strong>Phone:</strong> ${phone}</p>
//       <p><strong>GST:</strong> ${gstNumber}</p>
//       <p>Please review and activate the shop in the admin panel.</p>
//     `,
//   };

//   return transporter.sendMail(mailOptions);
// };

import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

/**
 * Send admin notification for shop registration
 * @param {Object} shopDetails - Includes shopName, ownerName, email, phone, gstNumber
 */
export const sendAdminShopNotification = async (shopDetails) => {
  const { shopName, ownerName, email, phone, gstNumber } = shopDetails;

  const mailOptions = {
    from: `"SimplifyERP Admin" <${process.env.EMAIL_USER}>`,
    to: process.env.ADMIN_EMAIL,
    subject: "🛍️ New Shop Registration - Action Required",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #e0e0e0; border-radius: 10px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">
        <div style="background-color: #00bcd4; color: white; padding: 20px;">
          <h2 style="margin: 0;">SimplifyERP</h2>
          <p style="margin: 5px 0 0;">New Shop Registration Request</p>
        </div>
        <div style="padding: 20px; background-color: #ffffff;">
          <p>A new shop has requested registration. Please review the details below:</p>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px; font-weight: bold;">🏬 Shop Name:</td>
              <td style="padding: 8px;">${shopName}</td>
            </tr>
            <tr>
              <td style="padding: 8px; font-weight: bold;">👤 Owner:</td>
              <td style="padding: 8px;">${ownerName}</td>
            </tr>
            <tr>
              <td style="padding: 8px; font-weight: bold;">📧 Email:</td>
              <td style="padding: 8px;">${email}</td>
            </tr>
            <tr>
              <td style="padding: 8px; font-weight: bold;">📞 Phone:</td>
              <td style="padding: 8px;">${phone}</td>
            </tr>
            <tr>
              <td style="padding: 8px; font-weight: bold;">💼 GST Number:</td>
              <td style="padding: 8px;">${gstNumber}</td>
            </tr>
          </table>
          <p style="margin-top: 20px;">Please log in to the <strong>Admin Panel</strong> to review and activate the shop.</p>
        </div>
        <div style="background-color: #f8f8f8; text-align: center; padding: 15px; font-size: 12px; color: #777;">
          SimplifyERP | Contact: <a href="tel:8070905353" style="color: #00bcd4; text-decoration: none;">8070905353</a> <br />
          &copy; ${new Date().getFullYear()} SimplifyERP. All rights reserved.
        </div>
      </div>
    `,
  };

  return transporter.sendMail(mailOptions);
};
