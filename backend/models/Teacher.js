const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const teacherSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // added for login
  mobileNo: { type: String, required: true },
  role: { type: String, required: true },
  picture: { type: String },
  dateOfJoining: { type: Date },
  salary: { type: Number },
  fatherName: { type: String },
  gender: { type: String },
  experience: { type: String },
  education: { type: String },
  bloodGroup: { type: String },
  address: { type: String },
});

// Hash password before save
teacherSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Compare password
teacherSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("Teacher", teacherSchema);
