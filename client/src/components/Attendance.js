// import React, { useState, forwardRef } from "react";
// import DatePicker from "react-datepicker";
// import axios from "axios";
// import "react-datepicker/dist/react-datepicker.css";
// import "./Attendance.css";

// const CustomDateInput = forwardRef(({ value, onClick, placeholder }, ref) => (
//   <div className="input-icon-wrapper">
//     <input
//       type="text"
//       className="red-box custom-date-input"
//       onClick={onClick}
//       ref={ref}
//       value={value || ""}
//       placeholder={placeholder || "dd-mm-yyyy"}
//       readOnly
//     />
//     <i className="bi bi-calendar3 calendar-icon" onClick={onClick} />
//   </div>
// ));

// const classOptions = ["9A", "9B", "9C", "10A", "10B", "10C"];

// function Attendance() {
//   const [selectedDate, setSelectedDate] = useState(null);
//   const [selectedClass, setSelectedClass] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!selectedDate || !selectedClass) {
//       alert("⚠️ Please select both date and class.");
//       return;
//     }

//     try {
//       // ✅ Convert Date object to string (dd/mm/yyyy)
//       const formattedDate = selectedDate.toLocaleDateString("en-GB");

//       // ✅ Send to backend using correct field names
//       const res = await axios.post("http://localhost:5000/api/attendance/update", {
//         class: selectedClass,
//         date: formattedDate,
//       });

//       alert(res.data.message);
//     } catch (err) {
//       console.error("❌ Attendance submit error:", err);
//       if (err.response && err.response.data && err.response.data.message) {
//         alert(`Server error: ${err.response.data.message}`);
//       } else {
//         alert("Failed to submit attendance. Please try again.");
//       }
//     }
//   };

//   return (
//     <div className="add-class-wrapper">
//       <div className="form-container">
//         <div className="custom-card">
//           <h5 className="form-title">Add / Update Attendance</h5>

//           <form onSubmit={handleSubmit}>
//             <div className="form-group">
//               <span className="custom-label">Date</span>
//               <DatePicker
//                 selected={selectedDate}
//                 onChange={(date) => setSelectedDate(date)}
//                 dateFormat="dd-MM-yyyy"
//                 placeholderText="dd-mm-yyyy"
//                 customInput={<CustomDateInput />}
//                 popperPlacement="bottom"
//               />
//             </div>

//             <div className="form-group">
//               <span className="custom-label">Select Class</span>
//               <select
//                 className="red-box"
//                 value={selectedClass}
//                 onChange={(e) => setSelectedClass(e.target.value)}
//               >
//                 <option value="">Choose Class</option>
//                 {classOptions.map((cls) => (
//                   <option key={cls} value={cls}>
//                     {cls}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             <div className="form-submit-wrapper">
//               <button type="submit" className="custom-submit">
//                 Submit
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Attendance;
import React, { useState, forwardRef } from "react";
import DatePicker from "react-datepicker";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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

const classOptions = ["9A", "9B", "9C", "10A", "10B", "10C"];

function Attendance() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedClass, setSelectedClass] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedDate || !selectedClass) {
      toast.warning("⚠️ Please select both date and class.", { theme: "colored" });
      return;
    }

    try {
      const formattedDate = selectedDate.toLocaleDateString("en-GB");
      const token = localStorage.getItem("token");

      const res = await axios.post(
        "http://localhost:5000/api/attendance/update",
        { class: selectedClass, date: formattedDate },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast.success(res.data.message, { theme: "colored" });
      setSelectedDate(null);
      setSelectedClass("");
    } catch (err) {
      console.error("❌ Attendance submit error:", err);

      if (err.response?.data?.message) {
        // 🔥 Backend controlled message (e.g., "Not your class")
        toast.error(err.response.data.message, { theme: "colored" });
      } else {
        toast.error("Failed to submit attendance. Please try again.", { theme: "colored" });
      }
    }
  };

  return (
    <div className="add-class-wrapper">
      <ToastContainer position="top-right" autoClose={3000} />
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
                {classOptions.map((cls) => (
                  <option key={cls} value={cls}>
                    {cls}
                  </option>
                ))}
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
