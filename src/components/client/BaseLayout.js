import React, { useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "../../styles/base-layout.css";

const BaseLayout = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    if (query.trim()) {
      navigate(`/search?query=${query}`);
    }
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      {/* Navbar */}
      <header>
        <nav className="navbar fixed-top navbar-expand-lg navbar-light bg-light shadow-sm">
          <div className="container-fluid">
            <Link className="navbar-brand fw-bold text-black" to="/">
              Coffee-Macth
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse justify-content-start" id="navbarNav">
              <ul className="navbar-nav mb-2 mb-lg-0 w-100 text-start">
                <li className="nav-item">
                  <Link className="nav-link nav-icon" to="/" title="Home">
                    <i className="fas fa-home"></i>
                    <span className="nav-text">Home</span>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link nav-icon" to="/about" title="About">
                    <i className="fas fa-info-circle"></i>
                    <span className="nav-text">About</span>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link nav-icon" to="/menu" title="Menu">
                    <i className="fas fa-utensils"></i>
                    <span className="nav-text">Menu</span>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link nav-icon" to="/auth/login" title="Login">
                    <i className="fas fa-sign-in-alt"></i>
                    <span className="nav-text">Login</span>
                  </Link>
                </li>
              </ul>
              <form className="d-flex" onSubmit={handleSearchSubmit}>
                <input
                  className="form-control"
                  type="search"
                  placeholder="Search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
                <button className="btn btn-outline-success ms-2" type="submit">
                  <i className="fas fa-search"></i>
                </button>
              </form>
              <Link
                to="/cart/view"
                className="btn btn-outline-success position-relative ms-3"
                title="Keranjang"
              >
                <i className="fas fa-shopping-cart"></i>
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  
                </span>
              </Link>
            </div>
          </div>
        </nav>
      </header>

      {/* Spacer untuk konten */}
      <div style={{ paddingTop: "80px" }}></div>

      {/* Main Content */}
      <main className="flex-grow-1">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-dark text-white text-center py-3 mt-auto">
        <p>&copy; 2025 Coffee Macth. All Rights Reserved.</p>
        <div>
          <a href="https://www.instagram.com" target="_blank" className="text-white mx-3">
            <i className="fab fa-instagram fa-2x"></i>
          </a>
          <a href="https://www.tiktok.com" target="_blank" className="text-white mx-3">
            <i className="fab fa-tiktok fa-2x"></i>
          </a>
          <a href="https://www.twitter.com" target="_blank" className="text-white mx-3">
            <i className="fab fa-twitter fa-2x"></i>
          </a>
        </div>
      </footer>
    </div>
  );
};

export default BaseLayout;
