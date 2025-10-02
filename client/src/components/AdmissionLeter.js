import React from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./AllStudents.css";
import studentAvatar from "../images/students-icon2.png";

function AdmissionLetter() {
  const navigate = useNavigate();

  const handlePrint = () => {
    navigate("/dashboard/students/adm/print");
  };

  return (
    <div className="container-fluid p-4 bg-light min-vh-100">
      {/* Page Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div className="page-chip">Students - Admission Letter</div>
      </div>

      {/* Card Section */}
      <div className="d-flex justify-content-center">
        <div
          className="card shadow-sm text-center p-5"
          style={{
            maxWidth: "500px",
            width: "100%",
            borderRadius: "20px",
          }}
        >
          <h5 className="fw-semibold mb-4">Admission Confirmation</h5>

          {/* Avatar */}
          <img
            src={studentAvatar}
            alt="Student Avatar"
            className="mx-auto mb-3"
            style={{ width: "100px", height: "100px" }}
          />
          <p className="fw-semibold fs-6 mb-4">Name</p>

          {/* Details */}
          <div className="px-4">
            <div className="d-flex justify-content-between py-2 border-bottom">
              <span>Registration Id</span>
              <span className="fw-semibold">110</span>
            </div>
            <div className="d-flex justify-content-between py-2 border-bottom">
              <span>Class</span>
              <span className="fw-semibold">3rd grade</span>
            </div>
            <div className="d-flex justify-content-between py-2 border-bottom">
              <span>Admission Date</span>
              <span className="fw-semibold">8.09.2025</span>
            </div>
            <div className="d-flex justify-content-between py-2">
              <span>Account Status</span>
              <span className="fw-semibold text-success">Active</span>
            </div>
          </div>

          {/* Button */}
          <button
            className="btn btn-danger rounded-pill px-5 py-2 mt-4"
            style={{ fontSize: "0.9rem" }}
            onClick={handlePrint}
          >
            Print Admission Letter
          </button>
        </div>
      </div>
    </div>
  );
}

export default AdmissionLetter;
