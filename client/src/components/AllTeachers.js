import React, { useState, useEffect, useMemo } from "react";
import { Container, Row, Col, Button, Card, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./AllStudents.css";
import { FaUserPlus } from "react-icons/fa";
import empIcon from "../images/teachers-icon.png";
import AddTeacher from "./AddTeachers";
// no axios needed for listing; drive from localStorage per requirement
import { useNavigate } from "react-router-dom";

function AllTeachers() {
  const [showAddTeacher, setShowAddTeacher] = useState(false);
  const [teachers, setTeachers] = useState([]);
  const [removedIds, setRemovedIds] = useState([]); // soft-deleted in view only
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleAddTeacher = () => {
    setShowAddTeacher(true);
  };

  const handleBack = () => {
    setShowAddTeacher(false);
  };

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("ui_teachers") || "[]");
    setTeachers(stored);
  }, [showAddTeacher]);

  const handleView = (teacher) => {
    setShowAddTeacher(true);
    sessionStorage.setItem("teacherFormMode", "view");
    sessionStorage.setItem("teacherFormId", teacher._id);
  };
  const handleEdit = (teacher) => {
    setShowAddTeacher(true);
    sessionStorage.setItem("teacherFormMode", "edit");
    sessionStorage.setItem("teacherFormId", teacher._id);
  };
  const handleSoftDelete = (id) => {
    if (!window.confirm("Hide this teacher from the list? (Not deleted from DB)")) return;
    setRemovedIds((prev) => (prev.includes(id) ? prev : [...prev, id]));
  };

  const visibleTeachers = useMemo(() => {
    const filtered = teachers.filter((t) => !removedIds.includes(t._id));
    if (!search.trim()) return filtered;
    const q = search.toLowerCase();
    return filtered.filter(
      (t) =>
        t.name?.toLowerCase().includes(q) ||
        t.email?.toLowerCase().includes(q) ||
        t.subject?.toLowerCase().includes(q)
    );
  }, [teachers, removedIds, search]);

  return (
    <Container fluid className="p-4 bg-light min-vh-100">
      {!showAddTeacher ? (
        <>
          {/* Page Header */}
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div className="page-chip">Employees - All Teachers</div>
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

          {/* Teacher Cards */}
          <Row className="g-4">
            {visibleTeachers.map((teacher) => (
              <Col sm={6} md={4} lg={3} key={teacher._id}>
                <Card className="shadow-sm border-0 text-center h-100">
                  <Card.Body className="d-flex flex-column align-items-center">
                    <img
                      src={empIcon}
                      alt="teacher"
                      className="img-fluid mb-3"
                      style={{ maxWidth: "120px" }}
                    />
                    <h6 className="fw-semibold mb-1">{teacher.name}</h6>
                    <p className="text-muted mb-3">{teacher.subject}</p>
                    <div className="mt-auto w-100">
                      <div className="d-flex justify-content-center gap-2">
                        <Button
                          variant="outline-secondary"
                          size="sm"
                          className="px-3"
                          onClick={() => handleView(teacher)}
                        >
                          View
                        </Button>
                        <Button
                          variant="outline-primary"
                          size="sm"
                          className="px-3"
                          onClick={() => handleEdit(teacher)}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="outline-warning"
                          size="sm"
                          className="px-3 text-dark"
                          onClick={() => handleSoftDelete(teacher._id)}
                        >
                          Delete
                        </Button>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}

            {/* Add New Teacher Card */}
            <Col sm={6} md={4} lg={3}>
              <Card
                className="shadow-sm border p-3 text-center d-flex align-items-center justify-content-center h-100"
                onClick={handleAddTeacher}
                style={{ cursor: "pointer" }}
              >
                <FaUserPlus size={40} className="mb-2 text-dark" />
                <h6 className="fw-semibold text-dark">Add New</h6>
              </Card>
            </Col>
          </Row>
        </>
      ) : (
        <>
          <Button variant="primary" className="mb-4" onClick={handleBack}>
            Back
          </Button>
          <AddTeacher />
        </>
      )}
    </Container>
  );
}

export default AllTeachers;

