const Homework = require("../models/Homework");
const Teacher = require("../models/Teacher");

// ✅ Assign Homework (Teacher)
exports.assignHomework = async (req, res) => {
  try {
    const teacherId = req.user.id; // from JWT
    const teacher = await Teacher.findById(teacherId);

    const subject = req.body.subject || teacher.subject;
    const { className, description, assignmentType, dueDate } = req.body;

    const homework = new Homework({
      teacherId,
      subject,
      className,
      description,
      assignmentType,
      dueDate,
    });

    await homework.save();
    res.status(201).json({ message: "Homework assigned successfully", homework });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to assign homework" });
  }
};

// ✅ Get Homework (Students)
exports.getHomework = async (req, res) => {
  try {
    const { className, subject } = req.query;
    const query = {};
    if (className) query.className = className;
    if (subject) query.subject = subject;

    const homeworkList = await Homework.find(query).sort({ dueDate: 1 });
    res.json(homeworkList);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch homework" });
  }
};
