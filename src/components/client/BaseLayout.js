import React, { useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

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
        <nav className="navbar fixed-top navbar-expand-lg navbar-light bg-light">
          <div className="container-fluid">
            <Link className="navbar-brand" to="/">
              Coffee-Macth
            </Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link className="nav-link" to="/">Home</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/about">About</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/menu">Menu All</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/auth/login">Login</Link>
                </li>
              </ul>
              <form className="d-flex" onSubmit={handleSearchSubmit}>
                <input className="form-control" type="search" placeholder="Search" value={query} onChange={(e) => setQuery(e.target.value)} />
                <button className="btn btn-outline-success ms-2" type="submit">Search</button>
              </form>
              <Link to="/cart/view" className="btn btn-outline-primary position-relative ms-3">
                🛒 Keranjang
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  0
                </span>
              </Link>
            </div>
          </div>
        </nav>
      </header>

      {/* Spacer untuk menghindari konten ketutupan navbar */}
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
