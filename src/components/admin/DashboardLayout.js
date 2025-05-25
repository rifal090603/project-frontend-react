import { Outlet, NavLink } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../styles/dashboard/dashboard.css';

const DashboardLayout = () => {
  return (
    <div className="dashboard-body">
      <header className="dashboard-header">
        <nav className="navbar fixed-top navbar-expand-lg bg-body-tertiary dashboard-navbar">
          <div className="container-fluid dashboard-navbar-container">
            <a className="navbar-brand me-4 dashboard-navbar-brand" href="/dashboard">Coffee-Match</a>
            <button
              className="navbar-toggler dashboard-navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse dashboard-navbar-collapse" id="navbarNav">
              <ul className="navbar-nav me-auto dashboard-navbar-nav">
                <li className="nav-item dashboard-nav-item">
                  <NavLink className="nav-link dashboard-nav-link" to="/dashboard">Dashboard</NavLink>
                </li>
                <li className="nav-item dashboard-nav-item">
                  <NavLink className="nav-link dashboard-nav-link" to="/dashboard/create-menu">Tambah Menu</NavLink>
                </li>
                <li className="nav-item dashboard-nav-item">
                  <NavLink className="nav-link dashboard-nav-link" to="/dashboard/transactions">Transaksi</NavLink>
                </li>
                <li className="nav-item dashboard-nav-item">
                  <NavLink className="nav-link dashboard-nav-link" to="/dashboard/users">Data User</NavLink>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>

      <div className="container my-5 pt-5 dashboard-main-content">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
