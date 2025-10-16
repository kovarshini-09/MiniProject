import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Card } from "react-bootstrap";
import axios from "axios";

// Initial marks table
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

  // Fetch all students
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5000/api/students", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setStudents(res.data); // all students
      } catch (err) {
        console.error("Failed to fetch students:", err);
      }
    };
    fetchStudents();
  }, []);

  const handleMarksChange = (index, field, value) => {
    const newMarks = [...marks];
    if (field === "marks") {
      const numValue = parseInt(value, 10);
      if (!isNaN(numValue) && numValue >= 0 && numValue <= 100) {
        newMarks[index][field] = numValue;
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
      alert("Please select a student and a class before submitting.");
      return;
    }
    const token = localStorage.getItem("token");
    const subjMarks = marks.reduce((acc, m) => ({ ...acc, [m.subject]: Number(m.marks) || 0 }), {});
    const studentObj = students.find((s) => s._id === selectedStudent);
    try {
      await axios.post(
        "http://localhost:5000/api/results",
        { studentId: selectedStudent, exam: "Term", marks: subjMarks },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Marks submitted!");
    } catch (err) {
      console.error("Submit marks failed", err);
      alert("Failed to submit marks");
    }
  };

  const handleCancel = () => {
    setMarks(initialMarksData.map((m) => ({ ...m, marks: "", grade: "" })));
    setSelectedStudent("");
    setSelectedClass("");
  };

  return (
    <Card className="shadow-sm border rounded p-5">
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

      {/* Marks Table (original restored) */}
      <div className="row">
        <div className="col-md-12">
          <div className="table-responsive">
            <table className="table table-bordered text-center small-text">
              <thead className="table-light">
                <tr>
                  <th scope="col" className="fw-bold">
                    Subject
                  </th>
                  <th scope="col" className="fw-bold">
                    Marks (Max 100)
                  </th>
                  <th scope="col" className="fw-bold">
                    Grade
                  </th>
                </tr>
              </thead>
              <tbody>
                {marks.map((item, index) => (
                  <tr key={index}>
                    <td className="fw-semibold">{item.subject}</td>
                    <td>
                      <input
                        type="number"
                        className="form-control form-control-sm text-center border-0 p-0 small-text"
                        value={item.marks}
                        onChange={(e) =>
                          handleMarksChange(index, "marks", e.target.value)
                        }
                        min="0"
                        max="100"
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        className="form-control form-control-sm text-center border-0 p-0 small-text"
                        value={item.grade}
                        onChange={(e) =>
                          handleMarksChange(
                            index,
                            "grade",
                            e.target.value.toUpperCase()
                          )
                        }
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

          {/* Buttons */}
          <div className="text-end mt-4">
            <button
              className="btn btn-outline-danger me-2"
              onClick={handleCancel}
            >
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
