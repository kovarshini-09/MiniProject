import React, { useState } from "react";
import { Container, Row, Col, Card, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import arrowDown from "../images/arrow-down.png"; 

const classOptions = [
  "6A","6B","6C",
  "7A","7B","7C",
  "8A","8B","8C",
  "9A","9B","9C",
  "10A","10B","10C"
];

function Homework() {
  const [selectedSubject, setSelectedSubject] = useState("English");
  const [selectedClass, setSelectedClass] = useState("");
  const [filesToUpload, setFilesToUpload] = useState([]);
  const [optionalDescription, setOptionalDescription] = useState("");

  const homeworkSubjects = ["English", "Tamil", "Maths", "Science", "Social"];
  const homeworkContent = {
    English: { assignment: "Write a 500-word essay on the themes of 'To Kill a Mockingbird'. Due: Friday.", givenBy: "Ms. Sharma" },
    Tamil: { assignment: "Complete exercises 4, 5, and 6 from page 88. Prepare for a vocabulary test next week.", givenBy: "Mr. Rajan" },
  };

  const handleFileChange = (e) => {
    setFilesToUpload([...filesToUpload, ...Array.from(e.target.files)]);
  };

  const handleRemoveFile = (index) => {
    setFilesToUpload(filesToUpload.filter((_, i) => i !== index));
  };

  const handleUpdate = () => {
    console.log("Class:", selectedClass);
    console.log("Submitting homework for:", selectedSubject);
    console.log("Files:", filesToUpload.map(f => f.name));
    console.log("Description:", optionalDescription);
    alert(`Homework for ${selectedSubject} updated!`);
    setFilesToUpload([]);
    setOptionalDescription("");
  };

  const handleCancel = () => {
    setFilesToUpload([]);
    setOptionalDescription("");
  };

  const currentHomework = homeworkContent[selectedSubject] || { assignment: "No homework currently assigned for this subject.", givenBy: "N/A" };

  return (
    <Container fluid className="min-vh-100 bg-light p-4">
      <Row className="mb-4 bg-white p-3 shadow-sm rounded align-items-center">
        <Col xs={6}><h4 className="fw-bold">LOGO</h4></Col>
        <Col xs={6} className="text-end">
          <div className="dropdown">
            <button className="d-flex align-items-center p-0 bg-transparent border-0 float-end" type="button" id="profileMenu" data-bs-toggle="dropdown" aria-expanded="false">
              <span className="fw-bold fs-5 me-2">Profile</span>
              <img src={arrowDown} alt="Dropdown Arrow" width="18" height="18" />
            </button>
          </div>
        </Col>
      </Row>

      <div className="bg-white p-4 p-md-5 shadow-sm rounded">
        <h2 className="mb-4 fw-bold" style={{ color: "#e63946" }}>Homework</h2>

        {/* Class Selection */}
        <Row className="mb-4">
          <div className="col-md-6">
            <Form.Label>Select Class</Form.Label>
            <Form.Select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              style={{ border: "2px solid #e63946" }}
            >
              <option value="">Select Class</option>
              {classOptions.map(cls => <option key={cls} value={cls}>{cls}</option>)}
            </Form.Select>
          </div>
        </Row>

        <Row className="g-4">
          <Col md={3} className="border-end pe-md-4">
            <h5 className="fw-bold mb-3">Subjects</h5>
            {homeworkSubjects.map((subject) => (
              <button key={subject} className={`btn w-100 text-start py-3 mb-2 fw-medium ${selectedSubject === subject ? 'btn-danger' : 'btn-outline-danger'}`} onClick={() => setSelectedSubject(subject)}>
                {subject}
              </button>
            ))}
          </Col>

          <Col md={9}>
            <Row className="g-4">
              <Col md={6}>
                <Card className="shadow-sm border-0 p-4 h-100">
                  <h5 className="fw-bold mb-3" style={{ color: "#e63946" }}>Today's Homework</h5>
                  <p className="small-text text-muted mb-4">Homework given by the subject teacher.</p>
                  <p className="fs-6 fw-semibold">{currentHomework.assignment}</p>
                  <p className="small-text mt-auto text-end text-muted">Given by: {currentHomework.givenBy}</p>
                </Card>
              </Col>

              <Col md={6}>
                <Card className="shadow-sm border-0 p-4">
                  <h5 className="fw-bold mb-3" style={{ color: "#e63946" }}>Submit Work</h5>
                  <div className="border border-dashed p-4 text-center mb-3" style={{ borderColor: '#e63946', borderRadius: '0.25rem' }}>
                    <p className="small-text text-muted mb-2">Drag and drop your files here, or</p>
                    <label htmlFor="file-upload" className="btn btn-sm btn-outline-danger small-text">Browse File</label>
                    <input id="file-upload" type="file" multiple className="d-none" onChange={handleFileChange} />
                  </div>

                  <div className="mb-3">
                    {filesToUpload.map((file, index) => (
                      <div key={index} className="d-flex justify-content-between align-items-center p-2 mb-1 small-text bg-light rounded border">
                        <span>{file.name}</span>
                        <button type="button" className="btn-close" aria-label="Remove file" onClick={() => handleRemoveFile(index)} style={{ fontSize: '0.7rem' }}></button>
                      </div>
                    ))}
                    {filesToUpload.length === 0 && <p className="small-text text-muted text-center">No files selected.</p>}
                  </div>

                  <div className="mb-3">
                    <input type="text" className="form-control form-control-sm small-text" placeholder="Add an optional description..." value={optionalDescription} onChange={(e) => setOptionalDescription(e.target.value)} />
                  </div>

                  <div className="text-end">
                    <button type="button" className="btn btn-outline-secondary me-2 btn-sm small-text" onClick={handleCancel}>Cancel</button>
                    <button type="button" className="btn btn-danger btn-sm small-text" onClick={handleUpdate} disabled={filesToUpload.length === 0}>Update</button>
                  </div>
                </Card>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    </Container>
  );
}

export default Homework;
