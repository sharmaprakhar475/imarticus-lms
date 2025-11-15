import { useState } from "react";
import axios from "axios";
import "./Login.css";

export default function Login() {
  const [data, setData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const validate = () => {
    const newErrors = {};

    if (!data.email) {
      newErrors.email = "Email is required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(data.email)) {
      newErrors.email = "Invalid email address";
    }

    if (!data.password) {
      newErrors.password = "Password is required";
    } else if (data.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };
  const login = async () => {
    if (!validate()) return;
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        data
      );

      if (res.data.token && res.data.userId) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("userId", res.data.userId);
        window.location.href = "/dashboard";
      } else {
        alert("Invalid login");
      }
    } catch (error) {
      alert(`Login failed: ${error.message}`);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        {/* LOGO */}
        <img src="/imarticus-logo.png" alt="Company Logo" className="logo" />

        <h2>Welcome Back 👋</h2>
        <p className="subtitle">Login to continue</p>

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

        <button className="login-btn" onClick={login}>
          Login
        </button>
        <p class="link-text">
          Don't have an account?
          <a class="primary-link" href="/">
            Sign up
          </a>{" "}
          for free.
        </p>
      </div>
    </div>
  );
}
