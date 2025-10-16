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
    "9A", "9B", "9C",
    "10A", "10B", "10C"
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedClass || !selectedTeacher) {
      alert("Please select class and teacher");
      return;
    }
    axios
      .post(
        "http://localhost:5000/api/classes",
        {
          classId: selectedClass,
          classTeacher: selectedTeacher,
          students: [],
          subjects: ["English", "Tamil", "Math", "Science", "Social"],
        },
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      )
      .then((resp) => {
        alert(`Class ${selectedClass} assigned to ${selectedTeacher}`);
        const created = resp?.data || { classId: selectedClass, classTeacher: selectedTeacher };
        const list = JSON.parse(localStorage.getItem("ui_classes") || "[]");
        list.push(created);
        localStorage.setItem("ui_classes", JSON.stringify(list));

        // Update local teacher cache: ensure only one class teacher per class
        const uiTeachers = JSON.parse(localStorage.getItem("ui_teachers") || "[]");
        const classId = selectedClass;
        // Clear previous teacher assignment for this class
        uiTeachers.forEach((t) => {
          const cls = (t.assignedClass || t.class || "").toString();
          if (cls.toLowerCase().replace(/\s+grade\s*$/i, "") === classId.toLowerCase()) {
            t.assignedClass = "";
          }
        });
        // Set assignment on the selected teacher
        const picked = uiTeachers.find((t) => t._id === selectedTeacher);
        if (picked) {
          picked.assignedClass = selectedClass; // e.g., "9A" or "10C"
        }
        localStorage.setItem("ui_teachers", JSON.stringify(uiTeachers));
      })
      .catch((err) => {
  console.error(err);

  // Detect duplicate error
  if (err.response && err.response.status === 400) {
    alert(`Class ${selectedClass} already exists in the database — showing locally.`);
  } else {
    alert("Failed to add class");
  }

  // Still add card locally for UI consistency
  const list = JSON.parse(localStorage.getItem("ui_classes") || "[]");

  // Only add if not already in ui_classes
  const exists = list.some((c) => (c.classId || c.className) === selectedClass);
  if (!exists) {
    list.push({
      classId: selectedClass,
      classTeacher: selectedTeacher,
      students: [],
      subjects: ["English", "Tamil", "Math", "Science", "Social"],
    });
    localStorage.setItem("ui_classes", JSON.stringify(list));
  }

  // Update local teacher cache as usual
  const uiTeachers = JSON.parse(localStorage.getItem("ui_teachers") || "[]");
  const classId = selectedClass;
  uiTeachers.forEach((t) => {
    const cls = (t.assignedClass || t.class || "").toString();
    if (cls.toLowerCase().replace(/\s+grade\s*$/i, "") === classId.toLowerCase()) {
      t.assignedClass = "";
    }
  });
  const picked = uiTeachers.find((t) => t._id === selectedTeacher);
  if (picked) {
    picked.assignedClass = selectedClass;
  }
  localStorage.setItem("ui_teachers", JSON.stringify(uiTeachers));
});

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
                  <option key={t._id} value={t._id}>{t.name}</option>
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
