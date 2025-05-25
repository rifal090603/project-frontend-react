import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../../utils/api";
import "../../styles/auth/register-client.css";
import "animate.css";

const RegisterClientPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerUser(formData);
      navigate("/auth/login");
    } catch (error) {
      setError(error.response?.data?.message || "Terjadi kesalahan, coba lagi!");
    }
  };

  return (
    <div className="register-client d-flex justify-content-center align-items-center min-vh-100 bg-light">
      <div className="form-wrapper animate__animated animate__fadeInDown shadow p-4 rounded bg-white" style={{ maxWidth: "400px", width: "100%" }}>
        <h2 className="text-center mb-4 animate__animated animate__fadeInUp">Register Client</h2>

        <form onSubmit={handleSubmit} className="animate__animated animate__fadeInUp animate__delay-1s">
          {error && <p className="error-message text-danger">{error}</p>}

          <label className="form-label">Username:</label>
          <input
            type="text"
            name="username"
            className="form-control mb-3"
            value={formData.username}
            onChange={handleChange}
            required
          />

          <label className="form-label">Email:</label>
          <input
            type="email"
            name="email"
            className="form-control mb-3"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <label className="form-label">Password:</label>
          <input
            type="password"
            name="password"
            className="form-control mb-4"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <button type="submit" className="btn btn-primary w-100 animate__animated animate__pulse animate__delay-2s">
            Register
          </button>
        </form>

        <p className="mt-3 text-center">
          Sudah punya akun? <Link to="/auth/login">Login di sini</Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterClientPage;
