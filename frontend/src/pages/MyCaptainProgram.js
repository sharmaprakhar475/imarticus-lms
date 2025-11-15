import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { HouseFill, Stars, BookFill } from "react-bootstrap-icons";

import HeroProgram from "../components/HeroProgram";
import Highlights from "../components/Highlights";
import Curriculum from "../components/Curriculum";

export default function MyCaptainProgram() {
  return (
    <>
      {/* Fixed Navbar */}
      <Navbar
        variant="dark"
        expand="lg"
        fixed="top"
        style={{ backgroundColor: "#0f5644" }}
      >
        <Container>
          <Navbar.Brand
            href="#home"
            className="d-flex align-items-center gap-2"
          >
            <img
              src="/imarticus-logo.png"
              alt="Company Logo"
              className="logo"
              style={{ width: "100%", height: "60px" }}
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link
                href="#home"
                className="d-flex align-items-center gap-1"
              >
                <HouseFill /> Home
              </Nav.Link>
              <Nav.Link
                href="#highlights"
                className="d-flex align-items-center gap-1"
              >
                <Stars /> Highlights
              </Nav.Link>
              <Nav.Link
                href="#curriculum"
                className="d-flex align-items-center gap-1"
              >
                <BookFill /> Curriculum
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Spacer for fixed navbar */}
      <div style={{ height: "70px" }}></div>

      {/* Sections */}
      <section id="home" className="py-5 bg-light">
        <Container>
          <HeroProgram />
        </Container>
      </section>

      <section id="highlights" className="py-5">
        <Container>
          <Highlights />
        </Container>
      </section>

      <section id="curriculum" className="py-5 bg-light">
        <Container>
          <Curriculum />
        </Container>
      </section>

      {/* Footer */}
      <footer
        style={{ backgroundColor: "#0f5644" }}
        className=" text-white py-3 text-center"
      >
        <Container>
          <small>© 2025 MyCaptain Program. All rights reserved.</small>
        </Container>
      </footer>
    </>
  );
}
