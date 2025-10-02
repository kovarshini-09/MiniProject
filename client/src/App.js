import { Routes, Route } from "react-router-dom";
import RoleSelectionPage from "./components/Home";
import LandingPage from "./components/LandingPage";
import AdminLoginPage from "./components/AdminLogin";
import StaffLoginPage from "./components/StaffLogin";
import StudentLoginPage from "./components/StudentLogin";
import AdminDashboard from "./components/AdminDashboard";
import About from "./components/About";
import Contact from "./components/Contact";
import PrivateRoute from "./components/PrivateRoute";
import Dashboard from "./components/Dashboard";
import AddClass from "./components/AddClass";
import AllClasses from "./components/AllClasses";
import AddStudent from "./components/AddStudent";
import AllTeachers from "./components/AllTeachers";
import AddTeachers from "./components/AddTeachers";
import JobLetter from "./components/JobLetter";
import AllStudents from "./components/AllStudents";
import AdmissionLetter from "./components/AdmissionLeter";
import PrintAdmissionLetter from "./components/PrintAdmissionLetter";
import PrintJobLetter from "./components/PrintJobLetter";

// Staff dashboard
import StaffDashboard from "./components/StaffDashboard";
import AssignHomework from "./components/AssignHomework";
import Attendance from "./components/Attendance";
import EnterMarks from "./components/EnterMarks";

// Student dashboard
import StudentDashboard from "./components/StudentDashboard"; 
import Homework from "./components/Homework"; 


function App() {
  return (
    <Routes>
      {/* Public pages */}
      <Route path="/home" element={<RoleSelectionPage />} />
      <Route path="/" element={<LandingPage />} />
      <Route path="/admin-login" element={<AdminLoginPage />} />
      <Route path="/staff-login" element={<StaffLoginPage />} />
      <Route path="/student-login" element={<StudentLoginPage />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />

      {/* Admin Dashboard with nested routes */}
      <Route path="/dashboard" element={<AdminDashboard />}>
        <Route index element={<Dashboard />} />
        <Route path="students/all" element={<AllStudents />} />
        <Route path="students/add" element={<AddStudent />} />
        <Route path="students/adm" element={<AdmissionLetter />} />
        <Route path="students/adm/print" element={<PrintAdmissionLetter />} />
        <Route path="teachers/all" element={<AllTeachers />} />
        <Route path="teachers/add" element={<AddTeachers />} />
        <Route path="teachers/jobletter" element={<JobLetter />} />
        <Route path="teachers/jobletter/print-job-letter" element={<PrintJobLetter />} />
        <Route path="classes/add" element={<AddClass />} />
        <Route path="classes/all" element={<AllClasses />} />
      </Route>
    
     {/*PrivateRoutes  */}
      <Route element={<PrivateRoute allowedRoles={["admin"]} />}>
      <Route path="/dashboard/*" element={<AdminDashboard />} />
      </Route>
      <Route element={<PrivateRoute allowedRoles={["teacher"]} />}>
      <Route path="/staff-dashboard/*" element={<StaffDashboard />} />
      </Route>
      <Route element={<PrivateRoute allowedRoles={["student"]} />}>
      <Route path="/student-dashboard/*" element={<StudentDashboard />} />
      </Route>

      {/* Staff dashboard layout */}
      <Route path="/staff-dashboard" element={<StaffDashboard />}>
        <Route path="homework" element={<AssignHomework />} />
        <Route path="attendance" element={<Attendance />} />
        <Route path="marks" element={<EnterMarks />} />
      </Route>

      {/* Student Dashboard Route */}
      <Route path="/student-dashboard" element={<StudentDashboard />} />
      <Route path="/student-dashboard/homework" element={<Homework />} />

    </Routes>
  );
}

export default App;
