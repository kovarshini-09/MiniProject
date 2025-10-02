const Teacher = require("../models/Teacher");

const getTeachers = async (req, res) => {
  const teachers = await Teacher.find();
  res.json(teachers);
};

const addTeacher = async (req, res) => {
  const teacher = new Teacher(req.body);
  await teacher.save();
  res.status(201).json(teacher);
};

const latestTeacher = async (req, res) => {
  const teacher = await Teacher.findOne().sort({ _id: -1 });
  res.json(teacher);
};

module.exports = { getTeachers, addTeacher, latestTeacher };
