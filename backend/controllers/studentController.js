const Student = require("../models/Student");

// Get all students
const getStudents = async (req, res) => {
  const students = await Student.find();
  res.json(students);
};

// Add a student
const addStudent = async (req, res) => {
  const student = new Student(req.body);
  await student.save();
  res.status(201).json(student);
};

// Get latest student for default pre-fill
const latestStudent = async (req, res) => {
  const student = await Student.findOne().sort({ _id: -1 });
  res.json(student);
};

module.exports = { getStudents, addStudent, latestStudent };
