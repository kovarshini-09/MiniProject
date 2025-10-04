const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Admin = require('./models/Admin');
const Student = require('./models/Student');
const Teacher = require('./models/Teacher');
const connectDB = require('./config/db');

connectDB();

const seedDB = async () => {
  try {
    // Delete existing data
    await Admin.deleteMany({});
    await Student.deleteMany({});
    await Teacher.deleteMany({});

    // ---------- Admin ----------
    const adminPassword = await bcrypt.hash('Admin@123', 10);
    const admin = new Admin({
      name: 'Super Admin',
      email: 'admin@gmail.com',
      password: adminPassword,
      role: 'admin',
    });
    await admin.save();

    // ---------- 1 Student ----------
    const studentPassword = await bcrypt.hash('123456', 10);
    const student = new Student({
      name: 'Divya Gupta',
      email: 'divyagupta@gmail.com',
      regNo: 'ST001',
      class: '10th Grade',
      dob: new Date(2006, 4, 15),
      gender: 'Female',
      fatherName: 'Murali',
      motherName: 'Seetha',
      previousSchool: 'Government Higher Secondary School, Coimbatore',
      address: 'No.1, Main Road, Near Bus Stop, Coimbatore, Tamil Nadu, India',
      fees: 10000,
      identificationMark: 'Mole on left cheek',
      password: studentPassword,
    });
    await student.save();

    // ---------- 1 Teacher ----------
    const teacherPassword = await bcrypt.hash('123456', 10);
    const teacher = new Teacher({
      name: 'Arun Kumar',
      email: 'arunkumar@gmail.com',
      mobileNumber: '9876543210',
      subject: 'Math',
      dob: new Date(1985, 6, 20),
      gender: 'Male',
      fatherName: 'Murali',
      motherName: 'Seetha',
      picture: '',
      monthlySalary: 30000,
      experience: 5,
      education: 'M.Ed / B.Ed',
      bloodGroup: 'B+',
      address: 'No.10, School Street, Coimbatore, Tamil Nadu, India',
      password: teacherPassword,
    });
    await teacher.save();

    console.log('Database seeded successfully with 1 admin, 1 student, 1 teacher!');
    process.exit();
  } catch (err) {
    console.error('Seeding error:', err);
    process.exit(1);
  }
};

seedDB();
