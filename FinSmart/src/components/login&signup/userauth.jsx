import React, { useState } from "react";
import { useForm } from "react-hook-form";
import finsmartLogo from '../../images/logo.svg';
import "../../App.css";

const Authentication = () => {
  const [loginType, setLoginType] = useState("LOGIN");
  const handleLoginTypeChange = (newType) => {
    setLoginType(newType);
  };
 const {
   register,
   handleSubmit,
   formState: { errors },
 } = useForm();


 const onSubmit = (data) => {
   // Store user data in local storage
   localStorage.setItem(
     "userData",
     JSON.stringify({
       email: data.email,
       password: data.password,
     })
   );

   const userData = JSON.parse(localStorage.getItem("userData"));

   console.log("User credentials:", userData)
   if (userData) {
     if (
       (userData.email === data.email && userData.password ===
       data.password)
     ) {
       console.log("You Are Successfully Logged In");
     } else {
       console.log("Email or Password is not matching with our record");
     }
   } else {
     console.log("Email or Password is not matching with our record");
   }

   console.log(userData);
 };

  return (
    <div className="user">
      <div className="container">
        <div className="header">
          <img src={finsmartLogo} className="logo1" />
          <div className="status-container">
            <div
              className={`status ${loginType === "LOGIN" ? "active" : ""}`}
              onClick={() => handleLoginTypeChange("LOGIN")}
            >
              LOGIN
            </div>
            <div className="stroke"></div>
            <div
              className={`status ${loginType === "SIGNUP" ? "active" : ""}`}
              onClick={() => handleLoginTypeChange("SIGNUP")}
            >
              SIGNUP
            </div>
          </div>
        </div>
        <div className="inputs">
          {loginType === "LOGIN" && (
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="email-field">
                <label>Email: </label>
                <div>
                  <input
                    type="email"
                    {...register("email", { required: true })}
                  />
                  {errors.email && (
                    <span style={{ color: "red" }}>*Email* is mandatory </span>
                  )}
                </div>
              </div>

              <div className="password-field">
                <label>Password: </label>
                <div>
                  <input type="password" {...register("password")} />
                </div>
              </div>

              <button onClick={onSubmit} className="submit">
                SUBMIT
              </button>
            </form>
          )}
          {loginType === "SIGNUP" && (
            <form className="signup" onSubmit={handleSubmit(onSubmit)}>
              <div className="email-field2">
                <label>Email: </label>
                <div>
                  <input
                    type="email"
                    {...register("email", { required: true })}
                  />
                </div>
              </div>
              <div className="password-field2">
                <label>Password: </label>
                <div>
                  <input
                    type="password"
                    {...register("password", { required: true })}
                  />
                </div>
              </div>
              <div className="repeat-password-field">
                <label>Repeat Password: </label>
                <div>
                  <input
                    type="password"
                    {...register("repeatpswd", { required: true })}
                  />
                </div>
              </div>

              <button onClick={onSubmit}>
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
