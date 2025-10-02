const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const { getTeachers, addTeacher, latestTeacher } = require("../controllers/teacherController");
const router = express.Router();

router.use(protect(["admin"]));
router.get("/", getTeachers);
router.post("/", addTeacher);
router.get("/latest", latestTeacher);

module.exports = router;
