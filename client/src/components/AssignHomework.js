import React, { useState } from "react";
import { Form, Button, Row, Col, Card } from "react-bootstrap";

function AssignHomework() {
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [assignmentType, setAssignmentType] = useState("");
  const [selectedClass, setSelectedClass] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Homework Assigned!");
  };

  // Common red-rectangle style for all inputs
  const inputStyle = {
    border: "2px solid #e63946",
    borderRadius: "0px", // rectangle shape
    resize: "none",      // prevent resizing for textarea
  };

  return (
    <Card className="shadow-sm border rounded p-5 ">
      {/* Page Heading */}
      <h4 className="fw-bold mb-5" style={{ color: "#e63946" }}>
        Assign Homework
      </h4>

      {/* Form */}
      <Form onSubmit={handleSubmit}>
        <Row className="mb-5">
          {/* Description / Instruction */}
          <Col md={8} className="d-flex flex-column">
            <Form.Group className="flex-grow-1 d-flex flex-column">
              <Form.Label className="fw-semibold">
                Description / Instruction
              </Form.Label>
              <Form.Control
                as="textarea"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter homework details..."
                className="flex-grow-1"
                style={{
                  ...inputStyle,
                  minHeight: "100%", // make it stretch full column height
                }}
              />
            </Form.Group>
          </Col>

          {/* Due Date + Assignment Type + Class Selector */}
          <Col md={4} className="d-flex flex-column">
            <Form.Group className="mb-3">
              <Form.Label className="fw-semibold">Due Date</Form.Label>
              <Form.Control
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                style={inputStyle}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="fw-semibold">Assignment Type</Form.Label>
              <Form.Control
                type="text"
                value={assignmentType}
                onChange={(e) => setAssignmentType(e.target.value)}
                placeholder="E.g. Homework, Project..."
                style={inputStyle}
              />
            </Form.Group>

            <Form.Group className="mt-auto">
              <Form.Label className="fw-semibold">
                Assign to Students / Classes
              </Form.Label>
              <Form.Select
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
                style={inputStyle}
              >
                <option value="">Select class</option>
                <option value="Class 6">Class 8A</option>
                <option value="Class 7">Class 8B</option>
                <option value="Class 8">Class 8C</option>
                 <option value="Class 6">Class 9A</option>
                <option value="Class 7">Class 9B</option>
                <option value="Class 8">Class 9C</option>
                 <option value="Class 6">Class 10A</option>
                <option value="Class 7">Class 10B</option>
                <option value="Class 8">Class 10C</option>
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>

        {/* Buttons */}
        <div className="d-flex gap-3">
          <Button
            type="submit"
            style={{ backgroundColor: "#e63946", border: "none" }}
          >
            Assign Homework
          </Button>
          <Button variant="outline-secondary">Cancel</Button>
        </div>
      </Form>
    </Card>
  );
}

export default AssignHomework;
