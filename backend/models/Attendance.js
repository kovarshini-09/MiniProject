const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema({
  classId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Class",
    required: true,
  },
  date: {
    type: String, // Store as dd/mm/yyyy
    required: true,
  },
  teacherId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Teacher",
  },
  studentAttendance: [
    {
      studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student",
        required: true,
      },
      status: {
        type: String,
        enum: ["Present", "Absent"],
        default: "Present",
      },
    },
  ],
});

module.exports = mongoose.model("Attendance", attendanceSchema);
