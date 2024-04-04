import React, { useState } from "react";
import "./Login.css";
import { assets } from "../../assets/assets";

const Login = ({ setLogin }) => {
  const [currstate, setCurrstate] = useState("Sign up");
  return (
    <div className="login">
      <form className="login-container">
        <div className="login-title">
          <h2>{currstate}</h2>
          <img onClick={() => setLogin(false)} src={assets.cross_icon} alt="" />
        </div>
        <div className="login-inputs">
          {currstate === "Login" ? (
            <></>
          ) : (
            <input type="text" placeholder="Your Name" required />
          )}
          <input type="email" placeholder="Enter Email" required />
          <input type="password" placeholder="Enter Password" required />
        </div>
        <button>{currstate === "Sign up" ? "Create account" : "Login"}</button>
        <div className="login-condition">
          <input type="checkbox" required />
          <p>By countinuing, i agree to the terms of use & privacy policy.</p>
        </div>
        {currstate === "Login" ? (
          <p>
            Create a new account? <span onClick={()=>setCurrstate('Sign up')}>Click here</span>
          </p>
        ) : (
          <p>
            Already have an account? <span onClick={()=>setCurrstate('Login')}>login here</span>
          </p>
        )}
      </form>
    </div>
  );
};

export default Login;
