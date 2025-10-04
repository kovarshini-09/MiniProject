const express = require('express');
const router = express.Router();
const {
  getAllStudents,
  addStudent,
  updateStudent,
  deleteStudent,
} = require('../controllers/studentController');
const Student = require('../models/Student'); // <-- Make sure this is imported

// Get all students
router.get('/', getAllStudents);

// Add new student
router.post('/', addStudent);

// Update student
router.put('/:id', updateStudent);

// Delete student
router.delete('/:id', deleteStudent);

// ✅ Get students by class name (for Enter Marks dropdown)
router.get('/class/:className', async (req, res) => {
  try {
    const { className } = req.params;
    const students = await Student.find({ className }).select('name');
    res.json(students);
  } catch (err) {
    console.error('Error fetching students by class:', err);
    res.status(500).json({ message: 'Server error while fetching students.' });
  }
});

module.exports = router;
