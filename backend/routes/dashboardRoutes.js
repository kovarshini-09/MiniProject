const express = require("express");
const router = express.Router();
const { getDashboard } = require("../controllers/dashboardController");
const { protect } = require("../middleware/authMiddleware");

// Admin, Teacher, Student can view dashboard
router.get("/", protect(["admin", "teacher", "student"]), getDashboard);

module.exports = router;