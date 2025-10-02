import React, { useState } from "react";
import { NavLink, Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import { Row, Col, Card } from "react-bootstrap";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "bootstrap/dist/css/bootstrap.min.css";
import logoImage from "../images/logo.png";
import teacherAvatar from "../images/teachers-icon.png";
import dashboardIcon from "../images/dashboard.png";
import arrowDown from "../images/arrow-down.png";

function StaffDashboard() {
  const [date, setDate] = useState(new Date());
  const location = useLocation();
  const navigate = useNavigate();

  const isDashboardHome = location.pathname === "/staff-dashboard";

  const staffData = {
    name: "Teacher Name",
    role: "Job Role",
    totalDays: 90,
    presentDays: 81,
    note: "-"
  };

  const goToHomework = () => {
    navigate("/staff-dashboard/homework");
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      {/* Full-width Header */}
      <div className="bg-white shadow-sm p-3 d-flex justify-content-between align-items-center">
        <div className="d-flex align-items-center">
          <img src={logoImage} alt="Logo" style={{ height: "50px", width: "auto" }} className="me-2" />
          <span className="fw-bold fs-4 text-danger">STUDENT MANAGEMENT SYSTEM</span>
        </div>
        <div className="dropdown">
          <button
            className="d-flex align-items-center p-0 bg-transparent border-0"
            type="button"
            id="profileMenu"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <span className="fw-bold fs-5 me-2">Profile</span>
            <img src={arrowDown} alt="Dropdown Arrow" width="18" height="18" />
          </button>
          <ul className="dropdown-menu dropdown-menu-end text-center" aria-labelledby="profileMenu">
            <li>
              <Link className="dropdown-item small-text" to="/profile">View Profile</Link>
            </li>
            <li>
              <Link className="dropdown-item small-text" to="/logout">Logout</Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Body: Sidebar + Main Content */}
      <div className="d-flex flex-grow-1">
        {/* Sidebar */}
        <div className="bg-light border-end p-4" style={{ minWidth: "220px" }}>
          <NavLink
            to=""
            end
            className={({ isActive }) =>
              `d-flex align-items-center text-decoration-none fw-semibold mb-3 sidebar-link ${
                isActive ? "active-link" : "text-dark"
              }`
            }
          >
            <img src={dashboardIcon} alt="Dashboard" width="28" height="28" className="me-2" />
            Dashboard
          </NavLink>
          <NavLink
            to="homework"
            className={({ isActive }) =>
              `d-flex align-items-center text-decoration-none fw-semibold mb-3 sidebar-link ${
                isActive ? "active-link" : "text-dark"
              }`
            }
          >
            Assign Homework
          </NavLink>
          <NavLink
            to="attendance"
            className={({ isActive }) =>
              `d-flex align-items-center text-decoration-none fw-semibold mb-3 sidebar-link ${
                isActive ? "active-link" : "text-dark"
              }`
            }
          >
            Attendance
          </NavLink>
          <NavLink
            to="marks"
            className={({ isActive }) =>
              `d-flex align-items-center text-decoration-none fw-semibold mb-3 sidebar-link ${
                isActive ? "active-link" : "text-dark"
              }`
            }
          >
            Enter Marks
          </NavLink>
        </div>

        {/* Main Content */}
        <div className="flex-grow-1 p-4 overflow-auto">
          {isDashboardHome ? (
            <div className="bg-white p-4 shadow-sm rounded flex-grow-1">
              {/* Teacher Info */}
              <Card className="shadow-sm border-0 mb-4 p-3" style={{ borderTop: "4px solid #e63946" }}>
                <Row className="align-items-center">
                  <Col xs={12} sm={2} className="text-center mb-3 mb-sm-0">
                    <div
                      className="bg-secondary rounded-circle mx-auto"
                      style={{ width: "80px", height: "80px", overflow: "hidden" }}
                    >
                      <img src={teacherAvatar} alt="Teacher" className="w-100 h-100 object-fit-cover" />
                    </div>
                  </Col>
                  <Col xs={12} sm={10} className="text-center text-sm-start">
                    <h4 className="fw-bold mb-0">{staffData.name}</h4>
                    <p className="text-muted mb-0">{staffData.role}</p>
                  </Col>
                </Row>
              </Card>

              {/* Stats + Note + Calendar */}
              <Row className="g-4 mb-5 align-items-stretch">
                <Col md={8} className="d-flex flex-column">
                  <Row className="g-4 mb-4">
                    <Col sm={4}>
                      <Card className="shadow-sm border rounded p-3 text-center h-100">
                        <h6 className="text-muted">Total Days</h6>
                        <h5 className="fw-bold">{staffData.totalDays}</h5>
                      </Card>
                    </Col>
                    <Col sm={4}>
                      <Card className="shadow-sm border rounded p-3 text-center h-100">
                        <h6 className="text-muted">Present Days</h6>
                        <h5 className="fw-bold">{staffData.presentDays}</h5>
                      </Card>
                    </Col>
                    <Col sm={4}>
                      <Card className="shadow-sm border rounded p-3 text-center h-100" style={{ backgroundColor: "#e63946", color: "white" }}>
                        <h6 className="text-white">Attendance %</h6>
                        <h5 className="fw-bold fs-2">{Math.round((staffData.presentDays / staffData.totalDays) * 100)}%</h5>
                      </Card>
                    </Col>
                  </Row>

                  <Card
                    className="shadow-sm border rounded p-4 flex-grow-1"
                    style={{ cursor: "pointer" }}
                    onClick={goToHomework}
                  >
                    <h5 className="fw-bold mb-4" style={{ color: "#e63946" }}>Notes / Homework</h5>
                    <div>{staffData.note}</div>
                  </Card>
                </Col>

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
            </div>
          ) : (
            <div className="flex-grow-1">
              <Outlet />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default StaffDashboard;
