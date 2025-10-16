const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');

// ✅ Import route files
const adminRoutes = require('./routes/adminRoutes');
const authRoutes = require('./routes/authRoutes');
const studentRoutes = require('./routes/studentRoutes');
const teacherRoutes = require('./routes/teacherRoutes');
const homeworkRoutes = require('./routes/homeworkRoutes');
const classRoutes = require('./routes/classRoutes');
const resultRoutes = require('./routes/resultRoutes');
const attendanceRoutes = require('./routes/attendance'); // ✅ Import cleanly once

// ✅ Connect Database
connectDB();

const app = express();

// ✅ Middleware
app.use(cors());
app.use(express.json());

// ✅ Route Mounting
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/teachers', teacherRoutes);
app.use('/api/homework', homeworkRoutes);
app.use('/api/attendance', attendanceRoutes); // ✅ Clean usage
app.use('/api/classes', classRoutes);
app.use('/api/results', resultRoutes);

// ✅ Optional: Static file serving for uploads (if used)
app.use('/uploads', express.static('uploads'));

// ✅ Default route
app.get('/', (req, res) => {
  res.send('School Management System API is running...');
});

// ✅ Error handler (optional, for debugging)
app.use((err, req, res, next) => {
  console.error('Server error:', err.message);
  res.status(500).json({ message: 'Internal server error' });
});

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
