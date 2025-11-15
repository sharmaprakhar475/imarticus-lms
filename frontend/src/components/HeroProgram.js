import React from "react";

export default function HeroProgram() {
  return (
    <section className="py-5 text-center bg-light hero-section">
      <div className="container">
        <h1 className="display-4 fw-bold mb-3 hero-title">
          Become a Digital Marketer in 18 Weeks
        </h1>
        <p className="lead mb-4 hero-subtitle">
          MyCaptain Digital Marketing Program with Job Assurance
        </p>

        <button
          className="btn btn-primary btn-lg me-3 hero-apply-btn"
          style={{ backgroundColor: "#ff6600", borderColor: "#ff6600" }}
        >
          Apply Now
        </button>

        <a
          href="/path-to-brochure.pdf"
          className="btn btn-outline-primary btn-lg hero-brochure-btn"
          target="_blank"
          rel="noopener noreferrer"
        >
          Download Brochure
        </a>
      </div>
    </section>
  );
}
