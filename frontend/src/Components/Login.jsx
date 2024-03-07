// Login.jsx
import React, { useState, useEffect } from "react";
import "./Login.css";
import { NavLink } from "react-router-dom"; // Import NavLink for navigation
import axios from "axios";
import { useNavigate } from "react-router-dom";
function Login() {
  const initialValues = { username: "", email: "", password: "" };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
 const navigate=useNavigate()
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit =async (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    console.log(formValues)
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.post(
        "/api/v1/users/login",
        {userdata:formValues.email,password:formValues.password},
        config
      );
      console.log(data);
      navigate('/home')
    setIsSubmit(true);
  }
  catch(error){
   console.log(error)
  }
}

  useEffect(() => {
    console.log(formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(formValues);
    }
  }, [formErrors]);

  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.username) {
      errors.username = "Username is required!";
    }
    if (!values.email) {
      errors.email = "Email is required!";
    } else if (!regex.test(values.email)) {
      errors.email = "This is not a valid email format!";
    }
    if (!values.password) {
      errors.password = "Password is required";
    } else if (values.password.length < 4) {
      errors.password = "Password must be more than 4 characters";
    } else if (values.password.length > 10) {
      errors.password = "Password cannot exceed more than 10 characters";
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
            {/* <label>Username</label> */}
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formValues.username}
              onChange={handleChange}
            />
          </div>
          <p>{formErrors.username}</p>
          <div className="field">
            {/* <label>Email</label> */}
            <input
              type="text"
              name="email"
              placeholder="Email"
              value={formValues.email}
              onChange={handleChange}
            />
          </div>
          <p>{formErrors.email}</p>
          <div className="field">
            {/* <label>Password</label> */}
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formValues.password}
              onChange={handleChange}
            />
          </div>
          <p >{formErrors.password}</p>
          <button className="login-button">Submit</button>
        </div>
      </form>

      {/* Additional Links */}
      <div className="additional-links">
        <NavLink className="p" to="/signup">Create Account</NavLink>
        <span id="span">|</span>
        <NavLink className="p" to="/forgot-password">Forgot Password</NavLink>
      </div>
    </div>
  );
}

export default Login;
