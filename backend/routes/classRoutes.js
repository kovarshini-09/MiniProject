const express = require("express");
const router = express.Router();
const {
  createClass,
  getAllClasses,
  getClassById,
  deleteClass,
  markAttendanceSubmitted,
  getTeacherAttendanceSummary,
} = require("../controllers/classController");

// Routes
router.post("/create", createClass);
router.get("/", getAllClasses);
router.get("/:id", getClassById);
router.delete("/:id", deleteClass);

// ✅ Attendance (via body)
router.post("/markAttendance", markAttendanceSubmitted);

// ✅ Teacher summary
router.get("/teacher/:teacherId/attendance", getTeacherAttendanceSummary);

module.exports = router;
