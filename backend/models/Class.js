const mongoose = require('mongoose');

const classSchema = new mongoose.Schema({
    classId: { type: String, required: true, unique: true },
    classTeacher: { type: mongoose.Schema.Types.ObjectId, ref: 'Teacher', required: true },
    students: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Student' }],
    subjects: [{ type: String, required: true }]
});

module.exports = mongoose.model('Class', classSchema);
