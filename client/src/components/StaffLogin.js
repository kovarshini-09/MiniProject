import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import image2 from "../images/image2.png";

function StaffLoginPage() {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    navigate("/staff-dashboard");
  };

  return (
    <div className="container-fluid min-vh-100 d-flex flex-column">
      <Navbar />
      <div className="row flex-grow-1 d-flex align-items-center justify-content-center px-4">
        <div className="col-md-6 d-flex justify-content-center mb-4 mb-md-0">
          <img
            src={image2}
            alt="illustration"
            className="img-fluid"
            style={{ maxWidth: "400px" }}
          />
        </div>
        <div className="col-md-5">
          <div className="card border-0 shadow p-4">
            <h2 className="text-center fw-semibold mb-4">Login</h2>
            <form onSubmit={handleLogin}>
              <div className="mb-3">
                <input
                  type="email"
                  placeholder="Email"
                  className="form-control rounded-pill py-2"
                />
              </div>
              <div className="mb-3">
                <input
                  type="password"
                  placeholder="Password"
                  className="form-control rounded-pill py-2"
                />
              </div>
              <div className="d-grid">
                <button
                  type="submit"
                  className="btn btn-danger rounded-pill py-2 fw-medium"
                >
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StaffLoginPage;
