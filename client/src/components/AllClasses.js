// import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import empIcon from "../images/teachers-icon.png"; // same image
import "./AllStudents.css"; // reuse existing styles

function AllClasses() {
  // Hardcoded class data as per your requirement
  const classes = [
    { className: "9A Grade", boys: 6, girls: 4, total: 10 },
    { className: "9B Grade", boys: 5, girls: 5, total: 10 },
    { className: "9C Grade", boys: 5, girls: 5, total: 10 },
    { className: "10A Grade", boys: 5, girls: 5, total: 10 },
    { className: "10B Grade", boys: 5, girls: 5, total: 10 },
    { className: "10C Grade", boys: 5, girls: 5, total: 10 },
  ];

  return (
    <Container fluid className="p-4 bg-light min-vh-100">
      <h4 className="fw-bold mb-4" style={{ color: "#e63946" }}>All Classes</h4>

      <Row className="g-4">
        {classes.map((cls) => (
          <Col sm={6} md={4} lg={3} key={cls.className}>
            <Card
              className="shadow-sm border-0 text-center h-100 class-card"
            >
              <Card.Body className="d-flex flex-column align-items-center">
                <img
                  src={empIcon}
                  alt="class"
                  className="img-fluid mb-3"
                  style={{ maxWidth: "120px" }}
                />
                <h6 className="fw-semibold mb-2">{cls.className}</h6>
                <p className="mb-1">Boys: {cls.boys}</p>
                <p className="mb-1">Girls: {cls.girls}</p>
                <p className="mb-0">Total: {cls.total}</p>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default AllClasses;
