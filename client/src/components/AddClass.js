import React from "react";
import "./AddClassPage.css"; // custom styles below

function AddClassPage() {
  return (
    <div className="add-class-wrapper">
      {/* top ribbon */}
      <div className="page-chip ms-4 mt-3">Classes  -  Add New Classes</div>

      {/* form card */}
      <div className="d-flex justify-content-center align-items-center py-4">
        <div className="card shadow-sm p-4 custom-card">
          <h5 className="text-center mb-4 fw-bold">Add New Class</h5>

          <form>
            {/* Class Name */}
            <div className="form-group mb-4 position-relative">
              <span className="custom-label">Class Name</span>
              <input
                type="text"
                className="form-control rounded-pill border-danger text-center"
              />
            </div>

            {/* Select Teacher */}
            <div className="form-group mb-4 position-relative">
              <span className="custom-label">Select class teacher</span>
              <select className="form-select rounded-pill border-danger text-center">
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
