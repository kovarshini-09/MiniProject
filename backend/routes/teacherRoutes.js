const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const Teacher = require("../models/Teacher");
const Student = require("../models/Student");
const Class = require("../models/Class");

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

// ✅ Get students for logged-in class teacher only
router.get("/students", authMiddleware, async (req, res) => {
  try {
    const teacher = await Teacher.findById(req.user._id);
    if (!teacher) return res.status(404).json({ message: "Teacher not found" });

    // Prefer Class collection mapping (classTeacher -> Class)
    let cls = await Class.findOne({ classTeacher: teacher._id }).select("classId");

    // Fallback: use teacher.assignedClass if Class doc is not set up
    let classId = cls?.classId;
    if (!classId) {
      const fallback = (teacher.assignedClass || teacher.class || "").toString().trim();
      if (fallback) {
        classId = fallback;
      } else {
        // Final fallback: map by teacher name or email (permanent mapping like AllClasses)
        const mapByName = {
          nandhini: "9A",
          rekha: "9B",
          suresh: "9C",
          mani: "10A",
          meena: "10B",
          anitha: "10C",
        };
        const nameFull = (teacher.name || "").trim().toLowerCase();
        const nameKey = nameFull.split(/\s+/)[0] || nameFull; // first token matches, e.g., "nandhini r" -> "nandhini"
        const mapByEmail = {
          "nandhini@example.com": "9A",
          "rekha@example.com": "9B",
          "suresh@example.com": "9C",
          "mani@example.com": "10A",
          "meena@example.com": "10B",
          "anitha@example.com": "10C",
        };
        const emailKey = (teacher.email || "").trim().toLowerCase();
        const emailLocal = emailKey.split("@")[0];
        const mapByEmailLocal = {
          nandhini: "9A",
          rekha: "9B",
          suresh: "9C",
          mani: "10A",
          meena: "10B",
          anitha: "10C",
        };
        if (mapByName[nameKey]) {
          classId = mapByName[nameKey];
        } else if (mapByEmail[emailKey]) {
          classId = mapByEmail[emailKey];
        } else if (mapByEmailLocal[emailLocal]) {
          classId = mapByEmailLocal[emailLocal];
        } else {
          return res.status(404).json({ message: "Assigned class not found for teacher" });
        }
        if (process.env.NODE_ENV !== 'production') {
          console.log(`[teacher/students] resolved classId='${classId}' for teacher`, { name: teacher.name, email: teacher.email });
        }
      }
    }

    // Primary query: exact like "9A" or "9A Grade"
    let students = await Student.find({
      class: { $regex: new RegExp(`^${classId}(?:\\s*grade)?$`, "i") },
    }).select("name class regNo");

    // Fallback: normalize and filter if primary query returns none
    if (!students || students.length === 0) {
      const all = await Student.find().select("name class regNo");
      const norm = (v = "") => v.toString().toLowerCase().replace(/\s+/g, "").replace(/grade$/i, "");
      const target = norm(classId);
      students = all.filter((s) => norm(s.class) === target);
    }

    res.json({ classId, students: Array.isArray(students) ? students : [] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
