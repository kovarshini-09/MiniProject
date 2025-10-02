import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./Navbar";

export default function AboutPage() {
  return (
    <div className="min-vh-100 bg-light d-flex flex-column">
      <Navbar />

      {/* About Section */}
      <main className="container flex-grow-1 d-flex flex-column justify-content-center py-5">
        <div className="row w-100 justify-content-center">
          <div className="col-lg-8 text-center">
            <h1 className="fw-bold display-5 text-dark mb-4">
              About Our <span className="text-danger">Student Management System</span>
            </h1>
            <p className="fs-5 text-secondary mb-4">
              Welcome to our Student Management System! We've designed this application with a singular goal in mind: to simplify and streamline the complex world of student administration for educational institutions.
            </p>

            <h4 className="fw-semibold mt-4">Our Mission</h4>
            <p className="text-secondary mb-4">
              Our mission is to empower educators, administrators, and students with an intuitive, efficient, and comprehensive platform that fosters a more organized and productive learning environment. By automating routine tasks and centralizing crucial information, we free up valuable time for what truly matters: teaching and learning.
            </p>

            <h4 className="fw-semibold mt-4">What We Offer</h4>
            <ul className="text-secondary text-start list-group list-group-flush mb-4">
              <li className="list-group-item"><strong>Student Information Management:</strong> Securely store and access detailed student profiles, academic records, contact information, and more.</li>
              <li className="list-group-item"><strong>Course & Enrollment Management:</strong> Easily create, manage, and assign courses, handle student enrollments, and track attendance.</li>
              <li className="list-group-item"><strong>Gradebook & Academic Tracking:</strong> Maintain a comprehensive gradebook, record academic achievements, and generate progress reports.</li>
              <li className="list-group-item"><strong>Communication Tools:</strong> Facilitate seamless communication between students, teachers, and administrators.</li>
              <li className="list-group-item"><strong>Reporting & Analytics:</strong> Generate insightful reports on student performance, attendance trends, and other key metrics.</li>
              <li className="list-group-item"><strong>User-Friendly Interface:</strong> An intuitive and modern design ensures ease of use for all stakeholders.</li>
            </ul>

            <h4 className="fw-semibold mt-4">Our Vision</h4>
            <p className="text-secondary mb-4">
              We envision a future where educational administration is effortless, allowing institutions to focus entirely on delivering high-quality education. We are committed to continuous improvement, regularly updating our system with new features based on user feedback and evolving educational needs.
            </p>

            <p className="fs-5 mt-4">
              Explore our platform and see how it can transform your administrative processes. Our dedicated support team is always ready to assist you.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
