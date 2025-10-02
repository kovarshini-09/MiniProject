const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");
const Student = require("../models/Student");
const Teacher = require("../models/Teacher");

// Generate JWT
const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

// ================= ADMIN LOGIN ==================
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email });

    if (!admin || admin.password !== password) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    res.json({
      _id: admin._id,
      name: admin.name,
      email: admin.email,
      role: "admin",
      token: generateToken(admin._id, "admin"),
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// ================= STUDENT LOGIN ==================
exports.studentLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const student = await Student.findOne({ email });

    if (!student || student.password !== password) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    res.json({
      _id: student._id,
      name: student.name,
      email: student.email,
      role: "student",
      token: generateToken(student._id, "student"),
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// ================= TEACHER LOGIN ==================
exports.teacherLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const teacher = await Teacher.findOne({ email });

    if (!teacher || teacher.password !== password) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    res.json({
      _id: teacher._id,
      name: teacher.name,
      email: teacher.email,
      role: "teacher",
      token: generateToken(teacher._id, "teacher"),
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
