const express = require("express");
const router = express.Router();
const Student = require("../models/Student");
const Teacher = require("../models/Teacher");
const Attendance = require("../models/Attendance");
const Class = require("../models/Class");
const auth = require("../middleware/authMiddleware");

// ✅ Mark attendance (enforced by AllClasses mapping)
router.post("/update", auth, async (req, res) => {
  try {
    const { class: className, date, absentIds } = req.body;

    if (!className || !date)
      return res.status(400).json({ message: "Class and date are required." });

    if (req.role !== "teacher")
      return res.status(403).json({ message: "Only teachers can mark attendance." });

    // Look up class by its classId as displayed in AllClasses (accept '9C' or '9C Grade')
    const classRegex = new RegExp(`^${className}(?:\\s*grade)?$`, "i");
    let cls = await Class.findOne({ classId: { $regex: classRegex } })
      .populate("classTeacher")
      .populate("students");
    // Fallback if schema used a different field name
    if (!cls) {
      cls = await Class.findOne({ className: { $regex: classRegex } })
        .populate("classTeacher")
        .populate("students");
    }

    if (!cls)
      return res.status(404).json({ message: `Class ${className} not found` });

    // Verify the requester is the class teacher of this class
    if (!cls.classTeacher || cls.classTeacher._id.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "You are not the class teacher for this class." });
    }

    const formattedDate =
      typeof date === "string" && date.includes("/")
        ? date
        : new Date(date).toLocaleDateString("en-GB");

    // Prevent duplicate marking for this class and date
    const alreadySubmitted = await Attendance.exists({
      date: formattedDate,
      classId: cls._id,
    });

    if (alreadySubmitted)
      return res.status(409).json({ message: "Attendance already marked for today." });

    // Determine students of this class: prefer relation; fallback to class name match
    let studentsForClass = cls.students && cls.students.length
      ? cls.students
      : await Student.find({
          class: {
            $regex: new RegExp(`^${className}(?:\\s*grade)?$`, "i"),
          },
        });

    const absentSet = new Set((Array.isArray(absentIds) ? absentIds : []).map((x) => x.toString()));

    // Create new attendance record with proper Class._id and statuses
    const attendanceRecord = new Attendance({
      classId: cls._id,
      teacherId: req.user._id,
      date: formattedDate,
      studentAttendance: (studentsForClass || []).map((stu) => ({
        studentId: stu._id,
        status: absentSet.has(stu._id.toString()) ? "Absent" : "Present",
      })),
    });

    await attendanceRecord.save();

    // Update each student's attendance array and derived fields
    for (const stu of studentsForClass || []) {
      const isPresent = !absentSet.has(stu._id.toString());
      stu.attendance.push({ date: formattedDate, present: isPresent });

      // Keep presentDays/percentage fields in sync (though dashboard computes against 100)
      stu.presentDays = stu.attendance.filter((a) => a.present).length;
      stu.totalDays = 100; // keep stored totalDays aligned with UI expectation
      stu.attendancePercentage = `${Math.round((stu.presentDays / 100) * 100)}%`;

      await stu.save();
    }

    // Update class submission status for today
    try {
      const now = new Date();
      // store as Date; Dashboard will interpret as 'today' only if dates match
      cls.lastAttendanceDate = now;
      cls.attendanceSubmitted = true;
      await cls.save();
    } catch (e) {
      console.warn("Warning: failed to update class submission status", e);
    }

    res.status(200).json({
      message: `✅ Attendance successfully marked for ${className} on ${formattedDate}`,
      totalStudents: (studentsForClass || []).length,
    });
  } catch (error) {
    console.error("Error updating attendance:", error);
    res.status(500).json({ message: "Server error updating attendance" });
  }
});

// ✅ Get individual student's attendance dynamically
router.get("/me/:studentId", async (req, res) => {
  try {
    const student = await Student.findById(req.params.studentId);
    if (!student)
      return res.status(404).json({ message: "Student not found" });

    // ✅ Fix dashboard display: always show 100 total days
    const totalDaysFixed = 100;
    const presentDays = student.attendance.filter((a) => a.present).length;
    const attendancePercentage = `${Math.round(
      (presentDays / totalDaysFixed) * 100
    )}%`;

    // Send calculated values along with stored fields
    res.json({
      ...student._doc,
      totalDays: totalDaysFixed,
      presentDays,
      attendancePercentage,
    });
  } catch (err) {
    console.error("Error fetching student data:", err);
    res.status(500).json({ message: "Error fetching student data" });
  }
});

module.exports = router;
