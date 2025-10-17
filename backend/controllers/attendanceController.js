const Attendance = require("../models/Attendance");
const Class = require("../models/Class");
const Teacher = require("../models/Teacher");

// ✅ Mark or update attendance
const markAttendance = async (req, res) => {
  try {
    const { class: className, date } = req.body;
    const teacherId = req.user.id; // from token (middleware)

    // Find class
    const cls = await Class.findOne({ classId: className }).populate("students");
    if (!cls) return res.status(404).json({ message: "Class not found" });

    // Verify teacher is assigned to this class
    if (cls.classTeacher.toString() !== teacherId) {
      return res.status(403).json({ message: "❌ You are not assigned to this class" });
    }

    // Check if already marked
    const existing = await Attendance.findOne({ classId: cls._id, date });
    if (existing) {
      return res.status(400).json({ message: "⚠️ Attendance already marked for today" });
    }

    // Prepare student attendance (all 100%)
    const studentAttendance = cls.students.map((stu) => ({
      studentId: stu._id,
      status: "Present",
    }));

    const newAttendance = new Attendance({
      classId: cls._id,
      teacherId,
      date,
      studentAttendance,
    });

    await newAttendance.save();

    res.json({ message: `✅ Attendance marked successfully for class ${className}` });
  } catch (err) {
    console.error("Attendance error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// ✅ Get attendance summary (for dashboard)
const getAttendanceSummary = async (req, res) => {
  try {
    const records = await Attendance.find();

    const totalClasses = records.length;
    const totalTeachers = new Set(records.map((r) => r.teacherId?.toString())).size;

    res.json({
      studentPercent: 100,
      teacherPercent: 100,
      totalClasses,
      totalTeachers,
    });
  } catch (err) {
    res.status(500).json({ message: "Error fetching attendance summary" });
  }
};

module.exports = { markAttendance, getAttendanceSummary };
