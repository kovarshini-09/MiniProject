// // // routes/attendance.js
// // const express = require("express");
// // const router = express.Router();
// // const Student = require("../models/Student");

// // // ✅ Add or update attendance for a specific class and date
// // router.post("/update", async (req, res) => {
// //   try {
// //     const { class: className, date } = req.body; // frontend sends "class"

// //     // ✅ Validation
// //     if (!className || !date) {
// //       return res.status(400).json({ message: "Class and date are required fields." });
// //     }

// //     // ✅ Find students in the selected class (partial + case-insensitive match)
// //     const students = await Student.find({
// //       class: { $regex: new RegExp(className, "i") },
// //     });

// //     if (!students.length) {
// //       return res
// //         .status(404)
// //         .json({ message: `No students found for class ${className}` });
// //     }

// //     // ✅ Update attendance for each student (avoid duplicates)
// //     for (const student of students) {
// //       if (!student.attendance) student.attendance = [];

// //       const alreadyMarked = student.attendance.some(
// //         (entry) => entry.date === date
// //       );

// //       if (!alreadyMarked) {
// //         student.attendance.push({ date, present: true });

// //         // ✅ Attendance percentage tracking
// //         student.presentDays = (student.presentDays || 0) + 1;
// //         student.totalDays = student.totalDays || 100;
// //         const percentage = ((student.presentDays / student.totalDays) * 100).toFixed(1);
// //         student.attendancePercentage = `${percentage}%`;

// //         await student.save();
// //       }
// //     }

// //     res.status(200).json({
// //       message: `✅ Attendance recorded for class ${className} on ${date}`,
// //       totalStudents: students.length,
// //     });
// //   } catch (error) {
// //     console.error("❌ Error updating attendance:", error);
// //     res
// //       .status(500)
// //       .json({ message: "Server error while updating attendance" });
// //   }
// // });

// // // ✅ Route to get current student's updated info (used in StudentDashboard.jsx)
// // router.get("/me/:studentId", async (req, res) => {
// //   try {
// //     const student = await Student.findById(req.params.studentId);
// //     if (!student) return res.status(404).json({ message: "Student not found" });
// //     res.json(student);
// //   } catch (err) {
// //     res.status(500).json({ message: "Error fetching student data" });
// //   }
// // });

// // module.exports = router;
// const express = require("express");
// const router = express.Router();
// const Student = require("../models/Student");
// const auth = require("../middleware/authMiddleware");

// // ✅ Add or update attendance for a specific class and date
// // Rule: Only class teacher can submit and only once per class per date
// router.post("/update", auth, async (req, res) => {
//   try {
//     const { class: className, date } = req.body; // frontend sends "class"

//     // ✅ Validation
//     if (!className || !date) {
//       return res
//         .status(400)
//         .json({ message: "Class and date are required fields." });
//     }

//     // ✅ Authorization: teacher-only
//     if (req.role !== "teacher") {
//       return res.status(403).json({ message: "Only teachers can submit attendance" });
//     }

//     // ✅ Ensure this teacher is the assigned class teacher
//     const normalize = (v) => (v || "").toString().trim().toLowerCase();
//     const teacherClass = normalize(req.user?.assignedClass || req.user?.class);
//     if (teacherClass && normalize(className) !== teacherClass) {
//       return res.status(403).json({ message: "You are not the class teacher for this class" });
//     }

//     // ✅ Find students in the selected class (case-insensitive + partial match)
//     const students = await Student.find({
//       class: { $regex: new RegExp(className.trim(), "i") },
//     });

//     if (!students.length) {
//       return res
//         .status(404)
//         .json({ message: `No students found for class ${className}` });
//     }

//     // ✅ Use incoming date string as-is if already formatted (dd/mm/yyyy)
//   const formattedDate = typeof date === "string" && date.includes("/")
//     ? date
//     : new Date(date).toLocaleDateString("en-GB");

//     // ✅ Class-level guard: allow marking once per class per date
//     const anyAlreadyMarked = await Student.exists({
//       class: { $regex: new RegExp(className.trim(), "i") },
//       "attendance.date": formattedDate,
//     });
//     if (anyAlreadyMarked) {
//       return res.status(409).json({ message: `Attendance for ${className} on ${formattedDate} already submitted` });
//     }

//     // ✅ Update attendance for each student
//     for (const student of students) {
//       if (!student.attendance) student.attendance = [];

//       const alreadyMarked = student.attendance.some(
//         (entry) => entry.date === formattedDate
//       );

//     // Record the date only once
//     if (!alreadyMarked) {
//       student.attendance.push({ date: formattedDate, present: true });
//     }

//     // Increment present days by 1 per submission
//     student.presentDays = (student.presentDays || 0) + 1;
//     student.totalDays = student.totalDays || 100;
//     const percentage = (
//       (student.presentDays / student.totalDays) *
//       100
//     ).toFixed(0);
//     student.attendancePercentage = `${percentage}%`;

//     await student.save();
//     }

//     res.status(200).json({
//       message: `✅ Attendance recorded for class ${className} on ${formattedDate}`,
//       totalStudents: students.length,
//     });
//   } catch (error) {
//     console.error("❌ Error updating attendance:", error);
//     res
//       .status(500)
//       .json({ message: "Server error while updating attendance" });
//   }
// });

// // ✅ Route to get current student's updated info (used in StudentDashboard.jsx)
// router.get("/me/:studentId", async (req, res) => {
//   try {
//     const student = await Student.findById(req.params.studentId);
//     if (!student)
//       return res.status(404).json({ message: "Student not found" });
//     res.json(student);
//   } catch (err) {
//     res.status(500).json({ message: "Error fetching student data" });
//   }
// });

// module.exports = router;
const express = require("express");
const router = express.Router();
const Student = require("../models/Student");
const auth = require("../middleware/authMiddleware");

// ✅ Add or update attendance for a specific class and date
// Rule: Only class teacher can submit and only once per class per date
router.post("/update", auth, async (req, res) => {
  try {
    const { class: className, date } = req.body;

    // ✅ Validation
    if (!className || !date) {
      return res
        .status(400)
        .json({ message: "Class and date are required fields." });
    }

    // ✅ Authorization: only teacher can submit
    if (req.role !== "teacher") {
      return res
        .status(403)
        .json({ message: "Only teachers can submit attendance" });
    }

    // ✅ Ensure this teacher is the assigned class teacher
    const normalize = (v) => (v || "").toString().trim().toLowerCase();
    const teacherClass = normalize(req.user?.assignedClass || req.user?.class);

    if (teacherClass && normalize(className) !== teacherClass) {
      return res
        .status(403)
        .json({ message: "You are not the class teacher for this class" });
    }

    // ✅ Find students in that class (case-insensitive)
    const students = await Student.find({
      class: { $regex: new RegExp(className.trim(), "i") },
    });

    if (!students.length) {
      return res
        .status(404)
        .json({ message: `No students found for class ${className}` });
    }

    // ✅ Normalize and format date
    const formattedDate =
      typeof date === "string" && date.includes("/")
        ? date
        : new Date(date).toLocaleDateString("en-GB");

    // ✅ Prevent double submission (once per class per day)
    const alreadySubmitted = await Student.exists({
      class: { $regex: new RegExp(className.trim(), "i") },
      "attendance.date": formattedDate,
    });
    if (alreadySubmitted) {
      return res.status(409).json({
        message: `Attendance for ${className} on ${formattedDate} already submitted`,
      });
    }

    // ✅ Update attendance for each student
    for (const student of students) {
      if (!student.attendance) student.attendance = [];

      const alreadyMarked = student.attendance.some(
        (entry) => entry.date === formattedDate
      );

      if (!alreadyMarked) {
        student.attendance.push({ date: formattedDate, present: true });
      }

      student.presentDays = (student.presentDays || 0) + 1;
      student.totalDays = student.totalDays || 100;
      const percentage = (
        (student.presentDays / student.totalDays) *
        100
      ).toFixed(0);
      student.attendancePercentage = `${percentage}%`;

      await student.save();
    }

    res.status(200).json({
      message: `✅ Attendance recorded for class ${className} on ${formattedDate}`,
      totalStudents: students.length,
    });
  } catch (error) {
    console.error("❌ Error updating attendance:", error);
    res.status(500).json({
      message: "Server error while updating attendance",
    });
  }
});

// ✅ Route to get current student's updated info
router.get("/me/:studentId", async (req, res) => {
  try {
    const student = await Student.findById(req.params.studentId);
    if (!student)
      return res.status(404).json({ message: "Student not found" });
    res.json(student);
  } catch (err) {
    res.status(500).json({ message: "Error fetching student data" });
  }
});

module.exports = router;

