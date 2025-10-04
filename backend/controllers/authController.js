const Admin = require('../models/Admin');
const Teacher = require('../models/Teacher');
const Student = require('../models/Student');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Login Controller
exports.login = async (req, res) => {
  const { email, password, role } = req.body;

  if (!email || !password || !role) {
    return res.status(400).json({ message: 'Please provide email, password and role' });
  }

  let user;
  if (role === 'admin') user = await Admin.findOne({ email });
  else if (role === 'teacher') user = await Teacher.findOne({ email });
  else if (role === 'student') user = await Student.findOne({ email });
  else return res.status(400).json({ message: 'Invalid role' });

  if (!user) return res.status(400).json({ message: 'User not found' });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

  const token = jwt.sign({ id: user._id, role: user.role }, 'secretkey', { expiresIn: '1d' });

  res.json({ token, user: { id: user._id, name: user.name, role: user.role } });
};
