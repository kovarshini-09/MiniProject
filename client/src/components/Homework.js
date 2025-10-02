import React, { useState } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import arrowDown from "../images/arrow-down.png"; 


function Homework() {
  const [selectedSubject, setSelectedSubject] = useState("English");
  const [filesToUpload, setFilesToUpload] = useState([]);
  const [optionalDescription, setOptionalDescription] = useState("");

  // Mock list of subjects, mimicking the buttons from StudentDashboard
  const homeworkSubjects = ["English", "Tamil", "Maths", "Science", "Social"];

  // Mock data for homework content based on the selected subject
  const homeworkContent = {
    English: {
      assignment: "Write a 500-word essay on the themes of 'To Kill a Mockingbird'. Due: Friday.",
      givenBy: "Ms. Sharma",
    },
    Tamil: {
      assignment: "Complete exercises 4, 5, and 6 from page 88. Prepare for a vocabulary test next week.",
      givenBy: "Mr. Rajan",
    },
    // Add more mock data for other subjects if needed
  };

  // Handler for file selection
  const handleFileChange = (e) => {
    // Convert FileList object to an array and append to existing files
    const newFiles = Array.from(e.target.files);
    setFilesToUpload([...filesToUpload, ...newFiles]);
  };

  // Handler for file removal
  const handleRemoveFile = (index) => {
    const newFiles = filesToUpload.filter((_, i) => i !== index);
    setFilesToUpload(newFiles);
  };

  // Handler for updating/submitting the homework
  const handleUpdate = () => {
    // Logic to send files and description to the backend
    console.log("Submitting homework for:", selectedSubject);
    console.log("Files:", filesToUpload.map(f => f.name));
    console.log("Description:", optionalDescription);
    alert(`Homework for ${selectedSubject} updated!`);
    
    // Clear the form after submission
    setFilesToUpload([]);
    setOptionalDescription("");
  };

  // Handler for canceling the upload
  const handleCancel = () => {
    setFilesToUpload([]);
    setOptionalDescription("");
  };

  const currentHomework = homeworkContent[selectedSubject] || { assignment: "No homework currently assigned for this subject.", givenBy: "N/A" };

  return (
    <Container fluid className="min-vh-100 bg-light p-4">
      {/* Header (LOGO and Profile) - Copied from StudentDashboard for visual consistency */}
      <Row className="mb-4 bg-white p-3 shadow-sm rounded align-items-center">
        <Col xs={6}>
          <h4 className="fw-bold">LOGO</h4>
        </Col>
        <Col xs={6} className="text-end">
          <div className="dropdown">
            <button
              className="d-flex align-items-center p-0 bg-transparent border-0 float-end"
              type="button"
              id="profileMenu"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <span className="fw-bold fs-5 me-2">Profile</span>
              <img src={arrowDown} alt="Dropdown Arrow" width="18" height="18" />

            </button>
            {/* Dropdown content omitted for simplicity, but included in Dashboard */}
          </div>
        </Col>
      </Row>

      {/* Main Content Area */}
      <div className="bg-white p-4 p-md-5 shadow-sm rounded">
        <h2 className="mb-4 fw-bold" style={{ color: "#e63946" }}>Home work</h2>

        <Row className="g-4">
          
          {/* Left Column: Subject Selection Sidebar */}
          <Col md={3} className="border-end pe-md-4">
            <h5 className="fw-bold mb-3">Subjects</h5>
            {homeworkSubjects.map((subject) => (
              <button
                key={subject}
                className={`btn w-100 text-start py-3 mb-2 fw-medium ${
                  selectedSubject === subject ? 'btn-danger' : 'btn-outline-danger'
                }`}
                onClick={() => setSelectedSubject(subject)}
              >
                {subject}
              </button>
            ))}
          </Col>

          {/* Center/Right Column: Homework Details and Upload Area */}
          <Col md={9}>
            <Row className="g-4">
              
              {/* Homework Details */}
              <Col md={6}>
                <Card className="shadow-sm border-0 p-4 h-100">
                  <h5 className="fw-bold mb-3" style={{ color: "#e63946" }}>Today's Home work</h5>
                  <p className="small-text text-muted mb-4">
                    Homework given by the subject teacher.
                  </p>
                  <p className="fs-6 fw-semibold">{currentHomework.assignment}</p>
                  <p className="small-text mt-auto text-end text-muted">Given by: {currentHomework.givenBy}</p>
                </Card>
              </Col>

              {/* Upload Section */}
              <Col md={6}>
                <Card className="shadow-sm border-0 p-4">
                  <h5 className="fw-bold mb-3" style={{ color: "#e63946" }}>Submit Work</h5>
                  
                  {/* Dropzone Area */}
                  <div 
                    className="border border-dashed p-4 text-center mb-3" 
                    style={{ borderColor: '#e63946', borderRadius: '0.25rem' }}
                  >
                    <p className="small-text text-muted mb-2">Drag and drop your files here, or</p>
                    <label htmlFor="file-upload" className="btn btn-sm btn-outline-danger small-text">
                      Browse File
                    </label>
                    <input
                      id="file-upload"
                      type="file"
                      multiple
                      className="d-none"
                      onChange={handleFileChange}
                    />
                  </div>

                  {/* File List */}
                  <div className="mb-3">
                    {filesToUpload.map((file, index) => (
                      <div 
                        key={index} 
                        className="d-flex justify-content-between align-items-center p-2 mb-1 small-text bg-light rounded border"
                      >
                        <span>{file.name}</span>
                        <button 
                          type="button" 
                          className="btn-close" 
                          aria-label="Remove file"
                          onClick={() => handleRemoveFile(index)}
                          style={{ fontSize: '0.7rem' }}
                        ></button>
                      </div>
                    ))}
                    {filesToUpload.length === 0 && (
                        <p className="small-text text-muted text-center">No files selected.</p>
                    )}
                  </div>

                  {/* Optional Description */}
                  <div className="mb-3">
                    <input
                      type="text"
                      className="form-control form-control-sm small-text"
                      placeholder="Add an optional description..."
                      value={optionalDescription}
                      onChange={(e) => setOptionalDescription(e.target.value)}
                    />
                  </div>

                  {/* Action Buttons */}
                  <div className="text-end">
                    <button
                      type="button"
                      className="btn btn-outline-secondary me-2 btn-sm small-text"
                      onClick={handleCancel}
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      className="btn btn-danger btn-sm small-text"
                      onClick={handleUpdate}
                      disabled={filesToUpload.length === 0} // Disable if no files are selected
                    >
                      Update
                    </button>
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
