import React,{useState} from "react";
import {Link,useNavigate} from "react-router-dom";
export default function Navbar(){

    const [menuOpen, setMenuOpen] = useState(false);
  const token = localStorage.getItem("authToken");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };


    return(
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow">
    <div className="container">
      {/* Logo */}
      <Link className="navbar-brand fw-bold" to="/">
        📚 AGC Library
      </Link>

      {/* Mobile Toggle Button */}
      <button
        className="navbar-toggler"
        type="button"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      {/* Navbar Links */}
      <div className={`collapse navbar-collapse ${menuOpen ? "show" : ""}`}>
        <ul className="navbar-nav me-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/">Home</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/books">Books</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/category">Category</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/aboutus">About</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/contactus">Contact</Link>
          </li>
        </ul>

        {/* Right Section */}
        <ul className="navbar-nav">
          {token ? (
            <li className="nav-item dropdown">
              <button
                className="btn btn-light dropdown-toggle"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                👤 Profile
              </button>
              <ul className="dropdown-menu dropdown-menu-end">
                <li>
                  <Link className="dropdown-item" to="/user">My Profile</Link>
                </li>
                <li><hr className="dropdown-divider" /></li>
                <li>
                  <button className="dropdown-item" onClick={handleLogout}>
                    Logout
                  </button>
                </li>
              </ul>
            </li>
          ) : (
            <>
              <li className="nav-item">
                <Link className="btn btn-light me-2" to="/login">Login</Link>
              </li>
              <li className="nav-item">
                <Link className="btn btn-outline-light" to="/register">Signup</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  </nav>
    )
}