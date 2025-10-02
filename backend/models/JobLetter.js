// models/jobLetterModel.js
const mongoose = require("mongoose");

const jobLetterSchema = new mongoose.Schema({
  studentId: { type: String, required: true },
  letterType: { type: String, required: true },
  issueDate: { type: Date, required: true },
  details: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model("JobLetter", jobLetterSchema);
