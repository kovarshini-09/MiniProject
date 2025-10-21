import React, { useState, useEffect, forwardRef } from "react";
import DatePicker from "react-datepicker";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-datepicker/dist/react-datepicker.css";
import "./Attendance.css";

// ✅ Custom Date Input Component
const CustomDateInput = forwardRef(({ value, onClick, placeholder }, ref) => (
  <div className="input-icon-wrapper">
    <input
      type="text"
      className="red-box custom-date-input"
      onClick={onClick}
      ref={ref}
      value={value || ""}
      placeholder={placeholder || "dd-mm-yyyy"}
      readOnly
    />
    <i className="bi bi-calendar3 calendar-icon" onClick={onClick} />
  </div>
));

function Attendance() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedClass, setSelectedClass] = useState("");
  const [students, setStudents] = useState([]);
  const [absent, setAbsent] = useState({}); // { studentId: boolean }

  // ✅ On load, fetch only this teacher's students and class
  useEffect(() => {
    const fetchMyStudents = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5000/api/teachers/students", {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        });
        const payload = res.data || {};
        setSelectedClass(payload.classId || "");
        const list = Array.isArray(payload.students) ? payload.students : [];
        setStudents(list);
        const initial = {};
        list.forEach((s) => (initial[s._id || s.id || s.regNo] = false));
        setAbsent(initial);
      } catch (err) {
        console.error("Failed to fetch teacher students", err);
        toast.error("Unable to load your class students", { theme: "colored" });
      }
    };
    fetchMyStudents();
  }, []);

  // ✅ Handle Attendance Submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedDate || !selectedClass) {
      toast.warning("⚠️ Please select both date and class.", { theme: "colored" });
      return;
    }

    try {
      // ✅ Send to attendance update API with auth; backend expects { class, date }
      const token = localStorage.getItem("token");
      const absentIds = Object.entries(absent)
        .filter(([, isAbsent]) => !!isAbsent)
        .map(([id]) => id);

      const res = await axios.post(
        "http://localhost:5000/api/attendance/update",
        {
          class: selectedClass,
          date: selectedDate,
          absentIds,
        },
        {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        }
      );

      toast.success(res.data.message || "Attendance submitted successfully!", {
        theme: "colored",
      });

      // Reset form
      setSelectedDate(null);
      // keep selectedClass; just clear selections
      setAbsent((prev) => {
        const cleared = { ...prev };
        Object.keys(cleared).forEach((k) => (cleared[k] = false));
        return cleared;
      });
    } catch (err) {
      console.error("❌ Attendance submit error:", err);
      toast.error(
        err.response?.data?.message || "Failed to submit attendance. Please try again.",
        { theme: "colored" }
      );
    }
  };

  return (
    <div className="add-class-wrapper">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="form-container">
        <div className="custom-card">
          <h5 className="form-title">Add / Update Attendance</h5>

          <form onSubmit={handleSubmit}>
            {/* ✅ Date Picker */}
            <div className="form-group">
              <span className="custom-label">Date</span>
              <DatePicker
                selected={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                dateFormat="dd-MM-yyyy"
                placeholderText="dd-mm-yyyy"
                customInput={<CustomDateInput />}
              />
            </div>

            {/* ✅ Students list with checkboxes (for this teacher's class) */}
            <div className="form-group">
              <span className="custom-label">Students {selectedClass ? `(${selectedClass})` : ""}</span>
              <div className="students-grid red-box" style={{ padding: "12px" }}>
                {students.length === 0 && (
                  <div className="text-muted small">No students to display</div>
                )}
                {students.length > 0 && (() => {
                  const mid = Math.ceil(students.length / 2);
                  const left = students.slice(0, mid);
                  const right = students.slice(mid);
                  return (
                    <div className="students-columns">
                      <div className="students-col">
                        {left.map((stu) => {
                          const id = stu._id || stu.id || stu.regNo;
                          return (
                            <div className="student-item" key={id}>
                              <label className="student-check">
                                <input
                                  type="checkbox"
                                  checked={!absent[id]}
                                  onChange={(e) =>
                                    setAbsent((prev) => ({ ...prev, [id]: !e.target.checked }))
                                  }
                                />
                                <span>{stu.name}</span>
                              </label>
                            </div>
                          );
                        })}
                      </div>
                      <div className="students-col">
                        {right.map((stu) => {
                          const id = stu._id || stu.id || stu.regNo;
                          return (
                            <div className="student-item" key={id}>
                              <label className="student-check">
                                <input
                                  type="checkbox"
                                  checked={!absent[id]}
                                  onChange={(e) =>
                                    setAbsent((prev) => ({ ...prev, [id]: !e.target.checked }))
                                  }
                                />
                                <span>{stu.name}</span>
                              </label>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })()}
              </div>
            </div>

            {/* ✅ Submit Button */}
            <div className="form-submit-wrapper">
              <button type="submit" className="custom-submit">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Attendance;
