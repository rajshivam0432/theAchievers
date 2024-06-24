import axios from 'axios';
import React from 'react';
import { useNavigate } from "react-router-dom";

function Logout() {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        console.error("No token found, cannot logout.");
        return;
      }

      // Debugging step to understand the token
      console.log("Token retrieved from local storage:", token);
      console.log("Type of token:", typeof token);

      const config = {
        headers: {
          "Content-type": "application/json",
          "Authorization": `Bearer ${token}`
        },
      };

      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/v1/users/logout`,
        {},
        config
      );

      localStorage.removeItem("token");
      console.log("Logout successful, navigating to login...");
      navigate("/login");

    } catch (error) {
      console.error("Logout error:", error);
      if (error.response) {
        console.log("Response data:", error.response.data);
      }
    }
  };

  return (
    <div>
      <button onClick={handleSubmit}>Logout</button>
    </div>
  );
}

export default Logout;
