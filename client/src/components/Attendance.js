import React, { useState, forwardRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./Attendance.css";

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

const classOptions = [
  "6A","6B","6C",
  "7A","7B","7C",
  "8A","8B","8C",
  "9A","9B","9C",
  "10A","10B","10C"
];

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

            <div className="form-group">
              <span className="custom-label">Select Class</span>
              <select
                className="red-box"
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
              >
                <option value="">Choose Class</option>
                {classOptions.map(cls => <option key={cls} value={cls}>{cls}</option>)}
              </select>
            </div>

            <div className="form-submit-wrapper">
              <button type="submit" className="custom-submit">Submit</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Attendance;
