const mongoose = require("mongoose");

const classSchema = new mongoose.Schema({
  classId: { type: String, required: true, unique: true },
  classTeacher: { type: mongoose.Schema.Types.ObjectId, ref: "Teacher", required: true },
  students: [{ type: mongoose.Schema.Types.ObjectId, ref: "Student" }],
  subjects: [{ type: String, required: true }],

  // ✅ Track attendance submissions (no daily reset)
  attendanceSubmitted: { type: Boolean, default: false },
  lastAttendanceDate: { type: Date },
});

module.exports = mongoose.model("Class", classSchema);
