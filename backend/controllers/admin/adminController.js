import Admin from "../../models/Admin.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const adminLogin = async (req, res) => {
  console.log('Admin login route hit', req.body);
  const { email, password } = req.body;

  try {
    const admin = await Admin.findOne({ email });
    if (!admin) return res.status(404).json({ message: 'Admin not found' });

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign(
      { id: admin._id, email: admin.email, role: 'admin' },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );
    // console.log(token);
    

    res.json({ token, admin: { id: admin._id, email: admin.email } });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const getDashboardStats = async (req, res) => {
  try {
    // Example data, replace with actual DB queries
    const stats = {
      totalUsers: 102,
      totalShops: 20,
      totalOrders: 457,
    };
    res.json(stats);
  } catch (err) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};
