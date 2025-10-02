const express = require("express");
const router = express.Router();
const {
  getJobLetters,
  getJobLetterById,
  createJobLetter,
  updateJobLetter,
  deleteJobLetter,
} = require("../controllers/jobLetterController");

// GET all job letters
router.get("/", getJobLetters);

// GET a single job letter by ID
router.get("/:id", getJobLetterById);

// POST a new job letter
router.post("/", createJobLetter);

// PUT update job letter
router.put("/:id", updateJobLetter);

// DELETE job letter
router.delete("/:id", deleteJobLetter);

module.exports = router;
