const Class = require("../models/Class");

const getClasses = async (req, res) => {
  const classes = await Class.find().populate("students");
  res.json(classes);
};

const addClass = async (req, res) => {
  const cls = new Class(req.body);
  await cls.save();
  res.status(201).json(cls);
};

const latestClass = async (req, res) => {
  const cls = await Class.findOne().sort({ _id: -1 });
  res.json(cls);
};

module.exports = { getClasses, addClass, latestClass };
