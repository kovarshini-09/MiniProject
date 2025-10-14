const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const adminRoutes = require('./routes/adminRoutes');
const authRoutes = require('./routes/authRoutes');
const studentRoutes = require('./routes/studentRoutes');
const teacherRoutes = require('./routes/teacherRoutes');
const homeworkRoutes = require('./routes/homeworkRoutes'); // ✅ NEW

connectDB();
const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/teachers', teacherRoutes);
app.use('/api/homework', homeworkRoutes); // ✅ NEW

// ✅ Serve uploaded files statically


const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
