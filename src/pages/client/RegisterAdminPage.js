import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerAdmin } from "../../utils/api";
import Swal from "sweetalert2";
import "../../styles/auth/register-admin.css";

const RegisterAdminPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerAdmin(formData);

      Swal.fire({
        icon: "success",
        title: "Registrasi Berhasil",
        text: "Admin berhasil didaftarkan!",
        timer: 2000,
        showConfirmButton: false,
      });

      setTimeout(() => {
        navigate("/auth/login");
      }, 2000);
    } catch (error) {
      console.error("Registration error:", error);
      Swal.fire({
        icon: "error",
        title: "Registrasi Gagal",
        text: error.response?.data?.message || "Terjadi kesalahan! Silakan coba lagi.",
      });
    }
  };

  return (
    <div className="register-admin">
      <div className="register-form-wrapper-admin">
        <h1 className="register-title-admin text-center">Form Register Admin</h1>

        <form onSubmit={handleSubmit} className="register-form">
          {error && <p className="form-error">{error}</p>}

          <div className="form-group-admin">
            <label htmlFor="username" className="form-label-admin">
              Username
            </label>
            <input type="text" id="username" name="username" className="form-control" value={formData.username} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label htmlFor="email" className="form-label-admin">
              Email
            </label>
            <input type="email" id="email" name="email" className="form-control" value={formData.email} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label htmlFor="password" className="form-label-admin">
              Password
            </label>
            <input type="password" id="password" name="password" className="form-control" value={formData.password} onChange={handleChange} required />
          </div>

          <div className="text-center">
            <button type="submit" className="register-button-admin">
              Register
            </button>
          </div>
        </form>

        <div className="text-center mt-3">
          <p className="login-redirect-admin">
            Sudah punya akun? <Link to="/auth/login">Login di sini</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterAdminPage;
