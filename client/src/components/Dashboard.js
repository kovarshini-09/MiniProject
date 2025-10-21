// import React, { useState, useEffect } from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
// import { Container, Row, Col, Card, ProgressBar } from "react-bootstrap";
// import { FaCalendarAlt } from "react-icons/fa";
// import Calendar from "react-calendar";
// import "react-calendar/dist/Calendar.css";
// import "./Dashboard.css";
// import axios from "axios";
// import icon0 from "../images/students-icon2.png";
// import icon1 from "../images/teachers-icon.png";

// const Dashboard = () => {
//   const [date, setDate] = useState(new Date());
//   const [classes, setClasses] = useState([]);

//   useEffect(() => {
//     const fetchClasses = async () => {
//       try {
//         const res = await axios.get("http://localhost:5000/api/classes");
//         setClasses(res.data);
//       } catch (err) {
//         console.error("Error fetching classes:", err);
//       }
//     };
//     fetchClasses();
//   }, []);

//   // ✅ Calculate student attendance % (100 if any attendance submitted)
//   const studentPercent = classes.some((cls) => cls.attendanceSubmitted) ? 100 : 0;
//   const teacherPercent = 100; // Teachers always 100%

//   return (
//     <Container fluid className="p-4 bg-light min-vh-100">
//       <div className="d-flex justify-content-between align-items-center mb-4">
//         <h5 className="fw-bold">Welcome to Admin Dashboard</h5>
//       </div>

//       <Row className="g-4">
//         <Col lg={8}>
//           <Row className="g-4 mb-3">
//             <Col sm={6}>
//               <Card className="shadow-sm border rounded p-3 text-center">
//                 <img src={icon0} alt="students" style={{ maxWidth: "100px" }} />
//                 <p className="mb-1">Total Students</p>
//                 <h5 className="fw-bold">{classes.length}</h5>
//               </Card>
//             </Col>

//             <Col sm={6}>
//               <Card className="shadow-sm border rounded p-3 text-center">
//                 <img src={icon1} alt="teachers" style={{ maxWidth: "100px" }} />
//                 <p className="mb-1">Today Present Teachers</p>
//                 <h5 className="fw-bold">{teacherPercent}%</h5>
//               </Card>
//             </Col>
//           </Row>

//           <Card className="border rounded shadow-sm p-3 mb-3">
//             <p className="fw-semibold mb-1">Attendance Summary</p>
//             {classes.map((cls) => (
//               <div key={cls._id} className="mb-2">
//                 <p className="mb-1">{cls.classId}</p>
//                 <ProgressBar
//                   now={cls.attendanceSubmitted ? 100 : 0}
//                   label={cls.attendanceSubmitted ? "100%" : "0%"}
//                   variant={cls.attendanceSubmitted ? "success" : "secondary"}
//                   style={{ height: "1rem", borderRadius: "10px" }}
//                 />
//               </div>
//             ))}
//           </Card>
//         </Col>

//         <Col lg={4}>
//           <Card className="border rounded shadow-sm mb-4 dashboard-theme">
//             <Card.Body>
//               <div className="d-flex justify-content-between align-items-center mb-3">
//                 <h6 className="fw-bold mb-0" style={{ color: "#800000" }}>
//                   Calendar
//                 </h6>
//                 <FaCalendarAlt style={{ color: "#800000" }} />
//               </div>
//               <Calendar onChange={setDate} value={date} />
//             </Card.Body>
//           </Card>

//           <Card className="border rounded shadow-sm">
//             <Card.Body>
//               <p className="fw-semibold mb-2">Overall Present Students</p>
//               <ProgressBar
//                 now={studentPercent}
//                 label={`${studentPercent}%`}
//                 variant="success"
//                 style={{ height: "1rem", borderRadius: "10px" }}
//               />
//               <p className="fw-semibold mb-2 mt-3">Overall Present Teachers</p>
//               <ProgressBar
//                 now={teacherPercent}
//                 label={`${teacherPercent}%`}
//                 variant="info"
//                 style={{ height: "1rem", borderRadius: "10px" }}
//               />
//             </Card.Body>
//           </Card>
//         </Col>
//       </Row>
//     </Container>
//   );
// };

// export default Dashboard;
import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col, Card, ProgressBar } from "react-bootstrap";
import { FaCalendarAlt } from "react-icons/fa";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./Dashboard.css";
import axios from "axios";
import icon0 from "../images/students-icon2.png";
import icon1 from "../images/teachers-icon.png";

const Dashboard = () => {
  const [date, setDate] = useState(new Date());
  const [classes, setClasses] = useState([]);
  const [students, setStudents] = useState([]);
  const [todaySummary, setTodaySummary] = useState([]);

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/classes");
        setClasses(res.data);
      } catch (err) {
        console.error("Error fetching classes:", err);
      }
    };
    fetchClasses();
  }, []);

  // Fetch all students for counting per-class totals
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5000/api/admin/students", {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        });
        setStudents(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error("Error fetching students:", err);
        const cached = JSON.parse(localStorage.getItem("ui_students") || "[]");
        setStudents(Array.isArray(cached) ? cached : []);
      }
    };
    fetchStudents();
  }, []);

  // Fetch today's attendance summary (present/absent per class)
  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/attendance/summary/today");
        setTodaySummary(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error("Error fetching today summary:", err);
        setTodaySummary([]);
      }
    };
    fetchSummary();
  }, []);

  const normalizeClass = (value) => (value || "").toString().toLowerCase().replace(/\s+grade\s*$/, "").trim();

  // ✅ Constant student & teacher numbers
  const totalStudents = 60;
  const totalTeachers = 19;

  // Build per-class from API summary; if no record for a class, show 0/0/0
  const summaryMap = (todaySummary || []).reduce((acc, r) => {
    const key = normalizeClass(r.classId || "");
    acc[key] = {
      present: Number(r.present) || 0,
      absent: Number(r.absent) || 0,
      total: Number(r.total) || 0,
    };
    return acc;
  }, {});

  const perClass = classes.map((cls) => {
    const cid = cls.classId || cls.className || "";
    const key = normalizeClass(cid);
    const rec = summaryMap[key] || { present: 0, absent: 0, total: 0 };
    return { id: cid, present: rec.present, absent: rec.absent, total: rec.total };
  });

  const todayPresent = perClass.reduce((sum, c) => sum + c.present, 0);
  const todayTotal = perClass.reduce((sum, c) => sum + c.total, 0);
  const todayAbsent = perClass.reduce((sum, c) => sum + c.absent, 0);

  const studentPercent = todayTotal ? Math.round((todayPresent / todayTotal) * 100) : 0;
  const teacherPercent = 100; // shown as 100% in design

  return (
    <Container fluid className="p-4 bg-light min-vh-100">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h5 className="fw-bold">Welcome to Admin Dashboard</h5>
      </div>

      <Row className="g-4">
        <Col lg={8}>
          <Row className="g-4 mb-3">
            {/* ✅ Students Card */}
            <Col sm={6}>
              <Card className="shadow-sm border rounded p-3 text-center d-flex align-items-center justify-content-center">
                <div>
                  <div className="d-flex justify-content-center mb-2">
                    <img
                      src={icon0}
                      alt="students"
                      style={{ maxWidth: "100px", display: "block" }}
                    />
                  </div>
                  <p className="mb-1">Total Students</p>
                  <h5 className="fw-bold">{totalStudents}</h5>
                </div>
              </Card>
            </Col>

            {/* ✅ Teachers Card */}
            <Col sm={6}>
              <Card className="shadow-sm border rounded p-3 text-center d-flex align-items-center justify-content-center">
                <div>
                  <div className="d-flex justify-content-center mb-2">
                    <img
                      src={icon1}
                      alt="teachers"
                      style={{ maxWidth: "100px", display: "block" }}
                    />
                  </div>
                  <p className="mb-1">Today Present Teachers</p>
                  <h5 className="fw-bold">{totalTeachers}</h5>
                </div>
              </Card>
            </Col>
          </Row>

          {/* Today's Attendance (All Classes) */}
          <Card className="border rounded shadow-sm p-3 mb-3">
            <div className="d-flex justify-content-between align-items-center mb-2">
              <p className="fw-semibold mb-0">Today's Attendance (All Classes)</p>
              <p className="mb-0"><span className="text-muted">Total</span> <span className="fw-bold">{todayTotal}</span></p>
            </div>
            <Row>
              <Col xs={4} className="text-start">
                <div className="text-success">Present</div>
                <div className="fs-5 fw-bold text-success">{todayPresent}</div>
              </Col>
              <Col xs={4} className="text-start">
                <div className="text-danger">Absent</div>
                <div className="fs-5 fw-bold text-danger">{todayAbsent}</div>
              </Col>
              <Col xs={4} className="text-end d-none d-sm-block">
                {/* total already shown on right in header */}
              </Col>
            </Row>
          </Card>

          {/* All Classes - Today's Attendance */}
          <Card className="border rounded shadow-sm p-3">
            <p className="fw-semibold mb-3">All Classes - Today's Attendance</p>
            <Row className="g-3">
              {perClass.map((c) => (
                <Col sm={6} md={4} key={c.id}>
                  <Card className="border-0 shadow-sm p-3">
                    <div className="fw-bold mb-2">{c.id}</div>
                    <div className="small">
                      <div className="d-flex justify-content-between"><span>Present</span><span className="text-success fw-semibold">{c.present}</span></div>
                      <div className="d-flex justify-content-between"><span>Absent</span><span className="text-danger fw-semibold">{c.absent}</span></div>
                      <div className="d-flex justify-content-between"><span>Total</span><span className="fw-semibold">{c.total}</span></div>
                    </div>
                  </Card>
                </Col>
              ))}
            </Row>
          </Card>
        </Col>

        <Col lg={4}>
          <Card className="border rounded shadow-sm mb-4 dashboard-theme">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h6 className="fw-bold mb-0" style={{ color: "#800000" }}>
                  Calendar
                </h6>
                <FaCalendarAlt style={{ color: "#800000" }} />
              </div>
              <Calendar onChange={setDate} value={date} />
            </Card.Body>
          </Card>

          <Card className="border rounded shadow-sm">
            <Card.Body>
              <p className="fw-semibold mb-2">Overall Present Students</p>
              <ProgressBar
                now={studentPercent}
                label={`${studentPercent}%`}
                variant="success"
                style={{ height: "1rem", borderRadius: "10px" }}
              />
              <p className="fw-semibold mb-2 mt-3">Overall Present Teachers</p>
              <ProgressBar
                now={teacherPercent}
                label={`${teacherPercent}%`}
                variant="info"
                style={{ height: "1rem", borderRadius: "10px" }}
              />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
