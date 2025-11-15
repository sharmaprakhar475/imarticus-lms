import React from "react";
import Sidebar from "./Sidebar"; // Your sidebar component
import Navbar from "./Navbar"; // Your navbar component

export default function MainLayout({ children, pageTitle }) {
  return (
    <div className="d-flex">
      <Sidebar />

      <div className="flex-grow-1" style={{ marginLeft: "250px" }}>
        <Navbar title={pageTitle} />

        <main className="p-4">{children}</main>
      </div>
    </div>
  );
}
