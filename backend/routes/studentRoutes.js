const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const { getStudents, addStudent, latestStudent } = require("../controllers/studentController");
const router = express.Router();

router.use(protect(["admin"]));
router.get("/", getStudents);
router.post("/", addStudent);
router.get("/latest", latestStudent);

module.exports = router;
