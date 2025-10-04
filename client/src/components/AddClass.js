import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AddClassPage.css"; // keep your custom styles

function AddClassPage() {
  const [teachers, setTeachers] = useState([]);
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedTeacher, setSelectedTeacher] = useState("");

  // Fetch teachers from backend
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/admin/teachers", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((res) => setTeachers(res.data))
      .catch((err) => console.error(err));
  }, []);

  const classOptions = [
    "6A", "6B", "6C",
    "7A", "7B", "7C",
    "8A", "8B", "8C",
    "9A", "9B", "9C",
    "10A", "10B", "10C"
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Class ${selectedClass} assigned to ${selectedTeacher}`);
    // axios POST request to add class can be done here
  };

  return (
    <div className="add-class-wrapper">
      {/* top ribbon */}
      <div className="page-chip ms-4 mt-3">Classes  -  Add New Classes</div>

      {/* form card */}
      <div className="d-flex justify-content-center align-items-center py-4">
        <div className="card shadow-sm p-4 custom-card">
          <h5 className="text-center mb-4 fw-bold">Add New Class</h5>

          <form onSubmit={handleSubmit}>
            {/* Class Name Dropdown */}
            <div className="form-group mb-4 position-relative">
              <span className="custom-label">Class Name</span>
              <select
                className="form-select rounded-pill border-danger text-center"
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
              >
                <option value="">Select Class</option>
                {classOptions.map((cls) => (
                  <option key={cls} value={cls}>
                    {cls}
                  </option>
                ))}
              </select>
            </div>

            {/* Teacher Dropdown */}
            <div className="form-group mb-4 position-relative">
              <span className="custom-label">Select Class Teacher</span>
              <select
                className="form-select rounded-pill border-danger text-center"
                value={selectedTeacher}
                onChange={(e) => setSelectedTeacher(e.target.value)}
              >
                <option value="">Select Teacher</option>
                {teachers.map((t) => (
                  <option key={t._id} value={t.name}>
                    {t.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Submit */}
            <div className="text-center">
              <button type="submit" className="btn custom-submit rounded-pill">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddClassPage;
