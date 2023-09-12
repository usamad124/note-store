import React from "react";
import { useNavigate } from "react-router-dom";

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear any user-related data stored in the client-side (e.g., user token, user information)

    // Redirect to the login page
    navigate("/login");
  };

  return (
    <button onClick={handleLogout}>Logout</button>
  );
};

export default LogoutButton;

