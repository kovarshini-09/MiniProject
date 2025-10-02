import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./Navbar";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    alert("Thank you for your message! We will get back to you soon.");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="min-vh-100 bg-light d-flex flex-column">
      <Navbar />

      <main className="container flex-grow-1 d-flex flex-column justify-content-center py-5">
        <div className="row w-100 justify-content-center">
          <div className="col-lg-6 text-center">
            <h1 className="fw-bold display-5 text-dark mb-3">
              Contact <span className="text-danger">Us</span>
            </h1>
            <p className="fs-5 text-secondary mb-5">
              Feel free to contact us any time. We will get back to you as soon as possible!
            </p>

            <form onSubmit={handleSubmit} className="d-flex flex-column gap-3 text-start">
              <div className="mb-3">
                <input
                  type="text"
                  name="name"
                  className="form-control form-control-lg"
                  placeholder="Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <input
                  type="email"
                  name="email"
                  className="form-control form-control-lg"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <textarea
                  name="message"
                  className="form-control form-control-lg"
                  placeholder="Message"
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                  required
                />
              </div>

              <button
                type="submit"
                className="btn btn-danger btn-lg rounded-pill w-100 mt-3"
              >
                Send
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}
