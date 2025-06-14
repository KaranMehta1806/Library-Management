import React,{useState} from "react";
import {Link,useNavigate} from "react-router-dom";
import "./adminnavbar.css"
export default function AdminNavbar(){

    const [menuOpen, setMenuOpen] = useState(false);
  const token = localStorage.getItem("authToken");
  const role = localStorage.getItem("role");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("role");
    navigate("/login");
  };


    return(
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow">
    <div className="container">
     
      <Link className="navbar-brand fw-bold" to="/admin">
        📚 AGC Library
      </Link>

    
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
            <Link className="nav-link" to="/admin">Dashboard</Link>
          </li>
          <li className="nav-item dropdown">
  <Link 
    className="nav-link dropdown-toggle" 
    to="#" 
    id="navbarDropdown" 
    role="button" 
    data-bs-toggle="dropdown" 
    aria-expanded="false"
  >
    Books
  </Link>
  <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
    <li>
      <Link className="dropdown-item" to="/admin/addbook">Add Book</Link>
    </li>
    <li>
      <Link className="dropdown-item" to="/admin/viewbook">View Books</Link>
    </li>
  </ul>
</li>

{role == "librarian"?<li className="nav-item">
            <Link className="nav-link" to="/admin/issuerequest">Issue Request</Link>
          </li> :null}

          {role == "librarian"?<li className="nav-item">
            <Link className="nav-link" to="/admin/returnrequest">Return Request</Link>
          </li> :null}

          <li className="nav-item">
            <Link className="nav-link" to="/admin/issued">Books Borrowed</Link>
          </li>

          {role == "admin"?<li className="nav-item">
            <Link className="nav-link" to="/admin/addlibrarian">Add Librarian</Link>
          </li> :null}
        </ul>

       
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
                  <Link className="dropdown-item" to="/admin">Dashboard</Link>
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
                <Link className="btn btn-light me-2" to="/admin-login">Login</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  </nav>
    )
}