import React from "react";

export default function Sidebar() {
  return (
    <div
      className="text-white p-3"
      style={{
        width: "250px",
        height: "100vh",
        position: "fixed",
        backgroundColor: "#0f5644",
      }}
    >
      <h3 className="mb-4 text-center">
        <img
          src="/imarticus-logo.png"
          alt="Logo"
          style={{ width: "100%", height: "auto" }}
        />
      </h3>

      <ul className="nav flex-column gap-2">
        <li className="nav-item">
          <a className="nav-link text-white d-flex align-items-center gap-2">
            <i className="bi bi-house-door-fill"></i> Dashboard
          </a>
        </li>

        <li className="nav-item">
          <a className="nav-link text-white d-flex align-items-center gap-2">
            <i className="bi bi-people-fill"></i> My Groups
          </a>
        </li>

        <li className="nav-item">
          <a className="nav-link text-white d-flex align-items-center gap-2">
            <i className="bi bi-compass-fill"></i> Explore
          </a>
        </li>
      </ul>
    </div>
  );
}
