import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import image1 from "../images/image1.png";

function AdminLoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");      
  const [password, setPassword] = useState(""); 

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (!response.ok) {
        // Alert for non-admin or invalid attempts
        alert("You're not authorized as admin");
        return;
      }

      // ✅ store JWT token in localStorage
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role);

      // Defensive: if backend returns a non-admin role on this endpoint
      if (data.role !== "admin") {
        alert("You're not authorized as admin");
        return;
      }

      navigate("/dashboard"); // navigate only if login successful
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container-fluid min-vh-100 d-flex flex-column">
      <Navbar />
      <div className="row flex-grow-1 d-flex align-items-center justify-content-center px-4">
        <div className="col-md-6 d-flex justify-content-center mb-4 mb-md-0">
          <img src={image1} alt="illustration" className="img-fluid" style={{ maxWidth: "400px" }} />
        </div>

        <div className="col-md-5">
          <div className="card border-0 shadow p-4">
            <h2 className="text-center fw-semibold mb-4">Admin Login</h2>
            {/* Inline error removed: alerts are shown instead */}
            <form onSubmit={handleLogin}>
              <div className="mb-3">
                <input
                  type="email"
                  placeholder="Email"
                  className="form-control rounded-pill py-2"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="off"
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
                  autoComplete="off"
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

export default AdminLoginPage;
