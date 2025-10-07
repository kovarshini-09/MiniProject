import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Container, Row, Col, Card } from "react-bootstrap";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

import studentAvatar from "../images/students-icon2.png";
import arrowDown from "../images/arrow-down.png";
import logoImage from "../images/logo.png";

function StudentDashboard() {
  const navigate = useNavigate();
  const [date, setDate] = useState(new Date());
  const [studentData, setStudentData] = useState({
    name: "",
    class: "",
    totalDays: 90,
    presentDays: 81,
    attendancePercentage: "93%",
    homeworkSubjects: ["English", "Tamil", "Maths", "Science", "Social"],
    examResults: []
  });

  // Fetch student details when component mounts
  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/student-login"); // redirect if no token
          return;
        }

        const res = await axios.get("http://localhost:5000/api/students/me", {
          headers: { Authorization: `Bearer ${token}` }
        });

        setStudentData(prev => ({
          ...prev,
          name: res.data.name,
          class: res.data.class
        }));
      } catch (err) {
        console.error("Failed to fetch student details:", err);
        alert("Failed to fetch student details. Please login again.");
        navigate("/student-login");
      }
    };

    fetchStudentData();
  }, [navigate]);

  const goToHomework = () => {
    navigate("/student-dashboard/homework");
  };

  return (
    <Container fluid className="min-vh-100 bg-light p-4">
      {/* Header */}
      <Row className="mb-4 bg-white p-3 shadow-sm rounded align-items-center">
        <Col xs={6}>
          <Link to="/" className="navbar-brand d-flex align-items-center">
            <img src={logoImage} alt="Logo" style={{ height: "50px", width: "auto" }} className="me-2" />
            <span className="fw-bold fs-4 text-danger">
              STUDENT MANAGEMENT SYSTEM
            </span>
          </Link>
        </Col>
        <Col xs={6} className="text-end">
          <div className="dropdown">
            <button
              className="d-flex align-items-center p-0 bg-transparent border-0 float-end"
              type="button"
              id="profileMenu"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <span className="fw-bold fs-5 me-2">Profile</span>
              <img src={arrowDown} alt="Dropdown Arrow" width="18" height="18" />
            </button>
            <ul className="dropdown-menu dropdown-menu-end text-center" aria-labelledby="profileMenu">
              <li><a className="dropdown-item small-text" href="/student-profile">View Profile</a></li>
              <li><a className="dropdown-item small-text" href="/logout">Logout</a></li>
            </ul>
          </div>
        </Col>
      </Row>

      {/* Main Dashboard Content */}
      <div className="bg-white p-4 p-md-5 shadow-sm rounded">
        {/* Row 1: Student Info */}
        <Card className="shadow-sm border-0 mb-4 p-3" style={{ borderTop: "4px solid #e63946" }}>
          <Row className="align-items-center">
            <Col xs={12} sm={2} className="text-center mb-3 mb-sm-0">
              <div className="bg-secondary rounded-circle mx-auto" style={{ width: "80px", height: "80px", overflow: "hidden" }}>
                <img src={studentAvatar} alt="Student" className="w-100 h-100 object-fit-cover" />
              </div>
            </Col>
            <Col xs={12} sm={10} className="text-center text-sm-start">
              <h4 className="fw-bold mb-0">{studentData.name || "Student Name"}</h4>
              <p className="text-muted mb-0">{studentData.class || "Class Name"}</p>
            </Col>
          </Row>
        </Card>

        {/* Row 2: Stats and Calendar */}
        <Row className="g-4 mb-5 align-items-stretch">
          {/* Left Column: Attendance & Homework */}
          <Col md={8} className="d-flex flex-column">
            <Row className="g-4 mb-4">
              <Col sm={4}>
                <Card className="shadow-sm border rounded p-3 text-center h-100">
                  <h6 className="text-muted">Total Days</h6>
                  <h5 className="fw-bold">{studentData.totalDays}</h5>
                </Card>
              </Col>
              <Col sm={4}>
                <Card className="shadow-sm border rounded p-3 text-center h-100">
                  <h6 className="text-muted">Present Days</h6>
                  <h5 className="fw-bold">{studentData.presentDays}</h5>
                </Card>
              </Col>
              <Col sm={4}>
                <Card className="shadow-sm border rounded p-3 text-center h-100" style={{ backgroundColor: '#e63946', color: 'white' }}>
                  <h6 className="text-white">Attendance Percentage</h6>
                  <h5 className="fw-bold fs-2">{studentData.attendancePercentage}</h5>
                </Card>
              </Col>
            </Row>

            {/* Homework Section */}
            <Card className="shadow-sm border rounded p-4 flex-grow-1" style={{ cursor: "pointer" }} onClick={goToHomework}>
              <h5 className="fw-bold mb-4" style={{ color: "#e63946" }}>Home Work..!</h5>
              <Row className="g-3">
                {studentData.homeworkSubjects.map((subject, index) => (
                  <Col key={index} xs={6} md={4}>
                    <button className="btn btn-outline-danger w-100 py-3 fw-bold" style={{ borderRadius: '0.25rem' }}>
                      {subject}
                    </button>
                  </Col>
                ))}
              </Row>
            </Card>
          </Col>

          {/* Right Column: Calendar */}
          <Col md={4} className="d-flex flex-column">
            <Card className="shadow-sm border rounded p-3 flex-grow-1 d-flex flex-column">
              <h5 className="fw-bold mb-3 text-center">
                {date.toLocaleString("default", { month: "long" })} {date.getFullYear()}
              </h5>
              <div className="d-flex justify-content-center flex-grow-1 align-items-center">
                <Calendar onChange={setDate} value={date} className="w-100 border-0" />
              </div>
            </Card>
          </Col>
        </Row>

        {/* Row 3: Exam Result */}
        <Row>
          <Col md={12}>
            <Card className="shadow-sm border rounded p-4">
              <h5 className="fw-bold mb-3" style={{ color: "#e63946" }}>Exam Result</h5>
              {studentData.examResults.length === 0 ? (
                <div className="border p-3 text-muted">There is no recent exams..</div>
              ) : (
                <div>{/* Exam results table placeholder */}</div>
              )}
            </Card>
          </Col>
        </Row>
      </div>
    </Container>
  );
}

export default StudentDashboard;
