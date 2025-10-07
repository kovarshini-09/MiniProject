const Admin = require('../models/Admin');
const Teacher = require('../models/Teacher');
const Student = require('../models/Student');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// ✅ Only these 5 admins are allowed
const allowedAdmins = [
  'kannan.admin@gmail.com',
  'murali.admin@gmail.com',
  'devi.admin@gmail.com',
  'divya.admin@gmail.com',
  'mani.admin@gmail.com'
];

exports.login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ message: 'Email & Password required' });

  // Find user in Admin, Teacher, or Student
  let user =
    (await Admin.findOne({ email })) ||
    (await Teacher.findOne({ email })) ||
    (await Student.findOne({ email }));

  if (!user) return res.status(400).json({ message: 'Invalid email or password' });

  // Restrict admin login to only allowed admins
  if (user instanceof Admin && !allowedAdmins.includes(email)) {
    return res.status(403).json({ message: 'Access denied. Not an allowed admin.' });
  }

  // Check password
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ message: 'Invalid email or password' });

  // Determine role
  let role =
    user instanceof Admin
      ? 'admin'
      : user instanceof Teacher
      ? 'teacher'
      : 'student';

  const token = jwt.sign({ id: user._id, role }, 'secretkey', { expiresIn: '1d' });

  res.json({
    token,
    role,
    user: { id: user._id, name: user.name, email: user.email }
  });
};
