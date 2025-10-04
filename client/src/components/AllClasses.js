import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button, Card, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./AllStudents.css";
import { FaUserPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import empIcon from "../images/teachers-icon.png";

function AllStudents() {
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState("");

  // Fetch students from backend
  useEffect(() => {
    axios.get("http://localhost:5000/api/students")
      .then(res => setStudents(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleView = (student) => {
    navigate("/admin/add-student", { state: { student, mode: "view" } });
  };

  const handleEdit = (student) => {
    navigate("/admin/add-student", { state: { student, mode: "edit" } });
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this student?")) {
      try {
        await axios.delete(`http://localhost:5000/api/students/${id}`);
        setStudents(students.filter(s => s._id !== id));
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleAddStudent = () => {
    navigate("/admin/add-student", { state: { mode: "add" } });
  };

  return (
    <Container fluid className="p-4 bg-light min-vh-100">
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
        {students
          .filter(s => s.name.toLowerCase().includes(search.toLowerCase()))
          .map((student) => (
          <Col sm={6} md={4} lg={3} key={student._id}>
            <Card className="shadow-sm border-0 text-center h-100">
              <Card.Body className="d-flex flex-column align-items-center">
                <img
                  src={empIcon}
                  alt="student"
                  className="img-fluid mb-3"
                  style={{ maxWidth: "120px" }}
                />
                <h6 className="fw-semibold mb-4">{student.name}</h6>
                <div className="mt-auto w-100">
                  <div className="d-flex justify-content-center gap-2">
                    <Button
                      variant="outline-secondary"
                      size="sm"
                      className="px-3"
                      onClick={() => handleView(student)}
                    >
                      View
                    </Button>
                    <Button
                      variant="outline-primary"
                      size="sm"
                      className="px-3"
                      onClick={() => handleEdit(student)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="outline-warning"
                      size="sm"
                      className="px-3 text-dark"
                      onClick={() => handleDelete(student._id)}
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
            style={{ cursor: "pointer" }}
          >
            <FaUserPlus size={40} className="mb-2 text-dark" />
            <h6 className="fw-semibold">Add New</h6>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default AllStudents;
