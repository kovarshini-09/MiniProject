import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Row, Col, Form, Button, Container, Card } from "react-bootstrap";
import axios from "axios";
import "./EmployeeForm.css";
import empIcon from "../images/teachers-icon.png";
import { useNavigate } from "react-router-dom";

const AddTeacher = ({ onClose = () => {}, navigateBack = true }) => {
  const [teachers, setTeachers] = useState([]); // all teachers
  const [selectedTeacherId, setSelectedTeacherId] = useState(""); // selected teacher
  const [mode, setMode] = useState("create"); // create | view | edit
  const [teacherData, setTeacherData] = useState({}); // details of selected teacher
  const [preview, setPreview] = useState(null); // show card preview after submit

  const navigate = useNavigate();

  // Fetch all teachers from backend
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/admin/teachers", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((res) => setTeachers(res.data))
      .catch((err) => console.error(err));
  }, []);

  // Read mode/id for view/edit navigation
  useEffect(() => {
    const storedMode = sessionStorage.getItem("teacherFormMode");
    const storedId = sessionStorage.getItem("teacherFormId");
    if (storedMode) setMode(storedMode);
    if (storedId) setSelectedTeacherId(storedId);
  }, []);

  // Auto-populate when id present
  useEffect(() => {
    if (!selectedTeacherId) return;
    const all = teachers.length
      ? teachers
      : JSON.parse(localStorage.getItem("ui_teachers") || "[]");
    const t = all.find((x) => x._id === selectedTeacherId);
    if (t) {
      setTeacherData({
        name: t.name || "",
        email: t.email || "",
        mobileNumber: t.mobileNumber || "",
        subject: t.subject || "",
        dob: t.dob ? String(t.dob).substr(0, 10) : "",
        gender: t.gender || "",
        fatherName: t.fatherName || "",
        motherName: t.motherName || "",
        education: t.education || "",
        experience: t.experience || "",
        monthlySalary: t.monthlySalary || "",
        bloodGroup: t.bloodGroup || "",
        address: t.address || "",
      });
    }
  }, [teachers, selectedTeacherId]);

  // Handle selecting teacher from dropdown (unified with mode + populate)
  const handleSelect = (e) => {
    const id = e.target.value;
    setSelectedTeacherId(id);
    setMode(id ? "edit" : "create");
    const selected = teachers.find((t) => t._id === id);
    if (selected) {
      setTeacherData({
        name: selected.name || "",
        email: selected.email || "",
        mobileNumber: selected.mobileNumber || "",
        subject: selected.subject || "",
        dob: selected.dob ? String(selected.dob).substr(0, 10) : "",
        gender: selected.gender || "",
        fatherName: selected.fatherName || "",
        motherName: selected.motherName || "",
        education: selected.education || "",
        experience: selected.experience || "",
        monthlySalary: selected.monthlySalary || "",
        bloodGroup: selected.bloodGroup || "",
        address: selected.address || "",
      });
    } else {
      setTeacherData({});
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedTeacherId) {
      axios
        .put(
          `http://localhost:5000/api/admin/teachers/${selectedTeacherId}`,
          teacherData,
          { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
        )
        .then((res) => {
          alert("Teacher updated successfully!");
          const updated = { ...(res?.data?.teacher || { _id: selectedTeacherId, ...teacherData }), _ui: true };
          // sync localStorage (fallback cache)
          const list = JSON.parse(localStorage.getItem("ui_teachers") || "[]");
          const idx = list.findIndex((t) => t._id === selectedTeacherId);
          if (idx >= 0) list[idx] = updated; else list.push(updated);
          localStorage.setItem("ui_teachers", JSON.stringify(list));
          // update local state used by this form
          setTeachers((prev) => {
            const i = prev.findIndex((t) => t._id === selectedTeacherId);
            if (i === -1) return prev;
            const copy = prev.slice();
            copy[i] = updated;
            return copy;
          });
          setTeacherData({
            name: updated.name || "",
            email: updated.email || "",
            mobileNumber: updated.mobileNumber || "",
            subject: updated.subject || "",
            dob: updated.dob ? String(updated.dob).substr(0, 10) : "",
            gender: updated.gender || "",
            fatherName: updated.fatherName || "",
            motherName: updated.motherName || "",
            education: updated.education || "",
            experience: updated.experience || "",
            monthlySalary: updated.monthlySalary || "",
            bloodGroup: updated.bloodGroup || "",
            address: updated.address || "",
          });
          sessionStorage.removeItem("teacherFormMode");
          sessionStorage.removeItem("teacherFormId");
          sessionStorage.setItem('teacherJustAdded','1');
          onClose(true);
          if (navigateBack) navigate(-1);
        })
        .catch((err) => {
          console.error(err);
          // Offline/local fallback for update
          const updated = { _id: selectedTeacherId || Date.now().toString(), ...teacherData, _ui: true };
          const list = JSON.parse(localStorage.getItem("ui_teachers") || "[]");
          const idx = list.findIndex((t) => t._id === updated._id);
          if (idx >= 0) list[idx] = updated; else list.push(updated);
          localStorage.setItem("ui_teachers", JSON.stringify(list));
          alert("Teacher updated locally. Backend unavailable.");
          sessionStorage.removeItem("teacherFormMode");
          sessionStorage.removeItem("teacherFormId");
          sessionStorage.setItem('teacherJustAdded','1');
          onClose(true);
        });
    } else {
      axios
        .post("http://localhost:5000/api/admin/teachers", teacherData, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        })
        .then((resp) => {
          alert("Teacher added successfully!");
          const created = { ...(resp?.data?.teacher || { _id: Date.now().toString(), ...teacherData }), _ui: true };
          // sync fallback cache
          const list = JSON.parse(localStorage.getItem("ui_teachers") || "[]");
          list.push(created);
          localStorage.setItem("ui_teachers", JSON.stringify(list));
          // update local state and select new teacher for further edits if needed
          setTeachers((prev) => [...prev, created]);
          setSelectedTeacherId(created._id);
          setMode("edit");
          setTeacherData({
            name: created.name || "",
            email: created.email || "",
            mobileNumber: created.mobileNumber || "",
            subject: created.subject || "",
            dob: created.dob ? String(created.dob).substr(0, 10) : "",
            gender: created.gender || "",
            fatherName: created.fatherName || "",
            motherName: created.motherName || "",
            education: created.education || "",
            experience: created.experience || "",
            monthlySalary: created.monthlySalary || "",
            bloodGroup: created.bloodGroup || "",
            address: created.address || "",
          });
          sessionStorage.removeItem("teacherFormMode");
          sessionStorage.removeItem("teacherFormId");
          sessionStorage.setItem('teacherJustAdded','1');
          onClose(true);
        })
        .catch((err) => {
          console.error(err);
          // Offline/local fallback for create
          const created = { _id: Date.now().toString(), ...teacherData, _ui: true };
          const list = JSON.parse(localStorage.getItem("ui_teachers") || "[]");
          list.push(created);
          localStorage.setItem("ui_teachers", JSON.stringify(list));
          alert("Teacher added locally. Backend unavailable.");
          sessionStorage.removeItem("teacherFormMode");
          sessionStorage.removeItem("teacherFormId");
          sessionStorage.setItem('teacherJustAdded','1');
          onClose(true);
        });
    }
  };

  // (duplicate removed)

  return (
    <Container fluid className="p-4 bg-light min-vh-100">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div className="page-chip">Teachers - Add Teacher</div>
      </div>

      <div className="employee-form-container p-4">
        <h5 className="form-section-header">Basic Information</h5>
        <hr className="form-hr" />

        <Row className="g-3 mb-4">
          <Col md={4}>
            <label className="field-label required">Select Teacher</label>
            <Form.Select
              value={selectedTeacherId}
              onChange={handleSelect}
              className="custom-input"
            >
              <option value="">Select Teacher</option>
              {teachers.map((t) => (
                <option key={t._id} value={t._id}>
                  {t.name}
                </option>
              ))}
            </Form.Select>
          </Col>

          <Col md={4}>
            <label className="field-label required">Email</label>
            <Form.Control
              type="email"
              className="custom-input"
              value={teacherData.email || ""}
              readOnly={mode === "view"}
            />
          </Col>

          <Col md={4}>
            <label className="field-label required">Mobile Number</label>
            <Form.Control
              type="text"
              className="custom-input"
              value={teacherData.mobileNumber || ""}
              onChange={(e) =>
                setTeacherData({ ...teacherData, mobileNumber: e.target.value })
              }
              readOnly={mode === "view"}
            />
          </Col>

          <Col md={4}>
            <label className="field-label required">Subject</label>
            <Form.Control
              type="text"
              className="custom-input"
              value={teacherData.subject || ""}
              onChange={(e) =>
                setTeacherData({ ...teacherData, subject: e.target.value })
              }
              readOnly={mode === "view"}
            />
          </Col>

          <Col md={4}>
            <label className="field-label required">Date of Birth</label>
            <Form.Control
              type="date"
              className="custom-input"
              value={teacherData.dob || ""}
              onChange={(e) =>
                setTeacherData({ ...teacherData, dob: e.target.value })
              }
              readOnly={mode === "view"}
            />
          </Col>

          <Col md={4}>
            <label className="field-label optional">Gender</label>
            <Form.Control
              type="text"
              className="custom-input"
              value={teacherData.gender || ""}
              onChange={(e) =>
                setTeacherData({ ...teacherData, gender: e.target.value })
              }
              readOnly={mode === "view"}
            />
          </Col>
        </Row>

        <h5 className="form-section-header">Other Information</h5>
        <hr className="form-hr" />

        <Row className="g-3 mb-4">
          <Col md={6}>
            <label className="field-label optional">Father Name</label>
            <Form.Control
              type="text"
              className="custom-input"
              value={teacherData.fatherName || ""}
              onChange={(e) =>
                setTeacherData({ ...teacherData, fatherName: e.target.value })
              }
              readOnly={mode === "view"}
            />
          </Col>

          <Col md={6}>
            <label className="field-label optional">Mother Name</label>
            <Form.Control
              type="text"
              className="custom-input"
              value={teacherData.motherName || ""}
              onChange={(e) =>
                setTeacherData({ ...teacherData, motherName: e.target.value })
              }
              readOnly={mode === "view"}
            />
          </Col>

          <Col md={6}>
            <label className="field-label optional">Education</label>
            <Form.Control
              type="text"
              className="custom-input"
              value={teacherData.education || ""}
              onChange={(e) =>
                setTeacherData({ ...teacherData, education: e.target.value })
              }
              readOnly={mode === "view"}
            />
          </Col>

          <Col md={6}>
            <label className="field-label optional">Experience (years)</label>
            <Form.Control
              type="number"
              className="custom-input"
              value={teacherData.experience || ""}
              onChange={(e) =>
                setTeacherData({ ...teacherData, experience: e.target.value })
              }
              readOnly={mode === "view"}
            />
          </Col>

          <Col md={6}>
            <label className="field-label optional">Monthly Salary</label>
            <Form.Control
              type="number"
              className="custom-input"
              value={teacherData.monthlySalary || ""}
              onChange={(e) =>
                setTeacherData({ ...teacherData, monthlySalary: e.target.value })
              }
              readOnly={mode === "view"}
            />
          </Col>

          <Col md={6}>
            <label className="field-label optional">Blood Group</label>
            <Form.Control
              type="text"
              className="custom-input"
              value={teacherData.bloodGroup || ""}
              onChange={(e) =>
                setTeacherData({ ...teacherData, bloodGroup: e.target.value })
              }
              readOnly={mode === "view"}
            />
          </Col>

          <Col xs={12}>
            <label className="field-label optional">Address</label>
            <Form.Control
              as="textarea"
              rows={3}
              className="custom-input-textarea"
              value={teacherData.address || ""}
              onChange={(e) =>
                setTeacherData({ ...teacherData, address: e.target.value })
              }
              readOnly={mode === "view"}
            />
          </Col>
        </Row>

        <div className="d-flex justify-content-end gap-3 mt-4">
          <Button
            variant="warning"
            className="rounded-pill px-4 fw-medium text-dark"
            onClick={() => { sessionStorage.removeItem("teacherFormMode"); sessionStorage.removeItem("teacherFormId"); window.location.reload(); }}
          >
            Reset
          </Button>
          {mode !== "view" && (
          <Button
            variant="info"
            className="rounded-pill px-4 fw-medium text-white"
            onClick={handleSubmit}
          >
            Submit
          </Button>
          )}
        </div>
      </div>
      {preview && (
        <div className="mt-4">
          <h6 className="mb-3">Preview</h6>
          <Card className="shadow-sm border-0 text-center" style={{ maxWidth: 320 }}>
            <Card.Body className="d-flex flex-column align-items-center">
              <img src={empIcon} alt="teacher" className="img-fluid mb-3" style={{ maxWidth: "120px" }} />
              <h6 className="fw-semibold mb-1">{preview.name}</h6>
              <p className="text-muted mb-3">{preview.subject}</p>
              <div className="d-flex justify-content-center gap-2">
                <Button variant="outline-secondary" size="sm" className="px-3">View</Button>
                <Button variant="outline-primary" size="sm" className="px-3">Edit</Button>
                <Button variant="outline-warning" size="sm" className="px-3 text-dark">Delete</Button>
              </div>
            </Card.Body>
          </Card>
        </div>
      )}
    </Container>
  );
};

export default AddTeacher;
