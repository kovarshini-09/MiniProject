const Class = require("../models/Class");
const Teacher = require("../models/Teacher");
const Student = require("../models/Student");

// ✅ Get all classes with teacher and students populated
const getClasses = async (req, res) => {
  try {
    const classes = await Class.find()
      .populate("students")
      .populate("classTeacher", "name"); // populate teacher name
    res.json(classes);
  } catch (error) {
    res.status(500).json({ message: "Error fetching classes", error });
  }
};

// ✅ Add a new class (with duplicate check)
const addClass = async (req, res) => {
  try {
    const { classId, classTeacher, students, subjects } = req.body;

    // Check for duplicate classId
    const existingClass = await Class.findOne({ classId });
    if (existingClass) {
      return res.status(400).json({ message: `Class ${classId} already exists` });
    }

    // Create new class
    const cls = new Class({ classId, classTeacher, students, subjects });
    await cls.save();

    // Link this class to teacher
    if (classTeacher) {
      await Teacher.findByIdAndUpdate(classTeacher, { classAssigned: cls._id });
    }

    const populatedClass = await Class.findById(cls._id).populate("classTeacher", "name");
    res.status(201).json(populatedClass);
  } catch (err) {
    console.error("Error adding class:", err);
    res.status(500).json({ message: "Server error adding class", error: err.message });
  }
};

// ✅ Get latest added class
const latestClass = async (req, res) => {
  try {
    const cls = await Class.findOne().sort({ _id: -1 });
    res.json(cls);
  } catch (err) {
    console.error("Error fetching latest class:", err);
    res.status(500).json({ message: "Server error fetching latest class" });
  }
};

// ✅ Delete class permanently (unlink teacher & students)
const deleteClass = async (req, res) => {
  try {
    const { id } = req.params;

    const cls = await Class.findById(id);
    if (!cls) return res.status(404).json({ message: "Class not found" });

    // Unlink teacher
    if (cls.classTeacher) {
      await Teacher.findByIdAndUpdate(cls.classTeacher, { $unset: { classAssigned: "" } });
    }

    // Unlink students
    if (cls.students && cls.students.length > 0) {
      await Student.updateMany({ _id: { $in: cls.students } }, { $unset: { classAssigned: "" } });
    }

    // Delete permanently
    await Class.findByIdAndDelete(id);

    res.json({ message: `Class ${cls.classId} deleted successfully` });
  } catch (err) {
    console.error("Error deleting class:", err);
    res.status(500).json({ message: "Server error deleting class" });
  }
  
};

module.exports = { getClasses, addClass, latestClass, deleteClass };
