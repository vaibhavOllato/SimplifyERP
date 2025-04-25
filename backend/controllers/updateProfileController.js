// controllers/profileController.js
import User from '../models/User.js';  // ES module style

// Controller to update profile details
export  const updateProfile = async (req, res) => {
  const { userId, firstName, lastName, email, phone } = req.body;

  try {
    // Validate input
    if (!userId || !firstName || !lastName || !email || !phone) {
      return res.status(400).json({ message: 'All fields are required' });
    }

   // Find and update the user by custom userId
   const updatedUser = await User.findOneAndUpdate(
    { userId }, // Use custom userId here
    { firstName, lastName, email, phone },
    { new: true } // Return the updated user document
  );

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.status(200).json({
      message: 'Profile updated successfully',
      user: updatedUser,
    });
  } catch (error) {
    console.error('Error updating profile:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

