// controllers/classController.js
const ClassModel = require("../models/Class");
const Student = require("../models/Student");

// ✅ Create new class
exports.createClass = async (req, res) => {
  try {
    const newClass = new ClassModel(req.body);
    await newClass.save();
    res.status(201).json(newClass);
  } catch (err) {
    console.error("Error creating class:", err);
    res.status(500).json({ message: "Server error while creating class" });
  }
};

// ✅ Get all classes
exports.getAllClasses = async (req, res) => {
  try {
    const classes = await ClassModel.find();
    const today = new Date().toDateString();
    const payload = classes.map((c) => {
      const isToday = c.lastAttendanceDate && new Date(c.lastAttendanceDate).toDateString() === today;
      return { ...c._doc, attendanceSubmitted: !!isToday };
    });
    res.json(payload);
  } catch (err) {
    console.error("Error fetching classes:", err);
    res.status(500).json({ message: "Server error while fetching classes" });
  }
};

// ✅ Get single class by ID
exports.getClassById = async (req, res) => {
  try {
    const singleClass = await ClassModel.findById(req.params.id);
    if (!singleClass) return res.status(404).json({ message: "Class not found" });
    res.json(singleClass);
  } catch (err) {
    console.error("Error fetching class:", err);
    res.status(500).json({ message: "Server error while fetching class" });
  }
};

// ✅ Delete class
exports.deleteClass = async (req, res) => {
  try {
    const deleted = await ClassModel.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Class not found" });
    res.json({ message: "Class deleted successfully" });
  } catch (err) {
    console.error("Error deleting class:", err);
    res.status(500).json({ message: "Server error while deleting class" });
  }
};

// ✅ Mark attendance submitted for a class (using MongoDB _id)
exports.markAttendanceSubmitted = async (req, res) => {
  try {
    const { classId } = req.body; // classId = MongoDB _id
    if (!classId) return res.status(400).json({ message: "Class ID required" });

    // ✅ Find by _id
    const classDoc = await ClassModel.findById(classId);
    if (!classDoc)
      return res.status(404).json({ message: "Class not found for ID " + classId });

    const today = new Date().toISOString().split("T")[0];

    // ✅ Prevent duplicate attendance
    if (classDoc.lastAttendanceDate === today) {
      return res.status(400).json({ message: "Attendance already marked for today." });
    }

    classDoc.lastAttendanceDate = today;
    classDoc.attendanceSubmitted = true;
    await classDoc.save();

    // ✅ Update all students in that class
    await Student.updateMany(
      { classId: classId },
      { $set: { attendancePercentage: 100 } }
    );

    res.json({ message: `Attendance marked successfully for ${classDoc.className}` });
  } catch (err) {
    console.error("Error marking attendance:", err);
    res.status(500).json({ message: "Internal Server Error while marking attendance" });
  }
};

// ✅ (Optional) Get teacher attendance summary
exports.getTeacherAttendanceSummary = async (req, res) => {
  try {
    const { teacherId } = req.params;
    const classes = await ClassModel.find({ assignedTeacher: teacherId });
    res.json(classes);
  } catch (err) {
    console.error("Error fetching teacher attendance summary:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
