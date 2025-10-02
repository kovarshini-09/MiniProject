import React, { useState, forwardRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./Attendance.css";

const CustomDateInput = forwardRef(({ value, onClick, placeholder }, ref) => {
  return (
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
  );
});

function Attendance() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedClass, setSelectedClass] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Selected Date:", selectedDate);
    console.log("Selected Class:", selectedClass);
    alert("Attendance Submitted!");
  };

  return (
    <div className="add-class-wrapper">
      <div className="form-container">
        <div className="custom-card">
          <h5 className="form-title">Add / Update Attendance</h5>

          <form onSubmit={handleSubmit}>
            {/* Date Picker */}
            <div className="form-group">
              <span className="custom-label">Date</span>
              <DatePicker
                selected={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                dateFormat="dd-MM-yyyy"
                placeholderText="dd-mm-yyyy"
                customInput={<CustomDateInput />}
                popperPlacement="bottom"
              />
            </div>

            {/* Class Select */}
            <div className="form-group">
              <span className="custom-label">Select Class</span>
              <select
                className="red-box"
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
              >
                <option value="">Choose...</option>
                <option value="Class 6">Class 6</option>
                <option value="Class 7">Class 7</option>
                <option value="Class 8">Class 8</option>
              </select>
            </div>

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
