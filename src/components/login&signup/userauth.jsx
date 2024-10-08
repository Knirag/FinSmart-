import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import finsmartLogo from "../../images/logo.svg";
import { GoEye, GoEyeClosed } from "react-icons/go";
import { baseUrl } from "../../utils";
import "../../App.css";

const Authentication = () => {
  const navigateTo = useNavigate();
  const [loginType, setLoginType] = useState("LOGIN");
  const [formData, setFormData] = useState({ username: "", password: "" });
 const [passwordVisible, setPasswordVisible] = useState(false); 
   const [error, setError] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const type = params.get("type");
    if (type === "signup") {
      setLoginType("SIGNUP");
    } else {
      setLoginType("LOGIN");
    }
  }, [location.search]);

  const handleLoginTypeChange = (newType) => {
    setLoginType(newType);
    setError("");
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSignUpSubmit = (e) => {
    e.preventDefault();
    console.log("Base url:", baseUrl);
    if (formData.password !== formData.repeatpswd) {
      setError("Passwords do not match");
      console.log("password one:", formData.password);
      console.log("password two:", formData.repeatpswd);
      return;
    }
    const { repeatPassword, ...dataToSubmit } = formData;

    axios
      .post(`${baseUrl}/users/register`, dataToSubmit)
      .then((response) => {
        console.log("You Are Successfully Signed Up", response.data);
        navigateTo("/finEducation/tutorial");
      })
      .catch((error) => {
        console.error("There was an error signing up:", error);
      });
  };

 const handleLoginSubmit = async (e) => {
   e.preventDefault();
   console.log(
     "base url:",baseUrl
   );
   try {
     const response = await axios.post(`${baseUrl}/users/login`, formData);
     if (response.status === 200 && response.data.token) {
       const { token } = response.data;
       console.log("You Are Logged In 👍🏽", response.data);
       localStorage.setItem("authToken", token);
       navigateTo("/dashboard");
     } else {
       console.error("Login failed with status:", response.status);
       alert("Login failed. Please check your credentials and try again.");
     }
   } catch (error) {
     if (error.response && error.response.status === 401) {
       console.error("Error on Login:", error.response.data);
       alert("Email or Password is not matching with our record");
     } else {
       console.error("An unexpected error occurred:", error);
       alert("An unexpected error occurred. Please try again later.");
     }
   }
 };
   const togglePasswordVisibility = () => {
     setPasswordVisible(!passwordVisible);
   };

  return (
    <div className="user">
      <div className="container">
        <div className="headerAuth">
          <div className="logo1">
            <img src={finsmartLogo} className="finSmartLogo" />
          </div>
          <div className="status-container">
            <div className={`status ${loginType === "LOGIN" ? "active" : ""}`}>
              <button
                onClick={() => handleLoginTypeChange("LOGIN")}
                className="statusButton"
              >
                <h6 className="statusLabels">LOGIN</h6>
              </button>
            </div>
            <div className="stroke"></div>
            <div className={`status ${loginType === "SIGNUP" ? "active" : ""}`}>
              <button
                onClick={() => handleLoginTypeChange("SIGNUP")}
                className="statusButton"
              >
                <h6 className="statusLabels">SIGNUP</h6>
              </button>
            </div>
          </div>
        </div>
        <div className="inputsSection">
          {loginType === "LOGIN" && (
            <form onSubmit={handleLoginSubmit}>
              <div className="userNameField">
                <label className="fieldLabel"> Username: </label>
                <div className="userNameFieldInput">
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="password-row">
                <label className="fieldLabel">Password: </label>
                <div className="passwordField">
                  <input
                    type={passwordVisible ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                  />
                  <i
                    className="showPassword"
                    onClick={togglePasswordVisibility}
                    style={{ cursor: "pointer" }}
                  >
                    {passwordVisible ? <GoEye /> : <GoEyeClosed />}
                  </i>
                </div>
              </div>
              <div className="submitBtn">
                <button
                  type="submit"
                  className="submit"
                >
                  SUBMIT
                </button>
              </div>
            </form>
          )}
          {loginType === "SIGNUP" && (
            <form onSubmit={handleSignUpSubmit}>
              <div className="userNameField">
                <label className="fieldLabel">Username: </label>
                <div className="userNameFieldInput">
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="password-field2">
                <label className="fieldLabel">Password: </label>
                <div className="passwordField">
                  <input
                    type={passwordVisible ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                  />
                  <button
                    className="showPassword"
                    onClick={togglePasswordVisibility}
                  >
                    {passwordVisible ? <GoEye /> : <GoEyeClosed />}
                  </button>
                </div>
              </div>
              <div className="repeat-password-field">
                <label className="fieldLabel">Repeat Password: </label>
                <div className="passwordField">
                  <input
                    type={passwordVisible ? "text" : "password"}
                    name="repeatpswd"
                    value={formData.repeatPassword}
                    onChange={handleInputChange}
                  />
                  <button
                    className="showPassword"
                    onClick={togglePasswordVisibility}
                  >
                    {passwordVisible ? <GoEye /> : <GoEyeClosed />}
                  </button>
                </div>
                {error && <p className="error-message">{error}</p>}
              </div>
              <div className="submitBtn">
                <button type="submit" className="submit">
                  SUBMIT
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Authentication;
