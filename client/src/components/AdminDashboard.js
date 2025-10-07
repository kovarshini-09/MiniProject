import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";   
import "bootstrap/dist/css/bootstrap.min.css";
import "./SideBar.css"

import dashboardIcon from "../images/dashboard.png";
import studentIcon from "../images/students-icon.png";
import teacherIcon from "../images/teachers.png";
import classIcon from "../images/classes.png";
import arrowDown from "../images/arrow-down.png";
import logoImage from "../images/logo.png"; 


function AdminDashboard() {
  const [openMenu, setOpenMenu] = useState(null);

  const toggleMenu = (menu) => {
    setOpenMenu(openMenu === menu ? null : menu);
  };

  return (
    <div className="d-flex min-vh-100">
      {/* Sidebar */}
<div className=".sidebar bg-light border-end p-4">

        {/* Logo and Heading */}
        <Link to="/" className="navbar-brand d-flex align-items-center">
          <img
            src={logoImage}
            alt="Logo"
            style={{ height: "50px", width: "auto" }}
            className="me-2"
          />
          {/* Heading with partial red color like Landing page */}
          <span className="fw-bold fs-4 text-danger">
            STUDENT MANAGEMENT SYSTEM
          </span>
        </Link>


        {/* Dashboard */}
        <div className="mb-4">
          <Link to="/dashboard" className="d-flex align-items-center text-dark text-decoration-none fw-semibold sidebar-link small-text">
            <img src={dashboardIcon} alt="Dashboard" width="36" height="36" className="me-2" />
            Dashboard
          </Link>
        </div>

        {/* Students */}
        <div className="mb-4" onMouseEnter={() => toggleMenu("students")} onMouseLeave={() => toggleMenu(null)}>
          <div className="d-flex align-items-center text-dark fw-semibold sidebar-link small-text">
            <img src={studentIcon} alt="Students" width="36" height="36" className="me-2" />
            Students
          </div>
          {openMenu === "students" && (
            <div className="ms-4 mt-3">
              <Link to="/dashboard/students/all" className="d-block text-dark text-decoration-none sidebar-sublink small-text mb-2">
                All Students
              </Link>
              <Link to="/dashboard/students/add" className="d-block text-dark text-decoration-none sidebar-sublink small-text">
                Add Student
              </Link>
              <Link to="/dashboard/students/adm" className="d-block text-dark text-decoration-none sidebar-sublink small-text">
                Admission Letter
              </Link>
            </div>
          )}
        </div>

        {/* Teachers */}
        <div className="mb-4" onMouseEnter={() => toggleMenu("teachers")} onMouseLeave={() => toggleMenu(null)}>
          <div className="d-flex align-items-center text-dark fw-semibold sidebar-link small-text">
            <img src={teacherIcon} alt="Teachers" width="36" height="36" className="me-2" />
            Teachersc
          </div>
          {openMenu === "teachers" && (
            <div className="ms-4 mt-3">
              <Link to="/dashboard/teachers/all" className="d-block text-dark text-decoration-none sidebar-sublink small-text mb-2">
                All Teachers
              </Link>
              <Link to="/dashboard/teachers/add" className="d-block text-dark text-decoration-none sidebar-sublink small-text mb-2">
                Add Teacher
              </Link>
              <Link to="/dashboard/teachers/jobletter" className="d-block text-dark text-decoration-none sidebar-sublink small-text">
                Job Letter
              </Link>
            </div>
          )}
        </div>

        {/* Classes */}
        <div className="mb-4" onMouseEnter={() => toggleMenu("classes")} onMouseLeave={() => toggleMenu(null)}>
          <div className="d-flex align-items-center text-dark fw-semibold sidebar-link small-text">
            <img src={classIcon} alt="Classes" width="36" height="36" className="me-2" />
            Classes
          </div>
          {openMenu === "classes" && (
            <div className="ms-4 mt-3">
              <Link to="/dashboard/classes/add" className="d-block text-dark text-decoration-none sidebar-sublink small-text mb-2">
                Add Classes
              </Link>
              <Link to="/dashboard/classes/all" className="d-block text-dark text-decoration-none sidebar-sublink small-text">
                All Classes
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-grow-1 p-4 d-flex flex-column">
        {/* Header */}
        <div className="d-flex justify-content-end align-items-center mb-4">
          <div className="dropdown">
            <button className="d-flex align-items-center p-0 bg-transparent border-0" type="button" id="profileMenu" data-bs-toggle="dropdown" aria-expanded="false">
              <span className="fw-bold fs-5 me-2">Profile</span>
              <img src={arrowDown} alt="Dropdown Arrow" width="18" height="18" />
            </button>
            <ul className="dropdown-menu dropdown-menu-end text-center" aria-labelledby="profileMenu">
              <li><Link className="dropdown-item small-text" to="/profile">View Profile</Link></li>
              <li><Link className="dropdown-item small-text" to="/logout">Logout</Link></li>
            </ul>
          </div>
        </div>

        {/* ✅ Outlet will render nested pages here */}
        <div className="flex-grow-1">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
