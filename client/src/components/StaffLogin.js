import React, { useState } from "react"; // ✅ added useState
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import axios from "axios"; // if you want role-based login
import "bootstrap/dist/css/bootstrap.min.css";
import image2 from "../images/image2.png";

function StaffLoginPage() {
  const [email, setEmail] = useState("");       // ✅ added state
  const [password, setPassword] = useState(""); // ✅ added state
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
        role: "teacher" // only teachers allowed here
      });

      if (res.data.role === "teacher") {
        localStorage.setItem("token", res.data.token);
        navigate("/staff-dashboard");
      } else {
        alert("You are not authorized as a teacher!");
      }
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
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

export default StaffLoginPage;
