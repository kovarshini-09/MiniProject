const mongoose = require('mongoose');
const studentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    regNo: { type: String, required: true },
    class: { type: String, required: true },
    dob: { type: Date, required: true },
    gender: { type: String, required: true },
    fatherName: { type: String },
    motherName: { type: String },
    previousSchool: { type: String },
    address: { type: String },
    fees: { type: Number },
    identificationMark: { type: String },
    password: { type: String, required: true },
});
module.exports = mongoose.model('Student', studentSchema);
