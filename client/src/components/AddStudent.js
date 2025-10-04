import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Row, Col, Form, Button, Container } from "react-bootstrap";
import axios from "axios";
import "./EmployeeForm.css";

const AddStudent = () => {
  const [students, setStudents] = useState([]); // all students
  const [selectedStudentId, setSelectedStudentId] = useState(""); // selected student id
  const [studentData, setStudentData] = useState({
    name: "",
    regNo: "",
    class: "",
    dob: "",
    gender: "",
    fatherName: "",
    motherName: "",
    previousSchool: "",
    identificationMark: "",
    address: "",
    fees: "",
  });

  // Fetch all students on component mount
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/admin/students", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((res) => setStudents(res.data))
      .catch((err) => console.error(err));
  }, []);

  // Handle selecting student from dropdown
  const handleSelect = (e) => {
    const id = e.target.value;
    setSelectedStudentId(id);

    const selected = students.find((s) => s._id === id);
    if (selected) {
      setStudentData({
        name: selected.name,
        regNo: selected.regNo,
        class: selected.class,
        dob: selected.dob ? selected.dob.substr(0, 10) : "",
        gender: selected.gender,
        fatherName: selected.fatherName,
        motherName: selected.motherName,
        previousSchool: selected.previousSchool,
        identificationMark: selected.identificationMark,
        address: selected.address,
        fees: selected.fees,
      });
    }
  };

  const handleChange = (e) => {
    setStudentData({ ...studentData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedStudentId) {
      alert("Student updated successfully!");
      // PUT request to update student can go here
    } else {
      axios
        .post("http://localhost:5000/api/admin/students", studentData, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        })
        .then(() => alert("Student added successfully!"))
        .catch((err) => console.error(err));
    }
  };

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
            <label className="field-label required">Select Student</label>
            <Form.Select
              value={selectedStudentId}
              onChange={handleSelect}
              className="custom-input"
            >
              <option value="">Select Student</option>
              {students.map((s) => (
                <option key={s._id} value={s._id}>
                  {s.name}
                </option>
              ))}
            </Form.Select>
          </Col>

          <Col md={4}>
            <label className="field-label required">Register No</label>
            <Form.Control
              type="text"
              className="custom-input"
              name="regNo"
              value={studentData.regNo}
              onChange={handleChange}
            />
          </Col>

          <Col md={4}>
            <label className="field-label required">Class</label>
            <Form.Control
              type="text"
              className="custom-input"
              name="class"
              value={studentData.class}
              onChange={handleChange}
            />
          </Col>

          <Col md={4}>
            <label className="field-label optional">Picture</label>
            <Form.Control type="file" className="custom-input" />
          </Col>

          <Col md={4}>
            <label className="field-label required">Date of Admission</label>
            <Form.Control
              type="date"
              className="custom-input"
              name="dob"
              value={studentData.dob}
              onChange={handleChange}
            />
          </Col>

          <Col md={4}>
            <label className="field-label required">Fees</label>
            <Form.Control
              type="number"
              className="custom-input"
              name="fees"
              value={studentData.fees}
              onChange={handleChange}
            />
          </Col>
        </Row>

        {/* Other Information */}
        <h5 className="form-section-header">Other Information</h5>
        <hr className="form-hr" />

        <Row className="g-3 mb-4">
          <Col md={4}>
            <label className="field-label optional">Gender</label>
            <Form.Control
              type="text"
              className="custom-input"
              name="gender"
              value={studentData.gender}
              onChange={handleChange}
            />
          </Col>

          <Col md={4}>
            <label className="field-label optional">Previous School</label>
            <Form.Control
              type="text"
              className="custom-input"
              name="previousSchool"
              value={studentData.previousSchool}
              onChange={handleChange}
            />
          </Col>

          <Col md={6}>
            <label className="field-label optional">Identification Mark</label>
            <Form.Control
              type="text"
              className="custom-input"
              name="identificationMark"
              value={studentData.identificationMark}
              onChange={handleChange}
            />
          </Col>

          <Col md={6}>
            <label className="field-label optional">Father Name</label>
            <Form.Control
              type="text"
              className="custom-input"
              name="fatherName"
              value={studentData.fatherName}
              onChange={handleChange}
            />
          </Col>

          <Col md={6}>
            <label className="field-label optional">Mother Name</label>
            <Form.Control
              type="text"
              className="custom-input"
              name="motherName"
              value={studentData.motherName}
              onChange={handleChange}
            />
          </Col>

          <Col xs={12}>
            <label className="field-label optional">Address</label>
            <Form.Control
              as="textarea"
              rows={3}
              className="custom-input-textarea"
              name="address"
              value={studentData.address}
              onChange={handleChange}
            />
          </Col>
        </Row>

        <div className="d-flex justify-content-end gap-3 mt-4">
          <Button
            variant="warning"
            className="rounded-pill px-4 fw-medium text-dark"
            onClick={() =>
              setStudentData({
                name: "",
                regNo: "",
                class: "",
                dob: "",
                gender: "",
                fatherName: "",
                motherName: "",
                previousSchool: "",
                identificationMark: "",
                address: "",
                fees: "",
              })
            }
          >
            Reset
          </Button>
          <Button
            variant="info"
            className="rounded-pill px-4 fw-medium text-white"
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </div>
      </div>
    </Container>
  );
};

export default AddStudent;
