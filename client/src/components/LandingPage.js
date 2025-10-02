import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import image1 from "../images/Students.png"
import Navbar from "./Navbar";

export default function LandingPage() {
  return (
    <div className="min-vh-100 bg-white d-flex flex-column">

       <Navbar />

      {/* Hero Section */}
      <main className="container flex-grow-1 d-flex align-items-center py-5">
        <div className="row w-100 align-items-center">
          {/* Left Content */}
          <div className="col-md-6">
            <h1 className="fw-bold display-5">
              <span className="text-dark">Students </span>
              <span className="text-danger">Management</span>
            </h1>
            <p className="mt-3 text-secondary fs-5">
              A smarter way to connect teachers, parents, and students
            </p>
            <Link to="/home" className="btn btn-danger btn-lg rounded-pill mt-4 px-4">
              Get Started
            </Link>
          </div>

          {/* Right Illustration */}
          <div className="col-md-6 text-center">
            <img
              src={image1}
              alt="Students Management Illustration"
              className="img-fluid"
            />
          </div>
        </div>
      </main>
    </div>
  );
}
