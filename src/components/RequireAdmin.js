import { Navigate } from "react-router-dom";

export default function RequireAdmin({ children }) {
  const role = localStorage.getItem("role"); // atau dari context, terserah kamu

  if (role !== "admin") {
    return <Navigate to="/not-found" replace />;
  }

  return children;
}
