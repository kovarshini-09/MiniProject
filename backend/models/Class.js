const mongoose = require("mongoose");

const classSchema = new mongoose.Schema({
  name: { type: String, required: true },
  students: { type: Number, default: 0 },
  boys: { type: Number, default: 0 },
  girls: { type: Number, default: 0 },
});

module.exports = mongoose.model("Class", classSchema);
