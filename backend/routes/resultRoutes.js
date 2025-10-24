// const express = require("express");
// const Result = require("../models/Result");
// const Student = require("../models/Student");
// const auth = require("../middleware/authMiddleware");

// const router = express.Router();

// // Teacher posts marks for a student; only class teacher allowed
// router.post("/", auth, async (req, res) => {
//   try {
//     const { studentId, exam, marks } = req.body;
//     if (!studentId || !exam || !marks) {
//       return res.status(400).json({ message: "studentId, exam, marks required" });
//     }

//     const student = await Student.findById(studentId);
//     if (!student) return res.status(404).json({ message: "Student not found" });

//     // Authorization: require teacher role
//     if (req.role !== "teacher") {
//       return res.status(403).json({ message: "Only teachers can submit marks" });
//     }

//     // Basic class teacher rule: teacher's subject ignored, only class match required
//     // Assuming teacher has a field 'assignedClass' equal to student's class value
//     // If Teacher model differs, adjust accordingly
//     const teacherClass = req.user?.assignedClass || req.user?.class || "";
//     if (teacherClass && student.class && teacherClass.toLowerCase() !== student.class.toLowerCase()) {
//       return res.status(403).json({ message: "Not this class's teacher" });
//     }

//     const total = Object.values(marks).reduce((sum, v) => sum + (Number(v) || 0), 0);
//     const percentage = Object.keys(marks).length ? (total / (Object.keys(marks).length * 100)) * 100 : 0;

//     const payload = {
//       studentRegNo: student.regNo,
//       classId: student.class,
//       exam,
//       marks,
//       total,
//       percentage: Number(percentage.toFixed(2)),
//     };

//     // Upsert by student+exam
//     const saved = await Result.findOneAndUpdate(
//       { studentRegNo: student.regNo, exam },
//       payload,
//       { upsert: true, new: true, setDefaultsOnInsert: true }
//     );

//     res.json({ message: "Marks saved", result: saved });
//   } catch (err) {
//     console.error("save marks error", err);
//     res.status(500).json({ message: "Server error" });
//   }
// });

// // Student fetches their results
// router.get("/me", auth, async (req, res) => {
//   try {
//     if (req.role !== "student") {
//       return res.status(403).json({ message: "Only students can view their marks" });
//     }
//     const results = await Result.find({ studentRegNo: req.user.regNo }).sort({ _id: -1 });
//     res.json(results);
//   } catch (err) {
//     res.status(500).json({ message: "Server error" });
//   }
// });

// module.exports = router;
const express = require("express");
const Result = require("../models/Result");
const Student = require("../models/Student");
const Class = require("../models/Class");
const auth = require("../middleware/authMiddleware");

const router = express.Router();

// ✅ Teacher posts marks for a student — Only assigned class teacher
router.post("/", auth, async (req, res) => {
  try {
    const { studentId, exam, marks } = req.body;

    if (!studentId || !exam || !marks) {
      return res
        .status(400)
        .json({ message: "studentId, exam, and marks are required" });
    }

    const student = await Student.findById(studentId);
    if (!student) return res.status(404).json({ message: "Student not found" });

    // ✅ Only teacher role can submit marks
    if (req.role !== "teacher") {
      return res
        .status(403)
        .json({ message: "Only teachers can submit marks" });
    }

    // ✅ Ensure this teacher is the class teacher as per Class collection
    // Normalize student's class by stripping trailing 'grade'
    const normalize = (v) => (v || "").toString().trim().replace(/\s*grade\s*$/i, "");
    const studentClassKey = normalize(student.class);
    const classDoc = await Class.findOne({ classId: new RegExp(`^${studentClassKey}$`, "i") });
    if (!classDoc) {
      return res.status(404).json({ message: `Class ${studentClassKey} not found` });
    }
    if (!classDoc.classTeacher || classDoc.classTeacher.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "You are not this class's teacher" });
    }

    // ✅ Compute totals
    const total = Object.values(marks).reduce(
      (sum, v) => sum + (Number(v) || 0),
      0
    );
    const percentage =
      Object.keys(marks).length > 0
        ? (total / (Object.keys(marks).length * 100)) * 100
        : 0;

    const payload = {
      studentRegNo: student.regNo,
      classId: student.class,
      exam,
      marks,
      total,
      percentage: Number(percentage.toFixed(2)),
    };

    // ✅ Upsert by student+exam
    const saved = await Result.findOneAndUpdate(
      { studentRegNo: student.regNo, exam },
      payload,
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    res.json({ message: "Marks saved successfully", result: saved });
  } catch (err) {
    console.error("❌ Error saving marks:", err);
    res.status(500).json({ message: "Server error while saving marks" });
  }
});

// ✅ List students who already have results for a given exam (and optional class)
router.get("/submitted", auth, async (req, res) => {
  try {
    const { exam, classId } = req.query;
    if (!exam) {
      return res.status(400).json({ message: "exam query param is required" });
    }

    // Build query
    const query = { exam };
    if (classId) {
      // Match class id case-insensitively similar to POST route
      const normalize = (v) => (v || "").toString().trim().replace(/\s*grade\s*$/i, "");
      const classKey = normalize(classId);
      query.classId = new RegExp(`^${classKey}$`, "i");
    }

    const results = await Result.find(query, { studentRegNo: 1, _id: 0 });
    const regNos = results.map((r) => r.studentRegNo);

    // Map regNos to student _ids to simplify frontend filtering
    const students = await Student.find({ regNo: { $in: regNos } }, { _id: 1 });
    const submittedIds = students.map((s) => s._id.toString());

    res.json({ submittedIds });
  } catch (err) {
    console.error("❌ Error fetching submitted students:", err);
    res.status(500).json({ message: "Server error while fetching submitted students" });
  }
});

// ✅ Student fetches their results
router.get("/me", auth, async (req, res) => {
  try {
    if (req.role !== "student") {
      return res
        .status(403)
        .json({ message: "Only students can view their marks" });
    }

    const results = await Result.find({
      studentRegNo: req.user.regNo,
    }).sort({ _id: -1 });

    res.json(results);
  } catch (err) {
    res.status(500).json({ message: "Server error while fetching marks" });
  }
});

module.exports = router;

