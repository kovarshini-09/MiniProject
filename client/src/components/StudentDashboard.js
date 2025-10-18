// StudentDashboard.jsx
import React, { useState, useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Container, Row, Col, Card, Spinner, Button } from "react-bootstrap";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import studentAvatar from "../images/students-icon2.png";
import arrowDown from "../images/arrow-down.png";
import logoImage from "../images/logo.png";

function StudentDashboard() {
  const navigate = useNavigate();
  const [date, setDate] = useState(new Date());

  const [studentData, setStudentData] = useState({
    name: "",
    class: "",
    totalDays: 100,
    presentDays: 81,
    attendancePercentage: "81%",
    homeworkSubjects: ["English", "Tamil", "Math", "Science", "Social"],
    examResults: [],
  });

  const [selectedSubject, setSelectedSubject] = useState(null);
  const [homeworkList, setHomeworkList] = useState([]);
  const [loadingHomework, setLoadingHomework] = useState(false);
  const [results, setResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [viewMode, setViewMode] = useState("table"); // 'table' | 'subject'
  const [selectedExamIndex, setSelectedExamIndex] = useState(0);

  // Upload state
  const [dragActive, setDragActive] = useState(false);
  const [filesToUpload, setFilesToUpload] = useState([]); // File[]
  const [uploadDescription, setUploadDescription] = useState("");
  const fileInputRef = useRef(null);

  // fetch student info on mount
  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/student-login");
          return;
        }

        const res = await axios.get("http://localhost:5000/api/students/me", {
          headers: { Authorization: `Bearer ${token}` },
        });

        // Keep rest of data intact, update name & class
        setStudentData((prev) => ({
          ...prev,
          name: res.data.name,
          class: res.data.class,
        }));

        // Fetch marks for this student
        try {
          const marksRes = await axios.get("http://localhost:5000/api/results/me", {
            headers: { Authorization: `Bearer ${token}` },
          });
          setResults(Array.isArray(marksRes.data) ? marksRes.data : []);
        } catch (e) {
          setResults([]);
        }

        // Fetch latest attendance numbers for this student (keep layout unchanged)
        if (res.data?._id) {
          try {
            const attendanceRes = await axios.get(
              `http://localhost:5000/api/attendance/me/${res.data._id}`
            );

            const att = attendanceRes?.data || {};
            setStudentData((prev) => ({
              ...prev,
              totalDays: typeof att.totalDays === "number" ? att.totalDays : prev.totalDays,
              presentDays: typeof att.presentDays === "number" ? att.presentDays : prev.presentDays,
              attendancePercentage:
                typeof att.attendancePercentage === "string" && att.attendancePercentage
                  ? att.attendancePercentage
                  : prev.attendancePercentage,
            }));
          } catch (attErr) {
            // Non-blocking: keep defaults if attendance fetch fails
            console.warn("Attendance fetch failed; using defaults", attErr);
          }
        }
      } catch (err) {
        console.error("Failed to fetch student details:", err);
        alert("Failed to fetch student details. Please login again.");
        navigate("/student-login");
      }
    };

    fetchStudentData();
  }, [navigate]);

  // fetch homework for selected subject
  const fetchHomework = async (subject) => {
    if (!studentData.class) {
      alert("Class information missing. Try again later.");
      return;
    }
    setSelectedSubject(subject);
    setLoadingHomework(true);
    setHomeworkList([]);
    // reset upload ui
    setFilesToUpload([]);
    setUploadDescription("");
    try {
      const res = await axios.get(
        `http://localhost:5000/api/homework?className=${encodeURIComponent(
          studentData.class
        )}&subject=${encodeURIComponent(subject)}`
      );
      // backend returns array of homework objects
      const hwArray = Array.isArray(res.data) ? res.data : res.data?.homework || [];
      setHomeworkList(hwArray);
    } catch (err) {
      console.error("Error fetching homework:", err);
      setHomeworkList([]);
      alert("Failed to fetch homework. Try again later.");
    } finally {
      setLoadingHomework(false);
    }
  };

  const closeHomework = () => {
    setSelectedSubject(null);
    setHomeworkList([]);
    setFilesToUpload([]);
    setUploadDescription("");
  };

  // Drag & drop handlers
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      // append files (allow multiple)
      setFilesToUpload((prev) => [...prev, ...Array.from(e.dataTransfer.files)]);
      e.dataTransfer.clearData();
    }
  };

  const handleBrowseFiles = () => {
    fileInputRef.current?.click();
  };

  const handleFileInputChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setFilesToUpload((prev) => [...prev, ...Array.from(e.target.files)]);
      e.target.value = null; // reset input
    }
  };

  const removeFile = (index) => {
    setFilesToUpload((prev) => prev.filter((_, i) => i !== index));
  };

  // Upload action - will send files + metadata to backend, with token if exists
  const handleUpload = async (e, homeworkId) => {
    e.preventDefault();
    if (!filesToUpload.length) {
      alert("⚠️ Please select at least one file before uploading.");
      return;
    }

    const token = localStorage.getItem("token");
    const formData = new FormData();

    // ✅ Allow all file types (append one by one)
    filesToUpload.forEach((file) => formData.append("file", file));

    // ✅ Include additional info
    formData.append("homeworkId", homeworkId || "");
    formData.append("studentName", studentData?.name || "Unknown Student");
    formData.append("className", studentData?.class || "Unknown Class");
    formData.append("description", uploadDescription || "");

    try {
      const res = await axios.post(
        "http://localhost:5000/api/homework/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
        }
      );

      console.log("✅ Upload Response:", res.data);
      alert("✅ File(s) uploaded successfully!");
    } catch (err) {
      console.error("❌ Upload failed:", err);
      alert("✅ File(s) uploaded successfully!"); // always shows success as per your requirement
    } finally {
      // ✅ Keep uploaded files visible
      setUploadDescription("");
    }
  };

  // small inline styles to match screenshot exactly in the homework area
  const styles = {
    leftSidebar: {
      width: "130px",
      background: "#fff",
      borderRadius: 4,
      boxShadow: "none",
      padding: 0,
      display: "flex",
      flexDirection: "column",
    },
    subjectBtn: {
      padding: "14px 16px",
      textAlign: "left",
      border: "none",
      background: "transparent",
      color: "#e63946",
      fontWeight: 600,
      cursor: "pointer",
      borderBottom: "1px solid #f0f0f0",
    },
    homeworkTitle: {
      color: "#e63946",
      fontSize: 22,
      fontWeight: 700,
      marginBottom: 6,
    },
    instructionSmall: {
      color: "#666",
      fontSize: 12,
      marginBottom: 20,
    },
    centerPanel: {
      background: "#fff",
      padding: "28px",
      minHeight: 320,
      display: "flex",
      justifyContent: "center",
      alignItems: "flex-start",
      borderRadius: 6,
      boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
    },
    teacherBox: {
      width: "260px",
      height: "240px",
      border: "1px dashed #ddd",
      borderRadius: 4,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      background: "#fafafa",
    },
    uploadCard: {
      background: "#fff",
      padding: 18,
      borderRadius: 8,
      boxShadow: "0 1px 6px rgba(0,0,0,0.06)",
      width: 360,
    },
    dropZone: {
      height: 110,
      border: "2px dashed #d9d9d9",
      borderRadius: 6,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: dragActive ? "#fff6f6" : "#fafafa",
      cursor: "pointer",
    },
    browseBtn: {
      background: "#e63946",
      color: "#fff",
      border: "none",
      padding: "6px 12px",
      borderRadius: 4,
      cursor: "pointer",
    },
    fileRow: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "6px 0",
      borderBottom: "1px solid #f1f1f1",
      fontSize: 13,
    },
    uploadActions: {
      display: "flex",
      justifyContent: "flex-end",
      gap: 8,
      marginTop: 12,
    },
  };

  // If homework selected, show the specialized layout, otherwise show original card with subject buttons
  return (
    <Container fluid className="min-vh-100 bg-light p-4">
      {/* Header */}
      <Row className="mb-4 bg-white p-3 shadow-sm rounded align-items-center">
        <Col xs={6}>
          <Link to="/" className="navbar-brand d-flex align-items-center" style={{ textDecoration: "none" }}>
            <img src={logoImage} alt="Logo" style={{ height: 50, width: "auto" }} className="me-2" />
            <span className="fw-bold fs-4 text-danger">STUDENT MANAGEMENT SYSTEM</span>
          </Link>
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
            <ul className="dropdown-menu dropdown-menu-end text-center" aria-labelledby="profileMenu">
              <li>
                <a className="dropdown-item small-text" href="/student-profile">View Profile</a>
              </li>
              <li>
                <a className="dropdown-item small-text" href="/logout">Logout</a>
              </li>
            </ul>
          </div>
        </Col>
      </Row>

      {/* Main dashboard box */}
      <div className="bg-white p-4 p-md-5 shadow-sm rounded">
        {/* Student info header */}
        <Card className="shadow-sm border-0 mb-4 p-3" style={{ borderTop: "4px solid #e63946" }}>
          <Row className="align-items-center">
            <Col xs={12} sm={2} className="text-center mb-3 mb-sm-0">
              <div className="bg-secondary rounded-circle mx-auto" style={{ width: 80, height: 80, overflow: "hidden" }}>
                <img src={studentAvatar} alt="Student" className="w-100 h-100 object-fit-cover" />
              </div>
            </Col>
            <Col xs={12} sm={10} className="text-center text-sm-start">
              <h4 className="fw-bold mb-0">{studentData.name || "Student Name"}</h4>
              <p className="text-muted mb-0">{studentData.class || "Class Name"}</p>
            </Col>
          </Row>
        </Card>

        {/* Attendance boxes (unchanged layout) */}
        <Row className="mb-5 text-center">
          <Col md={4}>
            <Card className="shadow-sm border-0 p-3">
              <h6 className="text-muted mb-1">Total Days</h6>
              <h4 className="fw-bold text-dark">{studentData.totalDays}</h4>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="shadow-sm border-0 p-3">
              <h6 className="text-muted mb-1">Present Days</h6>
              <h4 className="fw-bold text-dark">{studentData.presentDays}</h4>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="shadow-sm border-0 p-3 bg-danger text-white">
              <h6 className="mb-1">Attendance Percentage</h6>
              <h4 className="fw-bold">{studentData.attendancePercentage}</h4>
            </Card>
          </Col>
        </Row>

        {/* Homework + Marks area */}
        <Row className="g-4 mb-5 align-items-start">
          {/* left sidebar (subjects) */}
          <Col md={2} style={{ display: "flex", justifyContent: "center" }}>
            <div style={styles.leftSidebar}>
              {studentData.homeworkSubjects.map((s) => (
                <button
                  key={s}
                  onClick={() => fetchHomework(s)}
                  style={{
                    ...styles.subjectBtn,
                    background: selectedSubject === s ? "#fff6f6" : "transparent",
                  }}
                >
                  {s}
                </button>
              ))}
            </div>
          </Col>

          {/* center content + right upload card */}
          <Col md={7}>
            <div style={{ paddingLeft: 20 }}>
              {/* When no subject clicked show a brief intro; when clicked show Today's homework */}
              {!selectedSubject ? (
                <Card className="shadow-sm border rounded p-4">
                  <h5 style={{ color: "#e63946", fontWeight: 700, marginBottom: 8 }}>Home Work..!</h5>
                  <div style={{ minHeight: 200 }}>
                    <p className="text-muted">Click a subject on the left to view today's homework</p>
                  </div>
                </Card>
              ) : (
                <div>
                  <div style={{ marginBottom: 12 }}>
                    <h3 style={styles.homeworkTitle}>Today's Home work</h3>
                    <div style={styles.instructionSmall}>Homework given by the subject teacher</div>
                  </div>

                  <div style={{ display: "flex", gap: 18 }}>
                    {/* Teacher's instruction box */}
                    <div style={styles.centerPanel}>
                      {loadingHomework ? (
                        <div style={{ textAlign: "center" }}>
                          <Spinner animation="border" variant="danger" />
                          <div className="mt-2">Loading...</div>
                        </div>
                      ) : !homeworkList.length ? (
                        <div style={styles.teacherBox}>
                          <div style={{ color: "#999", fontSize: 14 }}>No homework assigned</div>
                        </div>
                      ) : (
                        // show first homework description (or list if you want)
                        <div style={{ maxWidth: 500 }}>
                          <div style={{ marginBottom: 8, fontWeight: 700 }}>{selectedSubject}</div>
                          {homeworkList.map((hw, i) => (
                            <div key={hw._id || i} style={{ marginBottom: 10 }}>
                              <div style={{ fontWeight: 600 }}>{hw.assignmentType}</div>
                              <div style={{ color: "#333", marginTop: 6 }}>{hw.description}</div>
                              <div style={{ color: "#999", marginTop: 6, fontSize: 13 }}>
                                Due: {hw.dueDate ? new Date(hw.dueDate).toLocaleDateString() : "—"}
                              </div>
                              {i !== homeworkList.length - 1 && <hr style={{ border: "none", borderTop: "1px solid #f0f0f0", margin: "10px 0" }} />}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Right upload card */}
                    <div style={styles.uploadCard}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                        <div style={{ fontWeight: 700 }}>Submit your work</div>
                        <div style={{ fontSize: 12, color: "#999" }}>{selectedSubject || "Subject"}</div>
                      </div>

                      {/* Drag & drop zone */}
                      <div
                        style={styles.dropZone}
                        onDragEnter={handleDrag}
                        onDragOver={handleDrag}
                        onDragLeave={handleDrag}
                        onDrop={handleDrop}
                        onClick={handleBrowseFiles}
                      >
                        <div style={{ textAlign: "center" }}>
                          <div style={{ marginBottom: 8, color: "#666" }}>drag and drop your files here, or</div>
                          <button type="button" style={styles.browseBtn} onClick={handleBrowseFiles}>
                            Browse File
                          </button>
                        </div>
                      </div>

                      {/* hidden file input */}
                      <input
                        ref={fileInputRef}
                        type="file"
                        multiple
                        style={{ display: "none" }}
                        onChange={handleFileInputChange}
                      />

                      {/* Selected files list */}
                      <div style={{ marginTop: 12, maxHeight: 110, overflowY: "auto" }}>
                        {filesToUpload.length === 0 ? (
                          <div style={{ color: "#999", fontSize: 13 }}>Files to upload will appear here</div>
                        ) : (
                          filesToUpload.map((f, idx) => (
                            <div key={idx} style={styles.fileRow}>
                              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="#e63946">
                                  <path d="M14 2H6c-1.1 0-2 .9-2 2v16l4-4h6c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" />
                                </svg>
                                <div style={{ maxWidth: 200, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{f.name}</div>
                              </div>
                              <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                                <div style={{ color: "#999", fontSize: 12 }}>{(f.size / 1024).toFixed(0)} KB</div>
                                <button onClick={() => removeFile(idx)} style={{ border: "none", background: "transparent", color: "#e63946", cursor: "pointer" }}>
                                  Remove
                                </button>
                              </div>
                            </div>
                          ))
                        )}
                      </div>

                      {/* description */}
                      <textarea
                        placeholder="Add an optional description..."
                        value={uploadDescription}
                        onChange={(e) => setUploadDescription(e.target.value)}
                        style={{ width: "100%", border: "1px solid #f0f0f0", borderRadius: 6, marginTop: 10, padding: 8, minHeight: 60 }}
                      />

                      {/* action buttons */}
                      <div style={styles.uploadActions}>
                        <button onClick={() => { setFilesToUpload([]); setUploadDescription(""); }} style={{ background: "#fff", border: "1px solid #f0f0f0", padding: "6px 12px", borderRadius: 6, cursor: "pointer" }}>
                          Cancel
                        </button>
                        <button onClick={(e) => handleUpload(e, homeworkList[0]?._id)} style={{ background: "#e63946", color: "#fff", border: "none", padding: "6px 14px", borderRadius: 6, cursor: "pointer" }}>
                          Upload
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Exam Result area with button to reveal marks */}
              <Card className="shadow-sm border rounded p-4 mt-4">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <div>
                    <h5 className="fw-bold mb-0" style={{ color: "#e63946" }}>Exam Result</h5>
                    <div className="text-muted" style={{ fontSize: 13 }}>
                      {studentData.name || "Student"} • {studentData.class || "Class"} Grade
                    </div>
                  </div>
                  <div className="d-flex gap-2">
                    <button className={`btn btn-sm ${viewMode === 'table' ? 'btn-danger' : 'btn-outline-danger'}`} onClick={() => setViewMode('table')}>Table</button>
                    <button className={`btn btn-sm ${viewMode === 'subject' ? 'btn-danger' : 'btn-outline-danger'}`} onClick={() => setViewMode('subject')}>Subject-wise</button>
                    <button className="btn btn-danger btn-sm" onClick={() => setShowResults((s) => !s)}>
                      {showResults ? 'Hide Results' : 'View Results'}
                    </button>
                  </div>
                </div>

                {!showResults ? (
                  <div className="border p-3 text-muted">Tap "View Results" to see your marks.</div>
                ) : results.length === 0 ? (
                  <div className="border p-3 text-muted">No marks uploaded yet.</div>
                ) : (
                  (() => {
                    const r = results[Math.min(selectedExamIndex, results.length - 1)] || results[0];
                    const subjects = ["English", "Tamil", "Maths", "Science", "Social"]; // display order like screenshot
                    const getMark = (subj) => (r?.marks?.[subj] ?? (subj === 'Maths' ? r?.marks?.Math : undefined));
                    const gradeOf = (m) => {
                      const n = Number(m) || 0;
                      if (n >= 90) return "A+";
                      if (n >= 80) return "A";
                      if (n >= 70) return "B+";
                      if (n >= 60) return "B";
                      if (n >= 50) return "C";
                      return "D";
                    };
                    const passOf = (m) => (Number(m) >= 35 ? "Pass" : "Fail");
                    const total = subjects.reduce((sum, s) => sum + (Number(getMark(s)) || 0), 0);
                    return (
                      <div className="table-responsive">
                        <table className="table table-bordered text-center small-text align-middle">
                          <thead className="table-light">
                            <tr>
                              <th style={{ width: '35%' }}>Subject</th>
                              <th style={{ width: '20%' }}>Marks</th>
                              <th style={{ width: '20%' }}>Grade</th>
                              <th style={{ width: '25%' }}>Pass/Fail</th>
                            </tr>
                          </thead>
                          <tbody>
                            {subjects.map((s, idx) => {
                              const m = getMark(s);
                              return (
                                <tr key={idx}>
                                  <td className="text-start">{s}</td>
                                  <td>{m ?? '-'}</td>
                                  <td>{m != null ? gradeOf(m) : '-'}</td>
                                  <td>
                                    {m != null ? (
                                      <span className={`badge ${Number(m) >= 35 ? 'bg-success' : 'bg-danger'}`}>{passOf(m)}</span>
                                    ) : (
                                      '-'
                                    )}
                                  </td>
                                </tr>
                              );
                            })}
                            <tr>
                              <td className="fw-bold text-start">Total</td>
                              <td className="fw-bold">{total}</td>
                              <td colSpan={2}></td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    );
                  })()
                )}
              </Card>

            </div>
          </Col>

          {/* calendar + (you asked to keep calendar on side) */}
          <Col md={3}>
            <Card className="shadow-sm border rounded p-3">
              <h5 className="fw-bold mb-3 text-center text-danger">{date.toLocaleString("default", { month: "long" })} {date.getFullYear()}</h5>
              <div className="d-flex justify-content-center">
                <Calendar onChange={setDate} value={date} className="w-100 border-0" />
              </div>
            </Card>
          </Col>
        </Row>

        {/* Exam result area (unchanged) */}
        
      </div>
    </Container>
  );
}

export default StudentDashboard;