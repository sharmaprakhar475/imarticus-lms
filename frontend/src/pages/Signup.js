import { useState } from "react";
import axios from "axios";
import "./Signup.css";

export default function Signup() {
  const [data, setData] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const BACKEND_API_URL = "https://imarticus-lms-backend-z90i.onrender.com/api";
  // const BACKEND_API_URL = "http://localhost:5000/api";
  const validate = () => {
    const newErrors = {};

    if (!data.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!data.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\d{10}$/.test(data.phone.trim())) {
      newErrors.phone = "Phone number must be 10 digits";
    }

    if (!data.email.trim()) {
      newErrors.email = "Email is required";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(data.email.trim())
    ) {
      newErrors.email = "Invalid email address";
    }

    if (!data.password) {
      newErrors.password = "Password is required";
    } else if (data.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0; // no errors means valid
  };

  const submit = async () => {
    if (!validate()) return; // stop if validation fails

    try {
      await axios.post(`${BACKEND_API_URL}/auth/signup`, data);
      alert("Signup complete! Now login");
      window.location.href = "/login";
    } catch (error) {
      alert("Signup failed. Please try again.");
      console.error(error);
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-card">
        {/* LOGO */}
        <img src="/imarticus-logo.png" alt="Company Logo" className="logo" />

        <h2>Create Account ✨</h2>
        <p className="subtitle">Join us and get started for free</p>

        <input
          className="input"
          placeholder="Full Name"
          onChange={(e) => setData({ ...data, name: e.target.value })}
        />
        {errors.name && <p className="error-text">{errors.name}</p>}

        <input
          className="input"
          placeholder="Phone Number"
          onChange={(e) => setData({ ...data, phone: e.target.value })}
        />
        {errors.phone && <p className="error-text">{errors.phone}</p>}

        <input
          className="input"
          placeholder="Email"
          onChange={(e) => setData({ ...data, email: e.target.value })}
        />
        {errors.email && <p className="error-text">{errors.email}</p>}

        <input
          className="input"
          type="password"
          placeholder="Password"
          onChange={(e) => setData({ ...data, password: e.target.value })}
        />
        {errors.password && <p className="error-text">{errors.password}</p>}

        <button className="signup-btn" onClick={submit}>
          Sign Up
        </button>

        <p className="link-text">
          Already have an account?
          <a href="/login" className="primary-link">
            Login!
          </a>
        </p>
      </div>
    </div>
  );
}
