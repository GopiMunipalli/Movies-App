import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import "./index.css";

function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [width, setWidth] = useState(window.innerWidth);

  const loginSubmit = async (e) => {
    e.preventDefault();
    const userDetails = { username, password };
    const options = {
      method: "POST",
      body: JSON.stringify(userDetails),
    };
    const response = await fetch("https://apis.ccbp.in/login", options);
    const loginData = await response.json();
    if (response.ok) {
      loginSuccess(loginData.jwt_token);
    } else {
      loginFailure(loginData.error_msg);
    }
  };

  useEffect(() => {
    const windowResize = window.addEventListener("resize", () => {
      setWidth(window.innerWidth);
    });

    return () => {
      window.removeEventListener("resize", windowResize);
    };
  });

  const loginSuccess = (jwtToken) => {
    Cookies.set("jwt_token", jwtToken, { expires: 360 });
    navigate("/", { replace: true });
  };

  const loginFailure = (error_msg) => {
    setErrorMsg(error_msg);
  };

  const buttonText = width < 768 ? "Sing in" : "Login";

  return (
    <div className="login-bg-container">
      <img
        src="https://res.cloudinary.com/dpiaz73h0/image/upload/v1697363859/Group_7399Movies_1_nkjqn8.jpg"
        alt="login website logo"
        className="movies-logo"
      />
      <div className="login-main-card-container">
        <div className="login-card-container">
          <h1 className="login-heading">Login</h1>
          <label htmlFor="username" className="login-label">
            Username
          </label>
          <input
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="login-input"
            type="email"
            placeholder="Enter Username"
          />
          <label htmlFor="password" className="login-label">
            Password
          </label>
          <input
            type="password"
            value={password}
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter Password"
            className="login-input"
          />
          <p className="error-msg">{errorMsg}</p>
          <button type="submit" onClick={loginSubmit} className="login-button">
            {buttonText}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;