import React, { useState, forwardRef } from "react";
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

  // ✅ Hardcoded dropdown values
  const classOptions = [
    { _id: "9A", className: "9A" },
    { _id: "9B", className: "9B" },
    { _id: "9C", className: "9C" },
    { _id: "10A", className: "10A" },
    { _id: "10B", className: "10B" },
    { _id: "10C", className: "10C" },
  ];

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
      const res = await axios.post(
        "http://localhost:5000/api/attendance/update",
        {
          class: selectedClass,
          date: selectedDate,
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
      setSelectedClass("");
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

            {/* ✅ Class Dropdown */}
            <div className="form-group">
              <span className="custom-label">Select Class</span>
              <select
                className="red-box"
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
              >
                <option value="">Choose Class</option>
                {classOptions.map((cls) => (
                  <option key={cls._id} value={cls._id}>
                    {cls.className}
                  </option>
                ))}
              </select>
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
