const express = require("express");
const router = express.Router();
const Homework = require("../models/Homework");
const Teacher = require("../models/Teacher");
const jwt = require("jsonwebtoken");

// 🔒 Verify teacher
const authMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "No token provided" });

    const decoded = jwt.verify(token, "secretkey");
    req.userId = decoded.id;
    next();
  } catch (err) {
    console.error("Token verification failed:", err);
    return res.status(401).json({ message: "Unauthorized" });
  }
};

// ✅ Route 1: Teacher assigns homework
router.post("/assign", authMiddleware, async (req, res) => {
  try {
    const { description, dueDate, assignmentType, className } = req.body;

    if (!description || !dueDate || !assignmentType || !className)
      return res
        .status(400)
        .json({ message: "All required fields must be filled" });

    const teacher = await Teacher.findById(req.userId);
    if (!teacher) return res.status(404).json({ message: "Teacher not found" });

    const homework = new Homework({
      teacherId: teacher._id,
      subject: teacher.subject,
      description,
      dueDate,
      assignmentType,
      className,
    });

    await homework.save();

    res.status(201).json({
      message: `✅ Homework for ${teacher.subject} assigned successfully to class ${className}`,
      homework,
    });
  } catch (err) {
    console.error("Error assigning homework:", err);
    res.status(500).json({ message: "Server error while assigning homework" });
  }
});

// ✅ Route 2: Fetch homework
router.get("/", async (req, res) => {
  try {
    let { className, subject } = req.query;

    console.log("📘 Fetching homework for:", className, subject);

    // 🧠 Smart fix: If className includes "Grade", strip it
    if (className && className.includes("Grade")) {
      className = className.replace("Grade", "").trim();
    }

    const filter = {};
    if (className)
      filter.className = { $regex: new RegExp(`^${className}$`, "i") };
    if (subject)
      filter.subject = { $regex: new RegExp(`^${subject}$`, "i") };

    const homeworkList = await Homework.find(filter).sort({ createdAt: -1 });

    console.log("✅ Homework fetched:", homeworkList);
    res.json(homeworkList);
  } catch (err) {
    console.error("Error fetching homework:", err);
    res.status(500).json({ message: "Server error while fetching homework" });
  }
});

module.exports = router;
