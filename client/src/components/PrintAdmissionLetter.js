import React from "react";
import studentAvatar from "../images/students-icon2.png";

export default function PrintAdmissionLetter() {
  return (
    <div className="container-fluid p-4 bg-light min-vh-100 font-sans">
      {/* Page Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div className="page-chip">Students - Print Admission Letter</div>
      </div>

      {/* Card Layout */}
      <div className="d-flex justify-content-center">
        <div
          className="card shadow-sm overflow-hidden"
          style={{
            maxWidth: "1100px",
            width: "100%",
            borderRadius: "20px",
          }}
        >
          <div className="row g-0">
            {/* Left Section: Admission Letter */}
            <div className="col-md-6 p-5 border-end">
              <h3 className="text-center mb-4 fw-bold text-secondary">
                Admission Letter
              </h3>

              {/* Student Info */}
              <div className="row mb-4">
                <div className="col-4 d-flex flex-column align-items-center">
                  <img
                    src={studentAvatar}
                    alt="Student Avatar"
                    className="rounded-circle mb-2"
                    style={{ width: "100px", height: "100px" }}
                  />
                  <span className="fw-semibold text-muted">Manager</span>
                </div>
                <div className="col-8">
                  <div className="row mb-2">
                    <div className="col-5 fw-bold">Name:</div>
                    <div className="col-7">John Doe</div>
                  </div>
                  <div className="row mb-2">
                    <div className="col-5 fw-bold">Reg. ID:</div>
                    <div className="col-7">110</div>
                  </div>
                  <div className="row mb-2">
                    <div className="col-5 fw-bold">Class:</div>
                    <div className="col-7">3rd Grade</div>
                  </div>
                  <div className="row mb-2">
                    <div className="col-5 fw-bold">Admission Date:</div>
                    <div className="col-7">8.09.2025</div>
                  </div>
                </div>
              </div>

              {/* Application Details */}
              <div className="row mb-4">
                <div className="col-6">
                  <div className="fw-semibold">Gender:</div>
                  <div className="text-muted">Male</div>
                </div>
                <div className="col-6">
                  <div className="fw-semibold">Experience:</div>
                  <div className="text-muted">N/A</div>
                </div>
                <div className="col-6">
                  <div className="fw-semibold">Address:</div>
                  <div className="text-muted">123 Main St, Anytown</div>
                </div>
                <div className="col-6">
                  <div className="fw-semibold">Email:</div>
                  <div className="text-muted">johndoe@email.com</div>
                </div>
                <div className="col-6 mt-2">
                  <div className="fw-semibold">Contact:</div>
                  <div className="text-muted">555-1234</div>
                </div>
              </div>

              {/* Rules & Regulations */}
              <div className="mb-4">
                <h5 className="fw-bold border-bottom pb-2 mb-3">
                  Rules and Regulations
                </h5>
                <p className="text-muted small mb-3">
                  The school fosters an inclusive community in partnership
                  with the community, using a strong spiritual base. They
                  reflect the school values in their actions, are passionate
                  about learning, and demonstrate respect for the school
                  environment and others. Parents work together to create a
                  learning environment where students can flourish.
                </p>
                <ul className="small text-muted ps-3">
                  <li>Respect the teachers and staff and follow the rules.</li>
                  <li>
                    Respect all fellow students regardless of ethnicity,
                    religion, or gender.
                  </li>
                  <li>Keep the school environment clean.</li>
                  <li>Use appropriate language and dress.</li>
                  <li>Listen attentively and participate in class.</li>
                  <li>
                    Respect the property of others and support school
                    activities.
                  </li>
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
                  <div className="d-flex justify-content-between py-2 border-bottom">
                    <span>Destination</span>
                    <input
                      type="text"
                      className="form-control form-control-sm w-50"
                      placeholder="Printer"
                    />
                  </div>
                  <div className="d-flex justify-content-between py-2 border-bottom">
                    <span>Pages</span>
                    <input
                      type="text"
                      className="form-control form-control-sm w-50"
                      placeholder="All"
                    />
                  </div>
                  <div className="d-flex justify-content-between py-2 border-bottom">
                    <span>Layout</span>
                    <input
                      type="text"
                      className="form-control form-control-sm w-50"
                      placeholder="Portrait"
                    />
                  </div>
                  <div className="d-flex justify-content-between py-2 border-bottom">
                    <span>Color</span>
                    <input
                      type="text"
                      className="form-control form-control-sm w-50"
                      placeholder="Color"
                    />
                  </div>
                </div>
              </div>

              <div className="d-flex justify-content-end gap-3">
                <button
                  onClick={() => window.print()}
                  className="btn btn-danger rounded-pill px-4"
                >
                  Print
                </button>
                <button className="btn btn-outline-secondary rounded-pill px-4">
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
