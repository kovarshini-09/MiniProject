// components/PrivateRoute.js
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = ({ allowedRoles }) => {
  const token = localStorage.getItem("token"); // JWT stored after login
  if (!token) return <Navigate to="/home" />; // Not logged in

  const payload = JSON.parse(atob(token.split(".")[1])); // Decode token
  if (!allowedRoles.includes(payload.role)) return <Navigate to="/home" />; // Wrong role

  return <Outlet />; // Render child routes
};

export default PrivateRoute;
