const JobLetter = require("../models/JobLetter");

// @desc    Get all job letters
// @route   GET /api/jobletters
// @access  Public
const getJobLetters = async (req, res) => {
  try {
    const letters = await JobLetter.find();
    res.status(200).json(letters);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get a single job letter by ID
// @route   GET /api/jobletters/:id
// @access  Public
const getJobLetterById = async (req, res) => {
  try {
    const letter = await JobLetter.findById(req.params.id);
    if (!letter) {
      return res.status(404).json({ message: "Job letter not found" });
    }
    res.status(200).json(letter);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a new job letter
// @route   POST /api/jobletters
// @access  Public
const createJobLetter = async (req, res) => {
  try {
    const { studentId, letterType, issueDate, details } = req.body;
    const newLetter = await JobLetter.create({
      studentId,
      letterType,
      issueDate,
      details,
    });
    res.status(201).json(newLetter);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update a job letter
// @route   PUT /api/jobletters/:id
// @access  Public
const updateJobLetter = async (req, res) => {
  try {
    const updatedLetter = await JobLetter.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedLetter) {
      return res.status(404).json({ message: "Job letter not found" });
    }
    res.status(200).json(updatedLetter);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete a job letter
// @route   DELETE /api/jobletters/:id
// @access  Public
const deleteJobLetter = async (req, res) => {
  try {
    const letter = await JobLetter.findByIdAndDelete(req.params.id);
    if (!letter) {
      return res.status(404).json({ message: "Job letter not found" });
    }
    res.status(200).json({ message: "Job letter deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getJobLetters,
  getJobLetterById,
  createJobLetter,
  updateJobLetter,
  deleteJobLetter,
};
