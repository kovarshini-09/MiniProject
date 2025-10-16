const mongoose = require('mongoose');
const teacherSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    mobileNumber: { type: String, required: true },
    subject: { type: String, required: true },
    dob: { type: Date, required: true },
    gender: { type: String, required: true },
    fatherName: { type: String },
    motherName: { type: String },
    picture: { type: String },
    monthlySalary: { type: Number },
    experience: { type: Number },
    education: { type: String },
    bloodGroup: { type: String },
    address: { type: String },
    password: { type: String, required: true },
    // Optional: class teacher assignment for authorization
    assignedClass: { type: String },
});
module.exports = mongoose.model('Teacher', teacherSchema);
