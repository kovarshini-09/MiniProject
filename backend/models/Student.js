const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  registerNo: { type: String, required: true },
  class: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // added for login
  picture: { type: String },
  dateOfAdmission: { type: Date },
  fees: { type: Number },
  dob: { type: Date },
  gender: { type: String },
  previousSchool: { type: String },
  fatherName: { type: String },
  motherName: { type: String },
  address: { type: String },
});

// Hash password before save
studentSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Compare password
studentSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("Student", studentSchema);
