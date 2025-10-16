
import React, { useState, useEffect, useMemo } from "react";
import { Container, Row, Col, Button, Card, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./AllStudents.css";
import { FaUserPlus } from 'react-icons/fa';
import empIcon from "../images/teachers-icon.png";
import AddStudent from './AddStudent';
// no axios needed; list is driven from localStorage per requirement

function AllStudents() {
  const [showAddStudent, setShowAddStudent] = useState(false);
  const [students, setStudents] = useState([]);
  const [removedIds, setRemovedIds] = useState([]); // soft-deleted ids for this view
  const [search, setSearch] = useState("");

  const handleAddStudent = () => {
    setShowAddStudent(true);
  };

  const handleBack = () => {
    setShowAddStudent(false);
  };

  // Load list from localStorage; remains empty until added via form submit
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("ui_students") || "[]");
    setStudents(stored);
  }, [showAddStudent]);

  const visibleStudents = useMemo(() => {
    const filtered = students.filter((s) => !removedIds.includes(s._id));
    if (!search.trim()) return filtered;
    const q = search.toLowerCase();
    return filtered.filter(
      (s) =>
        s.name?.toLowerCase().includes(q) ||
        s.regNo?.toLowerCase().includes(q) ||
        s.class?.toLowerCase().includes(q)
    );
  }, [students, removedIds, search]);

  const handleSoftDelete = (id) => {
    if (!window.confirm("Hide this student from the list? (Not deleted from DB)")) return;
    setRemovedIds((prev) => (prev.includes(id) ? prev : [...prev, id]));
  };

  const handleView = (student) => {
    setShowAddStudent(true);
    // open AddStudent in view mode by encoding selection in sessionStorage
    sessionStorage.setItem("studentFormMode", "view");
    sessionStorage.setItem("studentFormId", student._id);
  };

  const handleEdit = (student) => {
    setShowAddStudent(true);
    sessionStorage.setItem("studentFormMode", "edit");
    sessionStorage.setItem("studentFormId", student._id);
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
                value={search}
                onChange={(e) => setSearch(e.target.value)}
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
            {visibleStudents.map((student) => (
              <Col sm={6} md={4} lg={3} key={student._id}>
                <Card className="shadow-sm border-0 text-center h-100">
                  <Card.Body className="d-flex flex-column align-items-center">
                    <img
                      src={empIcon}
                      alt="student"
                      className="img-fluid mb-3"
                      style={{ maxWidth: "120px" }}
                    />
                    <h6 className="fw-semibold mb-1">{student.name}</h6>
                    <p className="mb-3">{student.class}</p> {/* Display class */}
                    <div className="mt-auto w-100">
                      <div className="d-flex justify-content-center gap-2">
                        <Button variant="outline-secondary" size="sm" className="px-3" onClick={() => handleView(student)}>
                          View
                        </Button>
                        <Button variant="outline-primary" size="sm" className="px-3" onClick={() => handleEdit(student)}>
                          Edit
                        </Button>
                        <Button
                          variant="outline-warning"
                          size="sm"
                          className="px-3 text-dark"
                          onClick={() => handleSoftDelete(student._id)}
                        >
                          Delete
                        </Button>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}

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