import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import axios from 'axios';
import "./login.css";
import Google from "../../img/google.png";

const Login = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(process.env.REACT_APP_API_URL + "/auth/login", formData, {withCredentials: true});
      if (response.status === 200) {
        // Redirect user to home page after successful login
        const result = await axios.get(process.env.REACT_APP_API_URL + "/users/getUser", {withCredentials: true});
        const user = result.data;
        localStorage.setItem("user", JSON.stringify(user));
        navigate("/");
      }
    } catch(err) {
      // Set error message if login fails
      if (err.response && err.response.status === 401) {
        setErrorMessage("Incorrect username or password");
      } else {
        setErrorMessage("User Not found!");
      }
    }
  };

  const google = async () => {
    window.open("http://localhost:8000/api/auth/google", "_self");
  };

  return (
    <div className="login">
      <h1 className="loginTitle">Choose a Login Method</h1>
      <div className="wrapper">
        <div className="left">
          <div className="loginButton google" onClick={google}>
            <img src={Google} alt="" className="icon" />
            Google
          </div>
        </div>
        <div className="center">
          <div className="line"></div>
          <div className="or"><h3>OR</h3></div>
        </div>
        <div className="right">
          <input type="text" name="username"  placeholder='Username' value={formData.username} onChange={handleChange} required />
          <input type="password" name="password" placeholder='Password' value={formData.password} onChange={handleChange} required />
          <button className="submit" onClick={handleSubmit}>Login</button>
          {errorMessage && 
          <div>
            <p>
              <h4>{errorMessage}</h4>
            </p>
          </div>}
        </div>
      </div>
      <div className="loginRedirect">
        <span>Have not Registered Yet?</span>
        <Link className="signIn" to={"/registration"}>Sign Up</Link>
      </div>
    </div>
  );
};

export default Login;