import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card } from 'react-bootstrap';

// Initial structure for the marks input table
const initialMarksData = [
  { subject: 'English', marks: '', grade: '' },
  { subject: 'Maths', marks: '', grade: '' },
  { subject: 'Science', marks: '', grade: '' },
  { subject: 'Social', marks: '', grade: '' },
];

function EnterMarks() {
  const [marks, setMarks] = useState(initialMarksData);
  const [selectedClass, setSelectedClass] = useState('');
  const [studentSearchTerm, setStudentSearchTerm] = useState('');

  const handleMarksChange = (index, field, value) => {
    const newMarks = [...marks];
    if (field === 'marks') {
      const numValue = parseInt(value, 10);
      if (isNaN(numValue) || numValue < 0 || numValue > 100) {
        newMarks[index][field] = value === '' ? '' : newMarks[index][field];
      } else {
        newMarks[index][field] = numValue;
      }
    } else {
      newMarks[index][field] = value;
    }
    setMarks(newMarks);
  };

  const calculateTotal = () => {
    return marks.reduce((total, item) => {
      const mark = parseFloat(item.marks);
      return total + (isNaN(mark) ? 0 : mark);
    }, 0);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Class:', selectedClass);
    console.log('Marks Data:', marks);
    alert('Marks Submitted (Check console for data)');
  };

  const handleCancel = () => {
    setMarks(initialMarksData.map(item => ({ ...item, marks: '', grade: '' })));
    setSelectedClass('');
    setStudentSearchTerm('');
  };

  return (
    <Card className="shadow-sm border rounded p-5">
      {/* Page Heading */}
      <h4 className="fw-bold mb-5" style={{ color: "#e63946" }}>Enter Marks</h4>

      {/* Header (Search + Class Select) */}
      <div className="row mb-4 align-items-center">
        <div className="col-md-6 mb-3 mb-md-0">
          <div className="d-flex align-items-center border p-2 rounded w-100" style={{ maxWidth: '300px', border: "2px solid #e63946" }}>
            <input
              type="text"
              className="form-control border-0 p-0 small-text"
              placeholder="Search student"
              value={studentSearchTerm}
              onChange={(e) => setStudentSearchTerm(e.target.value)}
              style={{ outline: 'none' }}
            />
          </div>
        </div>
        <div className="col-md-6 text-md-end">
          <select
            className="form-select w-auto d-inline-block small-text"
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            style={{ border: "2px solid #e63946", borderRadius: "0px" }}
          >
            <option value="">Select Class</option>
            <option value="10">Class 6A</option>
            <option value="9">Class 6B</option>
            <option value="10">Class 6C</option>
            <option value="9">Class 7A</option>
            <option value="10">Class 7B</option>
            <option value="9">Class 7C</option>
            <option value="10">Class 8A</option>
            <option value="9">Class 8B</option>
            <option value="10">Class 8C</option>
            <option value="9">Class 9A</option>
            <option value="10">Class 9B</option>
            <option value="9">Class 9C</option>
            <option value="10">Class 10A</option>
            <option value="10">Class 10B</option>
            <option value="10">Class 10C</option>

          </select>
        </div>
      </div>

      {/* Content Layout */}
      <div className="row">
        {/* Student List */}
        <div className="col-md-6 border-end pe-md-5 mb-4 mb-md-0">
          <h5 className="text-danger fw-bold mb-3">Students List</h5>

          <div className="row g-3 align-items-center mb-2 border-bottom pb-2">
            <div className="col-4 fw-bold small-text">Id</div>
            <div className="col-4 fw-bold small-text">Student Name</div>
            <div className="col-4 fw-bold small-text text-center">Action</div>
          </div>

          <div className="row g-3 align-items-center py-2 border-bottom">
            <div className="col-4 small-text">110</div>
            <div className="col-4 small-text">Alice Johnson</div>
            <div className="col-4 text-center">
              <button type="button" className="btn btn-danger btn-sm px-3 small-text">
                Marks
              </button>
            </div>
          </div>
          {/* Add more student rows here */}
        </div>

        {/* Marks Entry Table */}
        <div className="col-md-6 ps-md-5">
          <div className="table-responsive">
            <table className="table table-bordered text-center small-text">
              <thead className="table-light">
                <tr>
                  <th scope="col" className="fw-bold">Subject</th>
                  <th scope="col" className="fw-bold">Marks (Max 100)</th>
                  <th scope="col" className="fw-bold">Grade</th>
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
                        onChange={(e) => handleMarksChange(index, 'marks', e.target.value)}
                        min="0"
                        max="100"
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        className="form-control form-control-sm text-center border-0 p-0 small-text"
                        value={item.grade}
                        onChange={(e) => handleMarksChange(index, 'grade', e.target.value.toUpperCase())}
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

          {/* Action Buttons */}
          <div className="text-end mt-4">
            <button
              type="button"
              className="btn btn-outline-danger me-2 small-text"
              onClick={handleCancel}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-danger small-text"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </Card>
  );
}

export default EnterMarks;
