const express = require("express");
const { login, studentLogin, teacherLogin } = require("../controllers/authController");
const router = express.Router();

// Admin login
router.post("/login", login);

// Student login
router.post("/student-login", studentLogin);

// Teacher login
router.post("/teacher-login", teacherLogin);

module.exports = router;
