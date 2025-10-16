const express = require("express");
const Result = require("../models/Result");
const Student = require("../models/Student");
const auth = require("../middleware/authMiddleware");

const router = express.Router();

// Teacher posts marks for a student; only class teacher allowed
router.post("/", auth, async (req, res) => {
  try {
    const { studentId, exam, marks } = req.body;
    if (!studentId || !exam || !marks) {
      return res.status(400).json({ message: "studentId, exam, marks required" });
    }

    const student = await Student.findById(studentId);
    if (!student) return res.status(404).json({ message: "Student not found" });

    // Authorization: require teacher role
    if (req.role !== "teacher") {
      return res.status(403).json({ message: "Only teachers can submit marks" });
    }

    // Basic class teacher rule: teacher's subject ignored, only class match required
    // Assuming teacher has a field 'assignedClass' equal to student's class value
    // If Teacher model differs, adjust accordingly
    const teacherClass = req.user?.assignedClass || req.user?.class || "";
    if (teacherClass && student.class && teacherClass.toLowerCase() !== student.class.toLowerCase()) {
      return res.status(403).json({ message: "Not this class's teacher" });
    }

    const total = Object.values(marks).reduce((sum, v) => sum + (Number(v) || 0), 0);
    const percentage = Object.keys(marks).length ? (total / (Object.keys(marks).length * 100)) * 100 : 0;

    const payload = {
      studentRegNo: student.regNo,
      classId: student.class,
      exam,
      marks,
      total,
      percentage: Number(percentage.toFixed(2)),
    };

    // Upsert by student+exam
    const saved = await Result.findOneAndUpdate(
      { studentRegNo: student.regNo, exam },
      payload,
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    res.json({ message: "Marks saved", result: saved });
  } catch (err) {
    console.error("save marks error", err);
    res.status(500).json({ message: "Server error" });
  }
});

// Student fetches their results
router.get("/me", auth, async (req, res) => {
  try {
    if (req.role !== "student") {
      return res.status(403).json({ message: "Only students can view their marks" });
    }
    const results = await Result.find({ studentRegNo: req.user.regNo }).sort({ _id: -1 });
    res.json(results);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;


