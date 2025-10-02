const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const { getClasses, addClass, latestClass } = require("../controllers/classController");
const router = express.Router();

router.use(protect(["admin", "teacher"]));
router.get("/", getClasses);
router.post("/", addClass);
router.get("/latest", latestClass);

module.exports = router;
