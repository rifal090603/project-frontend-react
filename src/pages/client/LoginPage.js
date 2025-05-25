import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../utils/api";
import "../../styles/auth/login.css";
import "animate.css";
import socket from "../../sockets/socket";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    try {
      const response = await loginUser({ username, password });
      const token = response.access_token || response.token;
      const user = response.user;

      if (!token || !user) throw new Error("Token atau data pengguna tidak ditemukan");

      localStorage.setItem("access_token", token);
      localStorage.setItem("user_id", user.id);
      localStorage.setItem("role", user.role);

      socket.emit("join", { user_id: user.id });

      if (user.role === "admin") {
        navigate("/dashboard");
      } else {
        navigate("/");
      }

    } catch (error) {
      console.error("Login gagal:", error);
      setErrorMessage(error.message || "Login gagal. Periksa kembali data Anda.");
    }
  };

  return (
    <div className="login-container-base">
      <div className="login-form-wrapper-base animate__animated animate__fadeInDown">
        <h2 className="login-title">Login</h2>

        {errorMessage && <p className="error-message animate__animated animate__shakeX">{errorMessage}</p>}

        <form onSubmit={handleLogin} className="login-form-base animate__animated animate__fadeInDown animate__delay-1s">
          <div className="form-group-base">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="input-field"
            />
          </div>

          <div className="form-group-base">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-field"
            />
          </div>

          <button type="submit" className="btn-login-base animate__animated animate__zoomIn animate__delay-2s">
            Login
          </button>
        </form>

        <p className="register-text animate__animated animate__fadeInUp animate__delay-3s">
          Belum punya akun? <a href="/auth/register">Daftar di sini</a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
