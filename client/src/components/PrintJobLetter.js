import React from "react";
import { useLocation } from "react-router-dom";
import employeeAvatar from "../images/teachers-icon.png";

export default function PrintJobLetter() {
  const location = useLocation();
  const emp = location.state;

  if (!emp) {
    return (
      <div className="container-fluid p-4 bg-light min-vh-100 d-flex justify-content-center align-items-center">
        <p className="text-muted">No employee data found.</p>
      </div>
    );
  }

  return (
    <div className="container-fluid p-4 bg-light min-vh-100">
      {/* Page Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div className="page-chip">Teachers - Print Job Letter</div>
      </div>

      {/* Card Layout */}
      <div className="d-flex justify-content-center">
        <div
          className="card shadow-sm overflow-hidden"
          style={{ maxWidth: "1100px", width: "100%", borderRadius: "20px" }}
        >
          <div className="row g-0">
            {/* Left Section: Job Letter */}
            <div className="col-md-6 p-5 border-end">
              <h3 className="text-center mb-4 fw-bold text-secondary">Job Letter</h3>

              {/* Employee Info */}
              <div className="row mb-4">
                <div className="col-4 d-flex flex-column align-items-center">
                  <img
                    src={employeeAvatar}
                    alt="Employee Avatar"
                    className="rounded-circle mb-2"
                    style={{ width: "100px", height: "100px" }}
                  />
                  <span className="fw-semibold text-muted">{emp.role}</span>
                </div>
                <div className="col-8">
                  <div className="row mb-2">
                    <div className="col-5 fw-bold">Name:</div>
                    <div className="col-7">{emp.name}</div>
                  </div>
                  <div className="row mb-2">
                    <div className="col-5 fw-bold">Emp. ID:</div>
                    <div className="col-7">{emp.id}</div>
                  </div>
                  <div className="row mb-2">
                    <div className="col-5 fw-bold">Role:</div>
                    <div className="col-7">{emp.role}</div>
                  </div>
                  <div className="row mb-2">
                    <div className="col-5 fw-bold">Date of Joining:</div>
                    <div className="col-7">{emp.doj}</div>
                  </div>
                </div>
              </div>

              {/* Additional Details */}
              <div className="row mb-4">
                <div className="col-6">
                  <div className="fw-semibold">Gender:</div>
                  <div className="text-muted">{emp.gender || "N/A"}</div>
                </div>
                <div className="col-6">
                  <div className="fw-semibold">Experience:</div>
                  <div className="text-muted">{emp.experience || "N/A"}</div>
                </div>
                <div className="col-6">
                  <div className="fw-semibold">Address:</div>
                  <div className="text-muted">{emp.address || "N/A"}</div>
                </div>
                <div className="col-6">
                  <div className="fw-semibold">Email:</div>
                  <div className="text-muted">{emp.email || "N/A"}</div>
                </div>
                <div className="col-6 mt-2">
                  <div className="fw-semibold">Contact:</div>
                  <div className="text-muted">{emp.contact || "N/A"}</div>
                </div>
              </div>

              {/* Rules & Regulations */}
              <div className="mb-4">
                <h5 className="fw-bold border-bottom pb-2 mb-3">Rules and Regulations</h5>
                <p className="text-muted small mb-3">
                  The school fosters an inclusive community, using a strong spiritual base.
                  Employees should reflect school values in their actions, demonstrate respect
                  for the school environment, and work collaboratively to support student learning.
                </p>
                <ul className="small text-muted ps-3">
                  <li>Respect fellow staff members and follow school rules.</li>
                  <li>Maintain a professional environment and uphold ethics.</li>
                  <li>Keep the workplace clean and organized.</li>
                  <li>Use appropriate language and attire.</li>
                  <li>Participate actively in school activities and programs.</li>
                </ul>
              </div>

              {/* Signatures */}
              <div className="d-flex justify-content-between text-muted small">
                <div className="border-top pt-2">Signature of Authority</div>
                <div className="border-top pt-2">Institute Stamp</div>
              </div>
            </div>

            {/* Right Section: Print UI */}
            <div className="col-md-6 p-5 bg-light d-flex flex-column justify-content-between">
              <div>
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h5 className="fw-bold text-secondary">Print</h5>
                  <span className="text-muted small">1 sheet of paper</span>
                </div>

                <div className="mb-3">
                  {["Destination", "Pages", "Layout", "Color"].map((label, idx) => (
                    <div key={idx} className="d-flex justify-content-between py-2 border-bottom">
                      <span>{label}</span>
                      <input
                        type="text"
                        className="form-control form-control-sm w-50"
                        placeholder={label === "Pages" ? "All" : label}
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="d-flex justify-content-end gap-3">
                <button
                  onClick={() => window.print()}
                  className="btn btn-danger rounded-pill px-4"
                >
                  Print
                </button>
                <button
                  onClick={() => window.history.back()}
                  className="btn btn-outline-secondary rounded-pill px-4"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
