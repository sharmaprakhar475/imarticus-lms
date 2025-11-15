import { useNavigate } from "react-router-dom";
export default function Navbar({ title = "Dashboard" }) {
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("token"); // remove token or user data
    localStorage.removeItem("userId"); // remove any other stored info
    navigate("/login"); // redirect to login page
  };

  return (
    <nav className="navbar navbar-light bg-light px-4 shadow-sm d-flex justify-content-between align-items-center">
      {/* LEFT SIDE — PAGE TITLE */}
      <h4 className="m-0">{title}</h4>

      {/* RIGHT SIDE — PROFILE DROPDOWN */}
      <div className="dropdown">
        <button
          className="btn dropdown-toggle d-flex align-items-center gap-2"
          data-bs-toggle="dropdown"
          style={{
            border: "none",
            boxShadow: "none",
            background: "transparent",
          }}
        >
          <i className="bi bi-person-circle fs-5"></i> Profile
        </button>

        <ul className="dropdown-menu dropdown-menu-end">
          <li>
            <a className="dropdown-item d-flex align-items-center gap-2">
              <i className="bi bi-person"></i> My Account
            </a>
          </li>

          <li>
            <button
              onClick={logout}
              className="dropdown-item text-danger d-flex align-items-center gap-2"
            >
              <i className="bi bi-box-arrow-right"></i> Logout
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
}
