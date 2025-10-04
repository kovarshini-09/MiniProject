const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');
const Student = require('../models/Student');
const Teacher = require('../models/Teacher');

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    let user = await Admin.findOne({ email }) || await Student.findOne({ email }) || await Teacher.findOne({ email });

    if (!user) return res.status(400).json({ message: 'Invalid email or password' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid email or password' });

    const token = jwt.sign({ id: user._id, role: user.role || (user instanceof Admin ? 'admin' : user instanceof Student ? 'student' : 'teacher') }, 'secretkey', { expiresIn: '1d' });

    res.json({ token, role: user.role || (user instanceof Admin ? 'admin' : user instanceof Student ? 'student' : 'teacher') });
});

module.exports = router;
