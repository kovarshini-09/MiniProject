const express = require('express');
const router = express.Router();
const Student = require('../models/Student');
const jwt = require('jsonwebtoken');
const { getStudentHomework } = require('../controllers/studentController'); // ✅ ADDED

// Middleware to verify token
const authMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1]; // Bearer token
    if (!token) return res.status(401).json({ message: 'No token provided' });

    const decoded = jwt.verify(token, 'secretkey'); // same key as login
    req.studentId = decoded.id;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
};

// ✅ Route 1: Get all students
router.get('/', async (req, res) => {
  try {
    const students = await Student.find().select('name class regNo');
    res.json(students);
  } catch (err) {
    console.error('Error fetching students:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// ✅ Route 2: Get logged-in student details
// ✅ Route 2: Get logged-in student details (for Student dashboard)
router.get('/me', authMiddleware, async (req, res) => {
  try {
    const student = await Student.findById(req.studentId);
    if (!student) return res.status(404).json({ message: 'Student not found' });

    res.json({
      _id: student._id, // ✅ Add this line
      name: student.name,
      class: student.class,
    });
  } catch (err) {
    console.error('Error fetching student:', err);
    res.status(500).json({ message: 'Server error' });
  }
});


// ✅ NEW Route 3: Fetch homework for this student by ID (controller mapped)
router.get('/:id/homework', getStudentHomework); // ✅ Added mapping

module.exports = router;
