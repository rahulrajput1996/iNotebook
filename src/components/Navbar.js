import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import Notecontext from "../context/notes/Notecontext";

function Navbar() {
  const location = useLocation();
  let navigate = useNavigate();
  const myalert = useContext(Notecontext);
  const { alertbtn } = myalert;
  const mylogout = () => {
    localStorage.removeItem("auth-token");
    navigate("/login");
    alertbtn("success", "Successfully: You are logged out");
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            Navbar
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname === "/" ? "active" : ""
                  }`}
                  aria-current="page"
                  to="/"
                >
                  Home
                </Link>
              </li>
              {localStorage.getItem("auth-token") && (
                <li className="nav-item">
                  <Link
                    className={`nav-link ${
                      location.pathname === "/about" ? "active" : ""
                    }`}
                    to="/about"
                  >
                    User
                  </Link>
                </li>
              )}
            </ul>
            {!localStorage.getItem("auth-token") ? (
              <form className="d-flex" role="search">
                <Link
                  className="btn btn-primary mx-3"
                  to="/login"
                  role="button"
                >
                  Login
                </Link>
                <Link className="btn btn-primary" to="/signup" role="button">
                  Signup
                </Link>
              </form>
            ) : (
              <button className="btn btn-primary" onClick={mylogout}>
                Logout
              </button>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
