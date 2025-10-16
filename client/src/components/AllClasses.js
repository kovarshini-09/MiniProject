import React, { useEffect, useState, useMemo } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import empIcon from "../images/teachers-icon.png";
import "./AllStudents.css";

function AllClasses() {
  const [classes, setClasses] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [students, setStudents] = useState([]);

  // ✅ Fetch classes from backend (with teacher populated)
  const fetchClasses = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:5000/api/classes", {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      if (!res.ok) throw new Error("fetch failed");
      const data = await res.json();
      setClasses(data);
      localStorage.setItem("ui_classes", JSON.stringify(data));
    } catch (err) {
      console.error("Error fetching classes:", err);
    }
  };

  useEffect(() => {
    fetchClasses();
  }, []);

  // ✅ Fetch teachers
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("ui_teachers") || "[]");
    setTeachers(data);
  }, []);

  // ✅ Fetch students
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

  const normalizeClass = (value) =>
    (value || "").toString().toLowerCase().replace(/\s+grade\s*$/, "").trim();

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

  // ✅ Delete class using _id (backend deleteClass expects _id)
  const deleteClass = async (classObj) => {
    if (!window.confirm(`Are you sure you want to permanently delete ${classObj.classId}?`))
      return;

    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`http://localhost:5000/api/classes/${classObj._id}`, {
        method: "DELETE",
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });

      if (!res.ok) throw new Error("Delete failed");

      // Remove from UI
      const updated = classes.filter((c) => c._id !== classObj._id);
      setClasses(updated);
      localStorage.setItem("ui_classes", JSON.stringify(updated));

      alert(`Class ${classObj.classId} deleted successfully ✅`);
    } catch (err) {
      console.error("Error deleting class:", err);
      alert("Failed to delete class ❌");
    }
  };

  return (
    <Container fluid className="p-4 bg-light min-vh-100">
      <h4 className="fw-bold mb-4" style={{ color: "#e63946" }}>
        All Classes
      </h4>

      <Row className="g-4">
        {classes.map((cls, idx) => (
          <Col sm={6} md={4} lg={3} key={cls._id || idx}>
            <Card className="shadow-sm border-0 text-center h-100 class-card">
              <Card.Body className="d-flex flex-column align-items-center">
                <img
                  src={empIcon}
                  alt="class"
                  className="img-fluid mb-3"
                  style={{ maxWidth: "120px" }}
                />
                <h6 className="fw-semibold mb-2">
                  {(cls.classId || cls.className) + " Grade"}
                </h6>

                {/* ✅ Teacher name (populated or local fallback) */}
                <p className="mb-2" style={{ color: "#e63946", fontWeight: 600 }}>
                  Class Teacher:{" "}
                  {cls.classTeacher?.name ||
                    (() => {
                      const t = teachers.find(
                        (x) =>
                          normalizeClass(x.assignedClass || x.class) ===
                          normalizeClass(cls.classId || cls.className)
                      );
                      return t ? t.name : "—";
                    })()}
                </p>

                {/* ✅ Student counts */}
                {(() => {
                  const c = byCounts(cls.classId || cls.className);
                  return (
                    <>
                      <p className="mb-1">Boys: {c.boys}</p>
                      <p className="mb-1">Girls: {c.girls}</p>
                      <p className="mb-0">Total: {c.total}</p>
                    </>
                  );
                })()}

                {/* ✅ Delete by _id */}
                <button
                  className="btn btn-outline-danger btn-sm mt-3"
                  onClick={() => deleteClass(cls)}
                >
                  Delete (Permanent)
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
