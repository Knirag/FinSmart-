import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import finsmartLogo from "../../images/logo.svg";
import "../../App.css";

const Authentication = () => {
  const [loginType, setLoginType] = useState("LOGIN");
  const navigateTo = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleLoginTypeChange = (newType) => {
    setLoginType(newType);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSignUpSubmit = (e) => {
   e.preventDefault();
   const userData = JSON.parse(localStorage.getItem("userData")) || [];

   const id = userData.length ? userData[userData.length - 1].id + 1 : 1;

   userData.push({ id, ...formData });

   localStorage.setItem("userData", JSON.stringify(userData));

   console.log("You Are Successfully Signed Up");
   navigateTo("/dashboard");
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const userData = JSON.parse(localStorage.getItem("userData"));
    if (
      userData &&
      userData.email === formData.email &&
      userData.password === formData.password
    ) {
      console.log("You Are Successfully Logged In");
      navigateTo("/dashboard"); 
    } else {
      alert("Email or Password is not matching with our record");

    }
  };

  return (
    <div className="user">
      <div className="container">
        <div className="header">
          <img src={finsmartLogo} className="logo1" />
          <div className="status-container">
            <div className={`status ${loginType === "LOGIN" ? "active" : ""}`}>
              <button
                onClick={() => handleLoginTypeChange("LOGIN")}
                className="wmga"
              >
                LOGIN
              </button>
            </div>
            <div className="stroke"></div>
            <div className={`status ${loginType === "SIGNUP" ? "active" : ""}`}>
              <button
                onClick={() => handleLoginTypeChange("SIGNUP")}
                className="wmga"
              >
                SIGNUP
              </button>
            </div>
          </div>
        </div>
        <div className="inputs">
          {loginType === "LOGIN" && (
            <form onSubmit={handleLoginSubmit}>
              <div className="email-field">
                <label>Email: </label>
                <div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="password-field">
                <label>Password: </label>
                <div>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <button type="submit" className="submit">
                SUBMIT
              </button>
            </form>
          )}
          {loginType === "SIGNUP" && (
            <form onSubmit={handleSignUpSubmit}>
              <div className="email-field2">
                <label>Email: </label>
                <div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="password-field2">
                <label>Password: </label>
                <div>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="repeat-password-field">
                <label>Repeat Password: </label>
                <div>
                  <input
                    type="password"
                    name="repeatpswd"
                    value={formData.repeatpswd}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <button type="submit" className="submit">
                SUBMIT
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Authentication;
