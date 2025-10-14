const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const Teacher = require("../models/Teacher");
const Student = require("../models/Student");

// ✅ Get all teachers (for AllTeachers page)
router.get("/", async (req, res) => {
  try {
    const teachers = await Teacher.find().select("name subject class fatherName motherName");
    res.json(teachers);
  } catch (err) {
    console.error("Error fetching teachers:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// Get logged-in teacher info
router.get("/me", authMiddleware, async (req, res) => {
  try {
    const teacher = await Teacher.findById(req.user._id).select("-password");
    if (!teacher) return res.status(404).json({ message: "Teacher not found" });
    res.json(teacher);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Get students for teacher
router.get("/students", authMiddleware, async (req, res) => {
  try {
    const teacher = await Teacher.findById(req.user._id);
    if (!teacher) return res.status(404).json({ message: "Teacher not found" });

    const students = await Student.find().select("name class regNo");
    res.json(students);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
