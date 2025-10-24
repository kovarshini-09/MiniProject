import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Card } from "react-bootstrap";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const initialMarksData = [
  { subject: "Tamil", marks: "", grade: "" },
  { subject: "English", marks: "", grade: "" },
  { subject: "Maths", marks: "", grade: "" },
  { subject: "Science", marks: "", grade: "" },
  { subject: "Social", marks: "", grade: "" },
];

function EnterMarks() {
  const [marks, setMarks] = useState(initialMarksData);
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState("");
  const [selectedClass, setSelectedClass] = useState("");
  

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5000/api/students", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setStudents(res.data);
      } catch (err) {
        console.error("Failed to fetch students:", err);
        toast.error("Failed to fetch students", { theme: "colored" });
      }
    };
    fetchStudents();
  }, []);

  

  const gradeOf = (m) => {
    const n = Number(m) || 0;
    if (n === 100) return "O";
    if (n >= 90) return "A+";
    if (n >= 80) return "A";
    if (n >= 70) return "B+";
    if (n >= 60) return "B";
    if (n >= 50) return "C";
    return "D";
  };

  const handleMarksChange = (index, field, value) => {
    const newMarks = [...marks];
    if (field === "marks") {
      const numValue = parseInt(value, 10);
      if (!isNaN(numValue) && numValue >= 0 && numValue <= 100) {
        newMarks[index].marks = numValue;
        // Auto-calc grade when marks entered
        newMarks[index].grade = gradeOf(numValue);
      }
    } else {
      newMarks[index][field] = value;
    }
    setMarks(newMarks);
  };

  const calculateTotal = () =>
    marks.reduce((total, item) => total + (parseFloat(item.marks) || 0), 0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedStudent || !selectedClass) {
      toast.warning("⚠️ Please select both student and class before submitting.", { theme: "colored" });
      return;
    }

    const token = localStorage.getItem("token");
    const subjMarks = marks.reduce((acc, m) => ({ ...acc, [m.subject]: Number(m.marks) || 0 }), {});

    try {
      const res = await axios.post(
        "http://localhost:5000/api/results",
        { studentId: selectedStudent, exam: "Term", marks: subjMarks },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast.success(res.data.message || "Marks submitted successfully!", { theme: "colored" });
      // Clear only marks and grades; keep selected student and class
      setMarks(initialMarksData.map((m) => ({ ...m, marks: "", grade: "" })));
      // Keep student and class selections as-is
    } catch (err) {
      console.error("Submit marks failed", err);
      if (err.response?.data?.message) {
        toast.error(err.response.data.message, { theme: "colored" });
      } else {
        toast.error("Failed to submit marks. Try again.", { theme: "colored" });
      }
    }
  };

  const handleCancel = () => {
    setMarks(initialMarksData.map((m) => ({ ...m, marks: "", grade: "" })));
    setSelectedStudent("");
    setSelectedClass("");
  };

  return (
    <Card className="shadow-sm border rounded p-5">
      <ToastContainer position="top-right" autoClose={3000} />
      <h4 className="fw-bold mb-5" style={{ color: "#e63946" }}>
        Enter Marks
      </h4>

      {/* Dropdowns */}
      <div className="row mb-4">
        <div className="col-md-6 mb-3">
          <select
            className="form-select small-text"
            value={selectedStudent}
            onChange={(e) => setSelectedStudent(e.target.value)}
            style={{ border: "2px solid #e63946", maxWidth: "300px" }}
          >
            <option value="">Select Student</option>
            {students.map((stu) => (
              <option key={stu._id} value={stu._id}>
                {stu.name}
              </option>
            ))}
          </select>
        </div>

        <div className="col-md-6 text-md-end">
          <select
            className="form-select w-auto d-inline-block small-text"
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            style={{ border: "2px solid #e63946", borderRadius: "0px" }}
          >
            <option value="">Select Class</option>
            <option value="9A">Class 9A</option>
            <option value="9B">Class 9B</option>
            <option value="9C">Class 9C</option>
            <option value="10A">Class 10A</option>
            <option value="10B">Class 10B</option>
            <option value="10C">Class 10C</option>
          </select>
        </div>
      </div>

      {/* Marks Table */}
      <div className="row">
        <div className="col-md-12">
          <div className="table-responsive">
            <table className="table table-bordered text-center small-text">
              <thead className="table-light">
                <tr>
                  <th>Subject</th>
                  <th>Marks (Max 100)</th>
                  <th>Grade</th>
                </tr>
              </thead>
              <tbody>
                {marks.map((item, index) => (
                  <tr key={index}>
                    <td>{item.subject}</td>
                    <td>
                      <input
                        type="number"
                        className="form-control form-control-sm text-center border-0"
                        value={item.marks}
                        onChange={(e) => handleMarksChange(index, "marks", e.target.value)}
                        min="0"
                        max="100"
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        className="form-control form-control-sm text-center border-0"
                        value={item.grade}
                        onChange={(e) => handleMarksChange(index, "grade", e.target.value.toUpperCase())}
                        maxLength="2"
                      />
                    </td>
                  </tr>
                ))}
                <tr>
                  <td className="fw-bold">Total</td>
                  <td className="fw-bold">{calculateTotal()}</td>
                  <td></td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="text-end mt-4">
            <button className="btn btn-outline-danger me-2" onClick={handleCancel}>
              Cancel
            </button>
            <button className="btn btn-danger" onClick={handleSubmit}>
              Submit
            </button>
          </div>
        </div>
      </div>
    </Card>
  );
}

export default EnterMarks;

