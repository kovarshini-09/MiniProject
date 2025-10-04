const mongoose = require('mongoose');

const resultSchema = new mongoose.Schema({
    studentRegNo: { type: String, required: true },
    classId: { type: String, required: true },
    exam: { type: String, required: true },
    marks: { type: Map, of: Number },
    total: { type: Number },
    percentage: { type: Number }
});

module.exports = mongoose.model('Result', resultSchema);
