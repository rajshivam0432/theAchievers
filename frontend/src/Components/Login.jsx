import React, { useState } from "react";
import "./Login.css";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const initialValues = { email: "", password: "" };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
  
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
  
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/v1/users/login`,
        {
          email: formValues.email,
          password: formValues.password,
        },
        config
      );
  
      localStorage.setItem("token", res.data.token);
      console.log("Login successful, navigating to home...");
      navigate("/");
      // setIsSubmit(true);
  
    } catch (error) {
      console.error("Login error:", error);
      if (error.response) {
        console.log("Response data:", error.response.data);
      }
      setFormErrors({ apiError: "Login failed. Please try again." });
    }
  };

  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

    if (!values.email) {
      errors.email = "Email is required!";
    } else if (!regex.test(values.email)) {
      errors.email = "This is not a valid email format!";
    }

    if (!values.password) {
      errors.password = "Password is required";
    } else if (values.password.length < 4 || values.password.length > 10) {
      errors.password = "Password must be between 4 and 10 characters";
    }

    return errors;
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit}>
        <h1 className="h1">Login Form</h1>
        <div className="ui divider"></div>
        <div className="ui form">
          <div className="field">
            <input
              type="text"
              name="email"
              placeholder="Email"
              value={formValues.email}
              onChange={handleChange}
            />
            <p>{formErrors.email}</p>
          </div>
          <div className="field">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formValues.password}
              onChange={handleChange}
            />
            <p>{formErrors.password}</p>
          </div>
          <button className="login-button" type="submit">
            Submit
          </button>
        </div>
      </form>

      <div className="additional-links">
        <NavLink className="p" to="/signup">
          Create Account
        </NavLink>
        <span id="span">|</span>
        <NavLink className="p" to="/forgot-password">
          Forgot Password
        </NavLink>
      </div>
    </div>
  );
}

export default Login;
