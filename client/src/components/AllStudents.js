import React, { useState } from "react";
import { Container, Row, Col, Button, Card, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./AllStudents.css";
import { FaUserPlus } from 'react-icons/fa';
import empIcon from "../images/teachers-icon.png";
import AddStudent from './AddStudent';

function AllStudents() {
  const [showAddStudent, setShowAddStudent] = useState(false);

  const handleAddStudent = () => {
    setShowAddStudent(true);
  };

  const handleBack = () => {
    setShowAddStudent(false);
  };

  return (
    <Container fluid className="p-4 bg-light min-vh-100">
      {!showAddStudent ? (
        <>
          {/* Page Header */}
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div className="page-chip">Students - All Students</div>
            <div className="d-flex align-items-center gap-2">
              <Form.Control
                type="text"
                placeholder="Search"
                className="rounded-pill px-3"
                style={{ maxWidth: "200px", borderColor: "#dc3545" }}
              />
              <Button
                variant="danger"
                className="rounded-pill px-4"
                style={{ backgroundColor: "#f04b4b", border: "none" }}
              >
                All
              </Button>
            </div>
          </div>

          {/* Students Cards */}
          <Row className="g-4">
            {/* Student Card 1 */}
            <Col sm={6} md={4} lg={3}>
              <Card className="shadow-sm border-0 text-center h-100">
                <Card.Body className="d-flex flex-column align-items-center">
                  <img
                    src={empIcon}
                    alt="student"
                    className="img-fluid mb-3"
                    style={{ maxWidth: "120px" }}
                  />
                  <h6 className="fw-semibold mb-4">Name</h6>
                  {/* Pushes buttons to bottom neatly */}
                  <div className="mt-auto w-100">
                    <div className="d-flex justify-content-center gap-2">
                      <Button variant="outline-secondary" size="sm" className="px-3">
                        View
                      </Button>
                      <Button variant="outline-primary" size="sm" className="px-3">
                        Edit
                      </Button>
                      <Button
                        variant="outline-warning"
                        size="sm"
                        className="px-3 text-dark"
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
            
            {/* Student Card 2 */}
            <Col sm={6} md={4} lg={3}>
              <Card className="shadow-sm border-0 text-center h-100">
                <Card.Body className="d-flex flex-column align-items-center">
                  <img
                    src={empIcon}
                    alt="student"
                    className="img-fluid mb-3"
                    style={{ maxWidth: "120px" }}
                  />
                  <h6 className="fw-semibold mb-4">Name</h6>
                  {/* Pushes buttons to bottom neatly */}
                  <div className="mt-auto w-100">
                    <div className="d-flex justify-content-center gap-2">
                      <Button variant="outline-secondary" size="sm" className="px-3">
                        View
                      </Button>
                      <Button variant="outline-primary" size="sm" className="px-3">
                        Edit
                      </Button>
                      <Button
                        variant="outline-warning"
                        size="sm"
                        className="px-3 text-dark"
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>

            {/* Add New Card */}
            <Col sm={6} md={4} lg={3}>
              <Card 
                className="shadow-sm border p-3 text-center d-flex align-items-center justify-content-center h-100" 
                onClick={handleAddStudent}
                style={{ cursor: 'pointer' }}
              >
                <FaUserPlus size={40} className="mb-2 text-dark" />
                <h6 className="fw-semibold text-dark">Add New</h6>
              </Card>
            </Col>
          </Row>
        </>
      ) : (
        <>
          <Button 
            variant="primary" 
            className="mb-4" 
            onClick={handleBack}
          >
            Back
          </Button>
          <AddStudent />
        </>
      )}
    </Container>
  );
}

export default AllStudents;