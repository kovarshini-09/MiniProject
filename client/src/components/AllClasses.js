// import React from "react";
import React, { useEffect, useState, useMemo } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import empIcon from "../images/teachers-icon.png"; // same image
import "./AllStudents.css"; // reuse existing styles

function AllClasses() {
  // Load classes from localStorage
  const classes = JSON.parse(localStorage.getItem("ui_classes") || "[]");
  const teachers = JSON.parse(localStorage.getItem("ui_teachers") || "[]");
  const [hiddenClassIds, setHiddenClassIds] = useState([]);

  // Students: prefer live from backend, fallback to localStorage cache
  const [students, setStudents] = useState([]);
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch("http://localhost:5000/api/admin/students", {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        });
        if (!res.ok) throw new Error("fetch failed");
        const data = await res.json();
        setStudents(Array.isArray(data) ? data : []);
      } catch (e) {
        const cached = JSON.parse(localStorage.getItem("ui_students") || "[]");
        setStudents(cached);
      }
    };
    fetchStudents();
  }, []);

  const normalizeClass = (value) => (value || "")
    .toString()
    .toLowerCase()
    .replace(/\s+grade\s*$/, "")
    .trim();

  const byCounts = useMemo(() => {
    return (clsId) => {
      const target = normalizeClass(clsId);
      const inClass = students.filter((s) => {
        const studentClass = normalizeClass(s.class);
        return studentClass === target || studentClass.includes(target);
      });
      const boys = inClass.filter((s) => (s.gender || "").toLowerCase() === "male").length;
      const girls = inClass.filter((s) => (s.gender || "").toLowerCase() === "female").length;
      return { boys, girls, total: inClass.length };
    };
  }, [students]);

  const visibleClasses = classes.filter((c) => !hiddenClassIds.includes(c.classId || c.className));
  const hideClassCard = (id) => {
    if (!window.confirm("Hide this class from the page? (Temporary)")) return;
    setHiddenClassIds((prev) => (prev.includes(id) ? prev : [...prev, id]));
  };

  return (
    <Container fluid className="p-4 bg-light min-vh-100">
      <h4 className="fw-bold mb-4" style={{ color: "#e63946" }}>All Classes</h4>

      <Row className="g-4">
        {visibleClasses.map((cls, idx) => (
          <Col sm={6} md={4} lg={3} key={cls.classId || idx}>
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
                <h6 className="fw-semibold mb-2">{(cls.classId || cls.className) + " Grade"}</h6>
                <p className="mb-2" style={{ color: "#e63946", fontWeight: 600 }}>
                  Class Teacher: {(() => {
                    const t = teachers.find((x) => (x.assignedClass || x.class) && normalizeClass(x.assignedClass || x.class) === normalizeClass(cls.classId || cls.className));
                    return t ? t.name : "—";
                  })()}
                </p>
                {(() => { const c = byCounts(cls.classId || cls.className); return (
                  <>
                    <p className="mb-1">Boys: {c.boys}</p>
                    <p className="mb-1">Girls: {c.girls}</p>
                    <p className="mb-0">Total: {c.total}</p>
                  </>
                ); })()}
                <button
                  className="btn btn-outline-danger btn-sm mt-3"
                  onClick={() => hideClassCard(cls.classId || cls.className)}
                >
                  Delete (Hide)
                </button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default AllClasses;
