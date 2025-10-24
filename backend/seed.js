const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Admin = require('./models/Admin');
const Student = require('./models/Student');
const Teacher = require('./models/Teacher');
const Class = require('./models/Class');
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

    // ---------- Post-process: backfill missing fields for specific 10th-grade students only ----------
    try {
      const allStudentsForFix = await Student.find();
      const isTenth = (v = "") => /^10[ABC]/i.test((v || "").toString());
      const toLower = (s = "") => s.toString().trim().toLowerCase();
      const hash = (s = "") => {
        let h = 0; for (let i = 0; i < s.length; i++) { h = (h * 31 + s.charCodeAt(i)) >>> 0; } return h;
      };
      const pickFrom = (arr, key) => arr[hash(key) % arr.length];

      // Curated sample pools to assign meaningful defaults (deterministic per name)
      const sampleFathers = [
        'Rajendran','Kannan','Subramani','Venkatesh','Ramasamy','Krishnan','Sathish','Balaji','Ganesh','Vijayan',
        'Prabhu','Shanmugam','Rajkumar','Sekar','Vimal','Harish','Natarajan','Raghunandan','Kalyan','Praveen'
      ];
      const sampleMothers = [
        'Seetha','Lakshmi','Meena','Radha','Uma','Vimala','Geetha','Janaki','Anitha','Kavitha',
        'Latha','Jayanthi','Sangeetha','Chithra','Hema','Aishwarya','Sujatha','Kalpana','Poornima','Vasanthi'
      ];
      const sampleIdMarks = [
        'Mole on left cheek','Scar on forehead','Birthmark on neck','Mole on right hand','Freckles on nose',
        'Small scar on chin','Mole near left eye','Scar on right knee','Birthmark on right shoulder','Mole on chin'
      ];
      const samplePrevSchools = [
        "St. Mary's School, Coimbatore","Kendriya Vidyalaya, Trichy","Saraswathi Vidyalaya, Salem",
        'St. Joseph School, Madurai','Government Girls School, Erode','Loyola School, Coimbatore',
        'Vidhya Mandir, Trichy','Central School, Madurai','Government Boys School, Salem','Sacred Heart School, Chennai'
      ];

      // Groups per requirement
      const groupBasic = new Set([
        'rahul', 'vivek', 'santosh', 'santhosh', 'rohit', 'nikhil', 'vaishnavi', 'hema', 'aishwarya', 'jyothi', 'joythi', 'pavithra',
        'aravind', 'kavin', 'saravanan', 'murugan', 'balaji', 'bhavya', 'shalini', 'sangeetha', 'revathi', 'indhu', 'ramesh', 'rajesh', 'shankar', 'kishore', 'gokul'
      ]);
      const groupPlusId = new Set(['ramya']);
      const groupFull = new Set(['rekha', 'sujatha', 'yamini', 'sindhu']);

      let fixes = 0;
      for (const s of allStudentsForFix) {
        const nameKey = toLower(s.name || "");
        if (!isTenth(s.class)) continue; // keep 9th grade intact
        const needsBasic = groupBasic.has(nameKey) || groupPlusId.has(nameKey) || groupFull.has(nameKey);
        if (!needsBasic) continue;

        let changed = false;
        if (!s.fatherName) { s.fatherName = pickFrom(sampleFathers, nameKey); changed = true; }
        if (!s.motherName) { s.motherName = pickFrom(sampleMothers, nameKey); changed = true; }
        if (!s.fees || typeof s.fees !== 'number' || s.fees <= 0) { s.fees = 30000; changed = true; }

        if (groupPlusId.has(nameKey) || groupFull.has(nameKey)) {
          if (!s.identificationMark) { s.identificationMark = pickFrom(sampleIdMarks, nameKey); changed = true; }
        }
        if (groupFull.has(nameKey)) {
          if (!s.previousSchool) { s.previousSchool = pickFrom(samplePrevSchools, nameKey); changed = true; }
        }

        if (changed) { await s.save(); fixes++; }
      }
      if (process.env.NODE_ENV !== 'production') {
        console.log(`✅ Backfilled ${fixes} student record(s) for 10th grade.`);
      }
    } catch (e) {
      console.warn('⚠️  Post-seed backfill step skipped due to error:', e?.message || e);
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

    // Explicit gender overrides for specific teachers
    const genderOverrides = {
      'arun kumar': 'Male',
      'suresh': 'Male',
      'karthik': 'Male',
      'divya': 'Female',
      'roshini': 'Female',
      'meena': 'Female',
      'nandhini': 'Female',
      'ravi': 'Male',
      'sathish': 'Male',
      'geetha': 'Female',
      'priya': 'Female',
      'mani': 'Male',
      'lakshmi': 'Female',
      'vijay': 'Male',
      'anitha': 'Female',
      'hari': 'Male',
      'balaji': 'Male',
      'raghav': 'Male'
    };

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
        gender: genderOverrides[t.name.toLowerCase()] || (Math.random() > 0.5 ? 'Male' : 'Female'),
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

    // ---------- Class Teachers & Classes (idempotent upsert) ----------
    const map = [
      { classId: '9A', teacherName: 'Nandhini' },
      { classId: '9B', teacherName: 'Rekha' },
      { classId: '9C', teacherName: 'Suresh' },
      { classId: '10A', teacherName: 'Mani' },
      { classId: '10B', teacherName: 'Meena' },
      { classId: '10C', teacherName: 'Anitha' },
    ];

    const normClass = (v = '') => v.toString().toLowerCase().replace(/\s*grade\s*$/i, '').trim();

    for (const entry of map) {
      // find teacher by name (case-insensitive, first token compare as fallback)
      const teachers = await Teacher.find();
      const match = teachers.find((t) => {
        const full = (t.name || '').trim().toLowerCase();
        const first = full.split(/\s+/)[0] || full;
        return first === entry.teacherName.toLowerCase();
      });

      if (!match) {
        console.warn(`⚠️  Seed warning: teacher '${entry.teacherName}' not found; skipping class '${entry.classId}' mapping.`);
        continue;
      }

      // ensure assignedClass on teacher
      if (match.assignedClass !== entry.classId) {
        match.assignedClass = entry.classId;
        await match.save();
      }

      // upsert Class document and attach students
      let cls = await Class.findOne({ classId: entry.classId });
      if (!cls) {
        cls = new Class({ classId: entry.classId, classTeacher: match._id, students: [], subjects: ['English','Tamil','Maths','Science','Social'] });
      } else {
        cls.classTeacher = match._id;
        if (!Array.isArray(cls.students)) cls.students = [];
        if (!Array.isArray(cls.subjects) || !cls.subjects.length) cls.subjects = ['English','Tamil','Maths','Science','Social'];
      }

      // attach students whose Student.class matches the classId (accept '9A' or '9A Grade')
      const allStudents = await Student.find();
      const target = normClass(entry.classId);
      const inClass = allStudents.filter((s) => normClass(s.class) === target);
      cls.students = inClass.map((s) => s._id);
      await cls.save();

      console.log(`✅ Linked class '${entry.classId}' to teacher '${match.name}' with ${inClass.length} students.`);
    }

    console.log('✅ Database seeded successfully with 5 admins, 60 students, 19 teachers, and 6 class mappings.');
    process.exit();

  } catch (err) {
    console.error('❌ Seeding error:', err);
    process.exit(1);
  }
};

seedDB();
