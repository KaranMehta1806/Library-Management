import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Footer.css"; // Custom styling

const Footer = () => {
  return (
    <footer className="footer bg-dark text-white mt-5">
      <div className="container py-4">
        <div className="row">
          {/* Library Info */}
          <div className="col-md-4">
            <h5>Library Management</h5>
            <p>Explore, borrow, and enjoy a vast collection of books.</p>
          </div>

          {/* Quick Links */}
          <div className="col-md-4">
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
              <li><a href="/" className="text-white">Home</a></li>
              <li><a href="/books" className="text-white">Browse Books</a></li>
              <li><a href="/about" className="text-white">About Us</a></li>
              <li><a href="/contact" className="text-white">Contact</a></li>
            </ul>
          </div>

          {/* Social Media */}
          <div className="col-md-4">
            <h5>Follow Us</h5>
            <div className="d-flex">
              <a href="#" className="social-icon me-3"><i className="fab fa-facebook"></i></a>
              <a href="#" className="social-icon me-3"><i className="fab fa-twitter"></i></a>
              <a href="#" className="social-icon me-3"><i className="fab fa-instagram"></i></a>
              <a href="#" className="social-icon"><i className="fab fa-linkedin"></i></a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center mt-3">
          <p className="mb-0">&copy; {new Date().getFullYear()} Library Management. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
