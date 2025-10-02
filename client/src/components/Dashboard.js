import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col, Card, ProgressBar } from "react-bootstrap";
import { FaCalendarAlt } from "react-icons/fa";
import Calendar from "react-calendar"; 
import "react-calendar/dist/Calendar.css"; 
import "./Dashboard.css";
import icon0 from "../images/students-icon2.png";
import icon1 from "../images/teachers-icon.png";

const Dashboard = () => {
  const [date, setDate] = useState(new Date()); 

  return (
    <Container fluid className="p-4 bg-light min-vh-100">
      {/* Top Bar */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h5 className="fw-bold">Welcome to Admin Dashboard</h5>
      </div>

      <Row className="g-4">
        {/* Left Section */}
        <Col lg={8}>
          <Row className="g-4 mb-3">
            <Col sm={6}>
              <Card className="shadow-sm border rounded p-3 text-center">
                <div className="d-flex justify-content-center">
                  <img
                    src={icon0}
                    alt="illustration"
                    className="img-fluid"
                    style={{ maxWidth: "100px" }}
                  />
                </div>
                <p className="mb-1">Total Students</p>
                <h5 className="fw-bold">0</h5>
              </Card>
            </Col>

            <Col sm={6}>
              <Card className="shadow-sm border rounded p-3 text-center">
                <div className="d-flex justify-content-center">
                  <img
                    src={icon1}
                    alt="illustration"
                    className="img-fluid"
                    style={{ maxWidth: "100px" }}
                  />
                </div>
                <p className="mb-1">Total Teachers</p>
                <h5 className="fw-bold">0</h5>
              </Card>
            </Col>
          </Row>

          {/* Rectangle Cards stacked */}
          <div className="d-flex flex-column gap-3">
            <Card className="border rounded shadow-sm p-3">
              <p className="fw-semibold mb-1">Today Absent Students</p>
              <p className="text-secondary mb-0">Attendance not marked yet !</p>
            </Card>

            <Card className="border rounded shadow-sm p-3">
              <p className="fw-semibold mb-1">Today Present Teachers</p>
              <p className="text-secondary mb-0">Attendance not marked yet !</p>
            </Card>

            <Card className="border rounded shadow-sm p-3">
              <p className="fw-semibold mb-1">New Admission</p>
              <p className="text-secondary mb-0">No new Admission</p>
            </Card>
          </div>
        </Col>

        {/* Right Section */}
        <Col lg={4}>
          {/* Calendar */}
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

          {/* Attendance Progress */}
          <Card className="border rounded shadow-sm">
            <Card.Body>
              <p className="fw-semibold mb-2">Today Present Students</p>
              <ProgressBar now={0} label="0%" className="mb-3" />
              <p className="fw-semibold mb-2">Today Present Teachers</p>
              <ProgressBar now={0} label="0%" />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
