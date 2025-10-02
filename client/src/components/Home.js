import React from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import image1 from "../images/image1.png";
import image2 from "../images/image2.png";
import image3 from "../images/image3.png";

export default function RoleSelectionPage() {
  return (
    <div className="min-vh-100 bg-white d-flex flex-column">
       <Navbar />
      {/* Hero Section */}
      <main className="container flex-grow-1 d-flex flex-column align-items-center py-5">
        <h2 className="fw-bold text-center mb-2">
          Access the Student Management System
        </h2>
        <p className="text-secondary text-center mb-5">
          Login with your designated role
        </p>

        <div className="row justify-content-center w-100">
          {/* Card 1 - Admin */}
          <div className="col-md-4 mb-4">
            <div className="card h-100 text-center shadow-sm border-0 p-4">
              <img src={image1} alt="Admin" className="img-fluid mb-3" />
              <p className="text-secondary">
                Access dashboard to manage students, teachers, and system
                settings.
              </p>
              <Link to="/admin-login" className="btn btn-danger rounded-pill px-4">
                Login
              </Link>
            </div>
          </div>

          {/* Card 2 - Staff */}
          <div className="col-md-4 mb-4">
            <div className="card h-100 text-center shadow-sm border-0 p-4">
              <img src={image2} alt="Teacher" className="img-fluid mb-3" />
              <p className="text-secondary">
                Login to manage classes, upload results, and view student
                performance.
              </p>
              <Link to="/staff-login" className="btn btn-danger rounded-pill px-4">
                Login
              </Link>
            </div>
          </div>

          {/* Card 3 - Student */}
          <div className="col-md-4 mb-4">
            <div className="card h-100 text-center shadow-sm border-0 p-4">
              <img src={image3} alt="Student" className="img-fluid mb-3" />
              <p className="text-secondary">
                Login to check results, view timetable, and update profile.
              </p>
              <Link to="/student-login" className="btn btn-danger rounded-pill px-4">
                Login
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
