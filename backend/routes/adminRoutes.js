const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');
const Student = require('../models/Student');
const Teacher = require('../models/Teacher');

// ✅ Only these 5 admins can access dashboard
const allowedAdmins = [
  'kannan.admin@gmail.com',
  'murali.admin@gmail.com',
  'devi.admin@gmail.com',
  'divya.admin@gmail.com',
  'mani.admin@gmail.com'
];

// ------------------- ADMIN LOGIN -------------------
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await Admin.findOne({ email });

    if (!admin || !allowedAdmins.includes(email))
      return res.status(401).json({ message: 'Invalid email or password' });

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid email or password' });

    // Create JWT token
    const token = jwt.sign(
      { id: admin._id, role: admin.role },
      'secretkey',
      { expiresIn: '1d' }
    );

    res.json({ message: 'Login successful', token, role: admin.role });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// ------------------- ADMIN AUTH MIDDLEWARE -------------------
const adminAuth = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer '))
    return res.status(401).json({ message: 'Unauthorized' });

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, 'secretkey');

    if (decoded.role !== 'admin') return res.status(403).json({ message: 'Access denied' });

    const admin = await Admin.findById(decoded.id);
    if (!admin || !allowedAdmins.includes(admin.email))
      return res.status(403).json({ message: 'Access denied. Not an allowed admin.' });

    req.adminId = decoded.id;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Token invalid or expired' });
  }
};

// ------------------- CRUD for STUDENTS -------------------
router.get('/students', adminAuth, async (req, res) => {
  const students = await Student.find();
  res.json(students);
});

router.post('/students', adminAuth, async (req, res) => {
  try {
    const student = new Student(req.body);
    await student.save();
    res.json({ message: 'Student added successfully', student });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.put('/students/:id', adminAuth, async (req, res) => {
  try {
    const student = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ message: 'Student updated successfully', student });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.delete('/students/:id', adminAuth, async (req, res) => {
  await Student.findByIdAndDelete(req.params.id);
  res.json({ message: 'Student deleted successfully' });
});

// ------------------- CRUD for TEACHERS -------------------
router.get('/teachers', adminAuth, async (req, res) => {
  const teachers = await Teacher.find();
  res.json(teachers);
});

router.post('/teachers', adminAuth, async (req, res) => {
  try {
    const teacher = new Teacher(req.body);
    await teacher.save();
    res.json({ message: 'Teacher added successfully', teacher });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.put('/teachers/:id', adminAuth, async (req, res) => {
  try {
    const teacher = await Teacher.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ message: 'Teacher updated successfully', teacher });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.delete('/teachers/:id', adminAuth, async (req, res) => {
  await Teacher.findByIdAndDelete(req.params.id);
  res.json({ message: 'Teacher deleted successfully' });
});

module.exports = router;
