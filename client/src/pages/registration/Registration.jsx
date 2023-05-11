import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import "./registration.css";
import Google from "../../img/google.png";

const RegistrationPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(process.env.REACT_APP_API_URL + "/auth/register", {
        username,
        email,
        password,
      });
      console.log(response.data);
      navigate("/");
      alert("Registration Successful!");
    } catch(err) {
      if (err.response.status === 400) {
        setErrorMessage("User already exists!");
      }
      console.log(err.response.data);
    }
  };

  const google = () => {
    window.open("http://localhost:8000/api/auth/google", "_self");
  };

  return (
    <div className="login">
      <h1 className="loginTitle">Choose a Registration Method</h1>
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
          <input type="text" value={username} placeholder="Username" onChange={handleUsernameChange} />
          <input type="text" value={email} placeholder="Email" onChange={handleEmailChange} />
          <input type="password" value={password} placeholder="Password" onChange={handlePasswordChange} />
          <button className="submit" type="submit" onClick={handleSubmit}>Register</button>
          {errorMessage && 
          <div>
            <p>
              <h4>{errorMessage}</h4>
            </p>
          </div>}
        </div>
      </div>
      <div className="loginRedirect">
        <span>Already Registered?</span>
        <Link className="signIn" to={"/login"}>Sign In</Link>
      </div>
    </div>
  );
};

export default RegistrationPage;