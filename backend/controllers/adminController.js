const Admin = require('../models/Admin');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// List of allowed admin emails
const allowedAdmins = [
  'kannan.admin@gmail.com',
  'murali.admin@gmail.com',
  'devi.admin@gmail.com',
  'divya.admin@gmail.com',
  'mani.admin@gmail.com'
];

// Admin login function
exports.adminLogin = async (req, res) => {
  const { email, password, role } = req.body;

  try {
    // Only role "admin" allowed
    if (role !== 'admin') {
      return res.status(401).json({ message: 'Access denied. Not an admin.' });
    }

    // Only allowed 5 admins
    if (!allowedAdmins.includes(email)) {
      return res.status(401).json({ message: 'Access denied. Not an admin.' });
    }

    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(401).json({ message: 'Admin not found' });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Create JWT token
    const token = jwt.sign({ id: admin._id, role: admin.role }, 'secretkey', { expiresIn: '1h' });

    res.json({ token, role: admin.role, admin: { name: admin.name, email: admin.email } });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
