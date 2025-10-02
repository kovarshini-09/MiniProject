import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import "./EmployeeForm.css"; // The same CSS file for form styling

function AddTeachers() {
  return (
    <Container fluid className="p-4 bg-light min-vh-100">
      {/* Page Header with chip and title */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div className="page-chip">Employees - Add Employee</div>
      </div>

      <div className="employee-form-container p-4">
        {/* Basic Information */}
        <h5 className="form-section-header">Basic Information</h5>
        <hr className="form-hr" />

        <div className="row mb-3">
          <div className="col-md-4">
            <label className="field-label required">Employee Name</label>
            <input type="text" className="form-control custom-input" />
          </div>
          <div className="col-md-4">
            <label className="field-label required">Mobile No</label>
            <input type="text" className="form-control custom-input" />
          </div>
          <div className="col-md-4">
            <label className="field-label required">Employee Role</label>
            <input type="text" className="form-control custom-input" />
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-md-4">
            <label className="field-label optional">Picture</label>
            <input type="file" className="form-control custom-input" />
          </div>
          <div className="col-md-4">
            <label className="field-label required">Date of Joining</label>
            <input type="date" className="form-control custom-input" />
          </div>
          <div className="col-md-4">
            <label className="field-label required">Monthly Salary</label>
            <input type="number" className="form-control custom-input" />
          </div>
        </div>

        {/* Other Information */}
        <h5 className="form-section-header">Other Information</h5>
        <hr className="form-hr" />

        <div className="row mb-3">
          <div className="col-md-4">
            <label className="field-label">Father Name</label>
            <input type="text" className="form-control custom-input" />
          </div>
          <div className="col-md-4">
            <label className="field-label">Gender</label>
            <select className="form-control custom-input">
              <option>Male</option>
              <option>Female</option>
            </select>
          </div>
          <div className="col-md-4">
            <label className="field-label">Experience</label>
            <input type="text" className="form-control custom-input" />
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-md-4">
            <label className="field-label">Education</label>
            <input type="text" className="form-control custom-input" />
          </div>
          <div className="col-md-4">
            <label className="field-label">Email ID</label>
            <input type="email" className="form-control custom-input" />
          </div>
          <div className="col-md-4">
            <label className="field-label">Blood Group</label>
            <input type="text" className="form-control custom-input" />
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-md-12">
            <label className="field-label">Address</label>
            <input type="text" className="form-control custom-input" />
          </div>
        </div>

        <div className="d-flex justify-content-end mt-4">
          <button className="btn btn-warning me-3 px-4">Reset</button>
          <button className="btn btn-info px-4">Submit</button>
        </div>
      </div>
    </Container>
  );
}

export default AddTeachers;