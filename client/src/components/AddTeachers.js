import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Row, Col, Form, Button, Container } from "react-bootstrap";
import axios from "axios";
import "./EmployeeForm.css";

const AddTeacher = () => {
  const [teachers, setTeachers] = useState([]); // all teachers
  const [selectedTeacherId, setSelectedTeacherId] = useState(""); // selected teacher
  const [teacherData, setTeacherData] = useState({}); // details of selected teacher

  // Fetch all teachers from backend
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/admin/teachers", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((res) => setTeachers(res.data))
      .catch((err) => console.error(err));
  }, []);

  // Handle selecting teacher from dropdown
  const handleSelect = (e) => {
    const id = e.target.value;
    setSelectedTeacherId(id);
    const selected = teachers.find((t) => t._id === id);
    if (selected) {
      setTeacherData({
        name: selected.name,
        email: selected.email,
        mobileNumber: selected.mobileNumber,
        subject: selected.subject,
        dob: selected.dob ? selected.dob.substr(0, 10) : "",
        gender: selected.gender,
        fatherName: selected.fatherName,
        motherName: selected.motherName,
        education: selected.education,
        experience: selected.experience,
        monthlySalary: selected.monthlySalary,
        bloodGroup: selected.bloodGroup,
        address: selected.address,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedTeacherId) {
      alert("Teacher updated successfully!");
      // Add axios PUT request to update teacher here
    } else {
      alert("Teacher added successfully!");
      // Add axios POST request to create teacher here
    }
  };

  return (
    <Container fluid className="p-4 bg-light min-vh-100">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div className="page-chip">Teachers - Add Teacher</div>
      </div>

      <div className="employee-form-container p-4">
        <h5 className="form-section-header">Basic Information</h5>
        <hr className="form-hr" />

        <Row className="g-3 mb-4">
          <Col md={4}>
            <label className="field-label required">Select Teacher</label>
            <Form.Select
              value={selectedTeacherId}
              onChange={handleSelect}
              className="custom-input"
            >
              <option value="">Select Teacher</option>
              {teachers.map((t) => (
                <option key={t._id} value={t._id}>
                  {t.name}
                </option>
              ))}
            </Form.Select>
          </Col>

          <Col md={4}>
            <label className="field-label required">Email</label>
            <Form.Control
              type="email"
              className="custom-input"
              value={teacherData.email || ""}
              readOnly={!!selectedTeacherId} // view/edit mode disables email
            />
          </Col>

          <Col md={4}>
            <label className="field-label required">Mobile Number</label>
            <Form.Control
              type="text"
              className="custom-input"
              value={teacherData.mobileNumber || ""}
              onChange={(e) =>
                setTeacherData({ ...teacherData, mobileNumber: e.target.value })
              }
            />
          </Col>

          <Col md={4}>
            <label className="field-label required">Subject</label>
            <Form.Control
              type="text"
              className="custom-input"
              value={teacherData.subject || ""}
              onChange={(e) =>
                setTeacherData({ ...teacherData, subject: e.target.value })
              }
            />
          </Col>

          <Col md={4}>
            <label className="field-label required">Date of Birth</label>
            <Form.Control
              type="date"
              className="custom-input"
              value={teacherData.dob || ""}
              onChange={(e) =>
                setTeacherData({ ...teacherData, dob: e.target.value })
              }
            />
          </Col>

          <Col md={4}>
            <label className="field-label optional">Gender</label>
            <Form.Control
              type="text"
              className="custom-input"
              value={teacherData.gender || ""}
              onChange={(e) =>
                setTeacherData({ ...teacherData, gender: e.target.value })
              }
            />
          </Col>
        </Row>

        <h5 className="form-section-header">Other Information</h5>
        <hr className="form-hr" />

        <Row className="g-3 mb-4">
          <Col md={6}>
            <label className="field-label optional">Father Name</label>
            <Form.Control
              type="text"
              className="custom-input"
              value={teacherData.fatherName || ""}
              onChange={(e) =>
                setTeacherData({ ...teacherData, fatherName: e.target.value })
              }
            />
          </Col>

          <Col md={6}>
            <label className="field-label optional">Mother Name</label>
            <Form.Control
              type="text"
              className="custom-input"
              value={teacherData.motherName || ""}
              onChange={(e) =>
                setTeacherData({ ...teacherData, motherName: e.target.value })
              }
            />
          </Col>

          <Col md={6}>
            <label className="field-label optional">Education</label>
            <Form.Control
              type="text"
              className="custom-input"
              value={teacherData.education || ""}
              onChange={(e) =>
                setTeacherData({ ...teacherData, education: e.target.value })
              }
            />
          </Col>

          <Col md={6}>
            <label className="field-label optional">Experience (years)</label>
            <Form.Control
              type="number"
              className="custom-input"
              value={teacherData.experience || ""}
              onChange={(e) =>
                setTeacherData({ ...teacherData, experience: e.target.value })
              }
            />
          </Col>

          <Col md={6}>
            <label className="field-label optional">Monthly Salary</label>
            <Form.Control
              type="number"
              className="custom-input"
              value={teacherData.monthlySalary || ""}
              onChange={(e) =>
                setTeacherData({ ...teacherData, monthlySalary: e.target.value })
              }
            />
          </Col>

          <Col md={6}>
            <label className="field-label optional">Blood Group</label>
            <Form.Control
              type="text"
              className="custom-input"
              value={teacherData.bloodGroup || ""}
              onChange={(e) =>
                setTeacherData({ ...teacherData, bloodGroup: e.target.value })
              }
            />
          </Col>

          <Col xs={12}>
            <label className="field-label optional">Address</label>
            <Form.Control
              as="textarea"
              rows={3}
              className="custom-input-textarea"
              value={teacherData.address || ""}
              onChange={(e) =>
                setTeacherData({ ...teacherData, address: e.target.value })
              }
            />
          </Col>
        </Row>

        <div className="d-flex justify-content-end gap-3 mt-4">
          <Button
            variant="warning"
            className="rounded-pill px-4 fw-medium text-dark"
            onClick={() => window.location.reload()}
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

export default AddTeacher;
