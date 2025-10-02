import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import image3 from "../images/image3.png";

function StudentLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // For now, navigate directly
    navigate("/student-dashboard");
  };

  return (
    <div className="container-fluid min-vh-100 d-flex flex-column">
      <Navbar />
      <div className="row flex-grow-1 d-flex align-items-center justify-content-center px-4">
        {/* Left Illustration */}
        <div className="col-md-6 d-flex justify-content-center mb-4 mb-md-0">
          <img
            src={image3}
            alt="illustration"
            className="img-fluid"
            style={{ maxWidth: "400px" }}
          />
        </div>

        {/* Right Form */}
        <div className="col-md-5">
          <div className="card border-0 shadow p-4">
            <h2 className="text-center fw-semibold mb-4">Login</h2>
            <form onSubmit={handleLogin}>
              <div className="mb-3">
                <input
                  type="email"
                  placeholder="Email"
                  className="form-control rounded-pill py-2"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <input
                  type="password"
                  placeholder="Password"
                  className="form-control rounded-pill py-2"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
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

export default StudentLoginPage;
