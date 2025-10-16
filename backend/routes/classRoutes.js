const express = require("express");
const { getClasses, addClass, latestClass, deleteClass } = require("../controllers/classController");
const router = express.Router();

router.get("/", getClasses);
router.post("/", addClass);
router.get("/latest", latestClass);
router.delete("/:id", deleteClass); // ✅ added

module.exports = router;
