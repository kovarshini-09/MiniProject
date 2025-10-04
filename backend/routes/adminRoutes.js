const express = require('express');
const router = express.Router();
const Student = require('../models/Student');
const Teacher = require('../models/Teacher');

// -------- STUDENT CRUD --------
router.get('/students', async (req, res) => {
    const students = await Student.find();
    res.json(students);
});

// Add student
router.post('/students', async (req, res) => {
    try {
        const student = new Student(req.body); // frontend sends full student data
        await student.save();
        res.json({ message: 'Student added successfully', student });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Edit student
router.put('/students/:id', async (req, res) => {
    try {
        const student = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json({ message: 'Student updated successfully', student });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Delete student
router.delete('/students/:id', async (req, res) => {
    await Student.findByIdAndDelete(req.params.id);
    res.json({ message: 'Student deleted successfully' });
});

// -------- TEACHER CRUD --------
router.get('/teachers', async (req, res) => {
    const teachers = await Teacher.find();
    res.json(teachers);
});

// Add teacher
router.post('/teachers', async (req, res) => {
    try {
        const teacher = new Teacher(req.body); // frontend sends full teacher data
        await teacher.save();
        res.json({ message: 'Teacher added successfully', teacher });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Edit teacher
router.put('/teachers/:id', async (req, res) => {
    try {
        const teacher = await Teacher.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json({ message: 'Teacher updated successfully', teacher });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Delete teacher
router.delete('/teachers/:id', async (req, res) => {
    await Teacher.findByIdAndDelete(req.params.id);
    res.json({ message: 'Teacher deleted successfully' });
});

module.exports = router;
