const Student = require("../models/Student");
const Teacher = require("../models/Teacher");

exports.getDashboard = async (req, res) => {
  const totalStudents = await Student.countDocuments();
  const totalTeachers = await Teacher.countDocuments();
  res.json({
    totalStudents,
    totalTeachers,
    absentStudents: "Attendance not marked yet",
    presentTeachers: "Attendance not marked yet",
    newAdmissions: "No new Admission"
  });
};
