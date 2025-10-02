import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom"; // ✅ import navigate hook
import "./JobLetter.css";
import jobletter from "../images/jobletter.png";

const employees = [
  {
    id: "192080",
    role: "Teacher",
    name: "John Doe",
    status: "Active",
    doj: "06 September, 2025",
  },
  {
    id: "192081",
    role: "Teacher",
    name: "Jane Smith",
    status: "Active",
    doj: "06 September, 2025",
  },
];

function JobLetter() {
  const navigate = useNavigate(); // ✅ create navigate instance

  const handlePrintClick = (emp) => {
    // Navigate to PrintJobLetter and send emp data (optional)
    navigate("/dashboard/teachers/jobletter/print-job-letter", { state: emp });
  };

  return (
    <Container fluid className="p-4 bg-light min-vh-100">
      {/* Header with chip */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div className="page-chip">Employees - Job Letter</div>
        <div className="d-flex align-items-center">
          <input
            type="text"
            className="form-control search-input"
            placeholder="Search"
          />
          <button className="btn btn-danger all-btn ms-2">All</button>
        </div>
      </div>

      {/* Employee Cards Container */}
      <div className="job-letter-container p-4">
        {employees.map((emp, index) => (
          <div className="card mb-3 emp-card shadow-sm border-0" key={index}>
            <div className="card-body d-flex align-items-center">
              {/* Avatar */}
              <div className="avatar-circle me-3">
                <img src={jobletter} alt="avatar" className="avatar-img" />
              </div>

              {/* Employee Info */}
              <div className="flex-grow-1">
                <p className="mb-1">
                  <strong>Registration/ID:</strong> {emp.id}
                </p>
                <p className="mb-1">
                  <strong>Employee Role:</strong> {emp.role}
                </p>
                <p className="mb-1">
                  <strong>Date of Joining:</strong> {emp.doj}
                </p>
                <p className="mb-0">
                  <strong>Account Status:</strong>{" "}
                  <span className="status-active">{emp.status}</span>
                </p>
              </div>

              {/* Button */}
              <div>
                <button
                  className="btn btn-danger print-btn"
                  onClick={() => handlePrintClick(emp)} // ✅ navigate on click
                >
                  Print Job Letter
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Container>
  );
}

export default JobLetter;
