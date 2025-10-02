import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Row, Col, Form, Button, Container } from "react-bootstrap";
import "./EmployeeForm.css"; // Reuse the consistent CSS file

const AddStudent = () => {
  return (
    <Container fluid className="p-4 bg-light min-vh-100">
      {/* Page Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div className="page-chip">Students - Add Student</div>
      </div>

      {/* Form Section */}
      <div className="employee-form-container p-4">
        {/* Basic Information */}
        <h5 className="form-section-header">Basic Information</h5>
        <hr className="form-hr" />

        <Row className="g-3 mb-4">
          <Col md={4}>
            <label className="field-label required">Student Name</label>
            <Form.Control type="text" className="custom-input" />
          </Col>
          <Col md={4}>
            <label className="field-label required">Register No</label>
            <Form.Control type="text" className="custom-input" />
          </Col>
          <Col md={4}>
            <label className="field-label required">Class</label>
            <Form.Select className="custom-input">
              <option>Select Class</option>
              <option>1st Grade</option>
              <option>2nd Grade</option>
            </Form.Select>
          </Col>
          <Col md={4}>
            <label className="field-label optional">Picture</label>
            <Form.Control type="file" className="custom-input" />
          </Col>
          <Col md={4}>
            <label className="field-label required">Date of Admission</label>
            <Form.Control type="date" className="custom-input" />
          </Col>
          <Col md={4}>
            <label className="field-label required">Fees</label>
            <Form.Control type="number" className="custom-input" />
          </Col>
        </Row>

        {/* Other Information */}
        <h5 className="form-section-header">Other Information</h5>
        <hr className="form-hr" />
        <Row className="g-3 mb-4">
          <Col md={4}>
            <label className="field-label optional">Date of Birth</label>
            <Form.Control type="date" className="custom-input" />
          </Col>
          <Col md={4}>
            <label className="field-label optional">Gender</label>
            <Form.Select className="custom-input">
              <option>Select Gender</option>
              <option>Male</option>
              <option>Female</option>
            </Form.Select>
          </Col>
          <Col md={4}>
            <label className="field-label optional">Previous School</label>
            <Form.Control type="text" className="custom-input" />
          </Col>
          <Col md={6}>
            <label className="field-label optional">Identification Mark</label>
            <Form.Control type="text" className="custom-input" />
          </Col>
          <Col md={6}>
            <label className="field-label optional">Father Name</label>
            <Form.Control type="text" className="custom-input" />
          </Col>
          <Col md={6}>
            <label className="field-label optional">Mother Name</label>
            <Form.Control type="text" className="custom-input" />
          </Col>
          <Col xs={12}>
            <label className="field-label optional">Address</label>
            <Form.Control as="textarea" rows={3} className="custom-input-textarea" />
          </Col>
        </Row>

        {/* Buttons */}
        <div className="d-flex justify-content-end gap-3 mt-4">
          <Button variant="warning" className="rounded-pill px-4 fw-medium text-dark">
            Reset
          </Button>
          <Button variant="info" className="rounded-pill px-4 fw-medium text-white">
            Submit
          </Button>
        </div>
      </div>
    </Container>
  );
};

export default AddStudent;