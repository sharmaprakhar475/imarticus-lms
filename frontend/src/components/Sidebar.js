import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function Sidebar() {
  const { pathname } = useLocation();

  return (
    <div
      style={{
        width: "250px",
        height: "100vh",
        position: "fixed",
        backgroundColor: "#0f5644",
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <div style={{ width: "100%", textAlign: "center", marginBottom: "30px" }}>
        <img
          src="/imarticus-logo.png"
          alt="Logo"
          style={{ width: "80%", height: "auto" }}
        />
      </div>

      <ul
        style={{
          listStyle: "none",
          padding: 0,
          width: "100%",
          display: "flex",
          flexDirection: "column",
          gap: "12px",
        }}
      >
        {/* ---- MENU ITEM (REUSABLE STYLE) ---- */}
        <SidebarItem
          to="/dashboard"
          icon="bi-house-door-fill"
          label="Dashboard"
          active={pathname === "/dashboard"}
        />
        {/* <SidebarItem
          to="/groups"
          icon="bi-people-fill"
          label="My Groups"
          active={pathname === "/groups"}
        /> */}
        <SidebarItem
          to="/my-captain-program"
          icon="bi-compass-fill"
          label="Explore"
          active={pathname === "/my-captain-program"}
        />
      </ul>
    </div>
  );
}

/* Reusable Sidebar Item Component */
function SidebarItem({ to, icon, label, active }) {
  return (
    <li>
      <Link
        to={to}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          padding: "12px 18px",
          borderRadius: "10px",
          textDecoration: "none",
          color: "white",
          fontSize: "16px",
          fontWeight: 500,
          background: active ? "rgba(255,255,255,0.15)" : "transparent",
          transition: "0.3s ease",
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.background = "rgba(255,255,255,0.10)";
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.background = active
            ? "rgba(255,255,255,0.15)"
            : "transparent";
        }}
      >
        <i className={`bi ${icon}`} style={{ fontSize: "18px" }}></i>
        {label}
      </Link>
    </li>
  );
}
