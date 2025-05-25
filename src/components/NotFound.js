import React from "react";
import 'animate.css';

export default function NotFound() {
  return (
    <div
      className="animate__animated animate__fadeInDown"
      style={{
        textAlign: "center",
        marginTop: "10vh",
        color: "#5d4037",
        fontFamily: "'Playfair Display', serif",
        padding: "20px",
      }}
    >
      <h1
        className="animate__animated animate__heartBeat animate__infinite"
        style={{ fontSize: "6rem", marginBottom: "20px", color: "#a1887f" }}
      >
        404
      </h1>
      <h2
        className="animate__animated animate__fadeInUp"
        style={{
          fontSize: "2.5rem",
          marginBottom: "15px",
          letterSpacing: "3px",
          fontWeight: "700",
          color: "#556b2f",
        }}
      >
        Page Not Found
      </h2>
      <p
        className="animate__animated animate__fadeInUp animate__delay-1s"
        style={{ fontSize: "1.25rem", color: "#8fbc8f" }}
      >
        Maaf, halaman yang kamu cari tidak tersedia atau sudah dipindahkan.
      </p>
    </div>
  );
}
