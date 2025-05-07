import User from '../../models/User.js'; // Import the User model

// Controller to fetch all user details
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find(); // Fetch all users
    res.json(users); // Send the data as JSON response
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
};

// Controller to fetch the number of registered users
export const getUserCount = async (req, res) => {
  try {
    const userCount = await User.countDocuments(); // Count all users
    res.json({ count: userCount });
  } catch (error) {
    console.error('Error counting users:', error);
    res.status(500).json({ error: 'Failed to count users' });
  }
};
