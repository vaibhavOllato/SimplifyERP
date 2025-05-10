import Shop from "../models/Shop.js";
import nodemailer from "nodemailer";

import { sendAdminShopNotification } from "../services/emailAdminService.js"; // adjust path as needed

export const registerShop = async (req, res) => {
  const {
    userId,
    shopName,
    shopType,
    secondaryCategories,
    address,
    phone,
    email,
    website,
    openingTime,
    closingTime,
    gstNumber,
    taxRates,
    ownerName,
  } = req.body;

  if (
    !userId ||
    !shopName ||
    !shopType ||
    !address ||
    !gstNumber ||
    !taxRates ||
    !Array.isArray(taxRates) ||
    !ownerName
  ) {
    return res
      .status(400)
      .json({ message: "All required fields must be provided." });
  }

  try {
    const newShop = new Shop({
      userId,
      shopName,
      shopType,
      secondaryCategories,
      address,
      phone,
      email,
      website,
      openingTime,
      closingTime,
      gstNumber,
      taxRates,
      ownerName,
      isActive: false,
    });

    await newShop.save();

    req.io.emit("shopRegistered", {
      shopId: newShop.shopId,
      shopName: newShop.shopName,
      ownerName: newShop.ownerName,
      createdAt: newShop.createdAt,
    });

    try {
      await sendAdminShopNotification({
        shopName,
        ownerName,
        email,
        phone,
        gstNumber,
      });
      console.log("✅ Admin notified via email");
    } catch (emailError) {
      console.error("❌ Email sending failed:", emailError);
    }

    return res.status(201).json({
      message: "Shop registered successfully. Awaiting admin approval.",
      shop: newShop,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Server error. Please try again later." });
  }
};

// export const registerShop = async (req, res) => {
//   const {
//     userId,
//     shopName,
//     shopType,
//     secondaryCategories,
//     address,
//     phone,
//     email,
//     website,
//     openingTime,
//     closingTime,
//     gstNumber,
//     taxRates,
//     ownerName,
//   } = req.body;

//   if (
//     !userId ||
//     !shopName ||
//     !shopType ||
//     !address ||
//     !gstNumber ||
//     !taxRates ||
//     !Array.isArray(taxRates) ||
//     !ownerName
//   ) {
//     return res
//       .status(400)
//       .json({ message: "All required fields must be provided." });
//   }

//   try {
//     const newShop = new Shop({
//       userId,
//       shopName,
//       shopType,
//       secondaryCategories,
//       address,
//       phone,
//       email,
//       website,
//       openingTime,
//       closingTime,
//       gstNumber,
//       taxRates,
//       ownerName,
//       isActive: false, // Not active until admin approves
//     });

//     await newShop.save();

//     req.io.emit("shopRegistered", {
//       shopId: newShop.shopId,
//       shopName: newShop.shopName,
//       ownerName: newShop.ownerName,
//       createdAt: newShop.createdAt,
//     });

//     console.log(
//       process.env.EMAIL_USER,
//       process.env.EMAIL_PASS,
//       process.env.ADMIN_EMAIL
//     );

//     // Send email to admin
//     const transporter = nodemailer.createTransport({
//       service: "gmail",
//       auth: {
//         user: process.env.EMAIL_USER,
//         pass: process.env.EMAIL_PASS,
//       },
//     });

//     const mailOptions = {
//       from: process.env.EMAIL_USER,
//       to: process.env.ADMIN_EMAIL,
//       subject: "New Shop Registration Request",
//       html: `
//         <h3>New Shop Registration</h3>
//         <p><strong>Shop Name:</strong> ${shopName}</p>
//         <p><strong>Owner:</strong> ${ownerName}</p>
//         <p><strong>Email:</strong> ${email}</p>
//         <p><strong>Phone:</strong> ${phone}</p>
//         <p><strong>GST:</strong> ${gstNumber}</p>
//         <p>Please review and activate the shop in the admin panel.</p>
//       `,
//     };

//     // await transporter.sendMail(mailOptions);
//     transporter.sendMail(mailOptions, (error, info) => {
//       if (error) {
//         return console.error("❌ Email failed:", error);
//       }
//       console.log("✅ Email sent:", info.response);
//     });

//     return res.status(201).json({
//       message: "Shop registered successfully. Awaiting admin approval.",
//       shop: newShop,
//     });
//   } catch (error) {
//     console.error(error);
//     return res
//       .status(500)
//       .json({ message: "Server error. Please try again later." });
//   }
// };

// Controller to Fetch Shop Details for a User

export const getShopDetails = async (req, res) => {
  const { userId } = req.params; // Get userId from URL parameters

  // Validate if userId exists
  if (!userId) {
    return res.status(400).json({ message: "User ID is required." });
  }

  try {
    // Find all shops linked to the given userId
    const shops = await Shop.find({ userId });

    // If no shops found, send 404
    if (shops.length === 0) {
      return res.status(404).json({ message: "No shops found for this user." });
    }

    // If shops found, send them with 200 OK
    return res.status(200).json({ shops });
  } catch (error) {
    console.error("Error fetching shop details:", error);
    return res
      .status(500)
      .json({ message: "Server error. Please try again later." });
  }
};

// Controller to Update Shop Details (if necessary)
export const updateShop = async (req, res) => {
  const { shopId } = req.params; // ShopId passed in the URL
  const {
    shopName,
    shopType,
    secondaryCategories,
    address,
    phone,
    email,
    website,
    openingTime,
    closingTime,
    gstNumber,
    taxRates,
    ownerName, // ✅ Add this line
  } = req.body;

  try {
    // Find the shop by shopId
    const shop = await Shop.findOne({ shopId });

    if (!shop) {
      return res.status(404).json({ message: "Shop not found." });
    }

    // Update the shop details
    shop.shopName = shopName || shop.shopName;
    shop.shopType = shopType || shop.shopType;
    shop.secondaryCategories = secondaryCategories || shop.secondaryCategories;
    shop.address = address || shop.address;
    shop.phone = phone || shop.phone;
    shop.email = email || shop.email;
    shop.website = website || shop.website;
    shop.openingTime = openingTime || shop.openingTime;
    shop.closingTime = closingTime || shop.closingTime;
    shop.gstNumber = gstNumber || shop.gstNumber;
    shop.taxRates = taxRates || shop.taxRates;
    shop.ownerName = ownerName || shop.ownerName;

    // Save the updated shop
    await shop.save();

    return res
      .status(200)
      .json({ message: "Shop details updated successfully.", shop });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Server error. Please try again later." });
  }
};

// Controller to Delete a Shop (if necessary)
export const deleteShop = async (req, res) => {
  const { shopId } = req.params; // ShopId passed in the URL

  try {
    const shop = await Shop.findOneAndDelete({ shopId });

    if (!shop) {
      return res.status(404).json({ message: "Shop not found." });
    }

    return res.status(200).json({ message: "Shop deleted successfully." });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Server error. Please try again later." });
  }
};
