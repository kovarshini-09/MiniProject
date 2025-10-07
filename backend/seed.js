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

    // ---------- Admins ----------
    const adminNames = ['Kannan', 'Murali', 'Devi', 'Divya', 'Mani'];
    for (let name of adminNames) {
      const password = await bcrypt.hash(`${name.toLowerCase()}.admin`, 10);
      const admin = new Admin({
        name,
        email: `${name.toLowerCase()}.admin@gmail.com`,
        password,
        role: 'admin'
      });
      await admin.save();
    }

    // ---------- Students ----------
    const classes = ['9A','9B','9C','10A','10B','10C'];
    const feesMap = {'9':25000, '10':30000};

    const maleNames = [
      'Arjun','Karthik','Vijay','Ravi','Suresh','Mani','Pradeep','Kumar','Hari','Raghav',
      'Anand','Sathya','Vikram','Dinesh','Ajay','Rahul','Vivek','Santhosh','Rohit','Nikhil',
      'Aravind','Kavin','Saravanan','Murugan','Balaji','Ramesh','Rajesh','Shankar','Kishore','Gokul'
    ];

    const femaleNames = [
      'Divya','Devi','Roshini','Anitha','Priya','Lakshmi','Meena','Geetha','Nandhini','Sowmya',
      'Keerthi','Harini','Sneha','Deepa','Nithya','Vaishnavi','Hema','Aishwarya','Jyothi','Pavithra',
      'Bhavya','Shalini','Sangeetha','Revathi','Indhu','Ramya','Rekha','Sujatha','Yamini','Sindhu'
    ];

    const fathers = [
      'Murali','Rajendran','Kannan','Subramani','Venkatesh','Mani','Ramasamy','Krishnan','Sathish','Balaji',
      'Ganesh','Vijayan','Prabhu','Dharan','Ajith','Ranjith','Karthesan','Selvam','Vijayanandan','Sundar',
      'Anbu','Shanmugam','Rajkumar','Sekar','Vimal','Harish','Natarajan','Raghunandan','Kalyan','Praveen'
    ];

    const mothers = [
      'Seetha','Lakshmi','Meena','Sowmiya','Radha','Uma','Vimala','Geetha','Janaki','Anitha',
      'Kavitha','Latha','Jayanthi','Sangeetha','Anusuya','Chithra','Hema','Aishwarya','Sujatha','Kalpana',
      'Poornima','Vasanthi','Shobana','Ramya','Bhavani','Deepa','Indira','Nirmala','Rajalakshmi','Hemalatha'
    ];

    const previousSchools = [
      'Government High School, Chennai','St. Mary\'s School, Coimbatore','Kendriya Vidyalaya, Trichy','Saraswathi Vidyalaya, Salem',
      'St. Joseph School, Madurai','Government Girls School, Erode','Loyola School, Coimbatore','Vidhya Mandir, Trichy',
      'Central School, Madurai','Government Boys School, Salem','Little Flower School, Coimbatore','Sacred Heart School, Chennai',
      'St. Anne School, Trichy','Holy Cross School, Madurai','Christ School, Coimbatore','Mount Carmel School, Salem',
      'St. Thomas School, Erode','St. Michael School, Chennai','St. Xavier School, Coimbatore','St. Paul School, Madurai',
      'St. Francis School, Trichy','St. Mary School, Erode','St. Antony School, Salem','St. Peter School, Coimbatore',
      'St. Josephine School, Madurai','St. Theresa School, Trichy','St. Agnes School, Coimbatore','St. John School, Salem',
      'St. Mary Magdalene School, Erode','St. Cecilia School, Madurai','St. Rita School, Coimbatore','St. Martha School, Trichy',
      'St. Monica School, Salem','St. Lucy School, Coimbatore','St. Bridget School, Madurai','St. Claire School, Trichy',
      'St. Bernadette School, Erode','St. Margaret School, Coimbatore','St. Rose School, Salem','St. Catherine School, Trichy',
      'St. Anne Marie School, Madurai','St. Therese School, Coimbatore','St. Elizabeth School, Salem','St. Philomena School, Erode',
      'St. Cecilia School, Trichy','St. Agnes School, Madurai','St. Teresa School, Coimbatore','St. Lucy School, Salem',
      'St. Rita School, Trichy','St. Martha School, Madurai','St. Monica School, Coimbatore','St. Clare School, Erode',
      'St. Bernadette School, Salem','St. Margaret School, Trichy','St. Rose School, Coimbatore','St. Catherine School, Madurai'
    ];

    const identificationMarks = [
      'Mole on left cheek','Scar on forehead','Birthmark on neck','Mole on right hand','Freckles on nose',
      'Small scar on chin','Mole near left eye','Birthmark on left arm','Scar on right knee','Freckles on cheeks',
      'Mole on right cheek','Scar above left eyebrow','Birthmark on right shoulder','Mole on chin','Freckles on arms',
      'Small mole on forehead','Scar on left knee','Birthmark on forehead','Mole on left hand','Freckles on nose',
      'Scar on right elbow','Mole near right eye','Birthmark on right thigh','Freckles on legs','Mole on left shoulder',
      'Scar on chin','Birthmark on back','Mole on right shoulder','Freckles on arms','Small mole on neck',
      'Scar on left elbow','Mole on forehead','Birthmark on right hand','Freckles on face','Mole near chin',
      'Scar on right shoulder','Birthmark on left leg','Mole on right thigh','Freckles on back','Mole on left thigh',
      'Scar on nose','Birthmark on chest','Mole on left ear','Freckles on forehead','Mole on right ear',
      'Scar on neck','Birthmark on left hand','Mole on back','Freckles on shoulder','Mole on left knee',
      'Scar on forehead','Birthmark on left thigh','Mole on left wrist','Freckles on chin','Mole on right wrist'
    ];

    let regCounter = 1;

    for (let cls of classes) {
      for (let i = 0; i < 10; i++) {
        const isMale = i < 5;
        const name = isMale ? maleNames.shift() : femaleNames.shift();
        const fatherName = fathers.shift();
        const motherName = mothers.shift();
        const dob = new Date(2006 + parseInt(cls[0]), i % 12, (i % 28) + 1);
        const passwordPlain = `${name.toLowerCase()}${cls}`;
        const password = await bcrypt.hash(passwordPlain, 10);

        const student = new Student({
          name,
          regNo: `S${String(regCounter).padStart(3,'0')}`,
          class: `${cls} Grade`,
          dob,
          gender: isMale ? 'Male' : 'Female',
          fatherName,
          motherName,
          previousSchool: previousSchools.shift(),
          identificationMark: identificationMarks.shift(),
          address: `No.${regCounter} School Road, Near Landmark, City, Tamil Nadu, India`,
          fees: feesMap[cls[0]],
          email: `${name.toLowerCase()}${cls}@gmail.com`,
          password,
          role: 'student'
        });

        await student.save();
        regCounter++;
      }
    }

    // ---------- Teachers ----------
    const teacherData = [
      {name:'Arun Kumar', subject:'Math'},
      {name:'Rekha', subject:'Math'},
      {name:'Suresh', subject:'Science'},
      {name:'Geetha', subject:'English'},
      {name:'Priya', subject:'Tamil'},
      {name:'Mani', subject:'Social'},
      {name:'Karthik', subject:'Math'},
      {name:'Lakshmi', subject:'English'},
      {name:'Vijay', subject:'Science'},
      {name:'Divya', subject:'Tamil'},
      {name:'Roshini', subject:'Social'},
      {name:'Anitha', subject:'Math'},
      {name:'Hari', subject:'Science'},
      {name:'Meena', subject:'English'},
      {name:'Balaji', subject:'Math'},
      {name:'Nandhini', subject:'Social'},
      {name:'Ravi', subject:'Science'},
      {name:'Sathish', subject:'English'},
      {name:'Raghav', subject:'Math'}
    ];

    const teacherFathers = [
      'Chandrasekar', 'Rajendran', 'Sivakumar', 'Perumal', 'Venkatesh',
      'Ramasamy', 'Murugan', 'Kalyanaraman', 'Manoharan', 'Balasubramanian',
      'Duraisamy', 'Subramani', 'Arunachalam', 'Natarajan', 'Ravichandran',
      'Sampath', 'Gopal', 'Krishnamurthy', 'Rajan'
    ];

    const teacherMothers = [
      'Kavitha', 'Saraswathi', 'Latha', 'Meenakshi', 'Vijaya',
      'Usha', 'Bhavani', 'Annapoorani', 'Geetha', 'Jayanthi',
      'Revathi', 'Radha', 'Uma', 'Sundari', 'Hemalatha',
      'Janaki', 'Sangeetha', 'Indira', 'Lakshmi'
    ];

    let teacherIndex = 0;
    for (let t of teacherData) {
      const password = await bcrypt.hash(t.name.toLowerCase(), 10);
      const teacher = new Teacher({
        name: t.name,
        email: `${t.name.toLowerCase().replace(' ', '')}@gmail.com`,
        password,
        mobileNumber: '9876543210',
        subject: t.subject,
        dob: new Date(1980 + Math.floor(Math.random() * 10), Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1),
        gender: Math.random() > 0.5 ? 'Male' : 'Female',
        fatherName: teacherFathers[teacherIndex],
        motherName: teacherMothers[teacherIndex],
        monthlySalary: 30000 + Math.floor(Math.random() * 10000),
        experience: 5 + Math.floor(Math.random() * 15),
        education: 'M.Ed / B.Ed',
        bloodGroup: 'B+',
        address: `No.${teacherIndex + 1}, Staff Quarters, Coimbatore, Tamil Nadu, India`,
        role: 'teacher'
      });
      await teacher.save();
      teacherIndex++;
    }

    console.log('✅ Database seeded successfully with 5 admins, 60 students, and 19 teachers (all with unique father & mother names)!');
    process.exit();

  } catch (err) {
    console.error('❌ Seeding error:', err);
    process.exit(1);
  }
};

seedDB();
