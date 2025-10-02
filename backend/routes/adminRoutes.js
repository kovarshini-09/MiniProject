const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");

// Dashboard — only admin
router.get("/dashboard", protect(["admin"]), (req, res) => {
  res.send("Welcome to Admin Dashboard!");
});

module.exports = router;
