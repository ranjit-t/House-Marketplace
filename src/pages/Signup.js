import React, { useState } from "react";
import MailPng from "../assets/png/mail.png";
import PasswordPng from "../assets/png/password.png";
import ShowPasswordPng from "../assets/png/showpassword.png";
import HidePasswordPng from "../assets/png/hidepassword.png";
import LoginPng from "../assets/png/login.png";

import "./Signin.css";

import { useNavigate } from "react-router-dom";

import { auth } from "../firebaseconfig/config";
import { createUserWithEmailAndPassword } from "@firebase/auth";

export default function Signin() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  return (
    <div className="all-parent">
      <h1>Sign Up!</h1>
      <div className="page-container">
        <div className="input-container">
          <img src={MailPng} alt="Mail icon" className="input-icons" />
          <input
            type="email"
            placeholder="Email"
            className="input-box"
            value={Email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            required
          />
        </div>
        <div className="input-container">
          <img src={PasswordPng} alt="Password icon" className="input-icons" />
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className="input-box"
            value={Password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <img
            src={ShowPasswordPng}
            alt="Show Password icon"
            className="showpassword"
            style={{ visibility: `${showPassword ? "hidden" : "visible"}` }}
            onClick={() => {
              setShowPassword((prev) => !prev);
            }}
          />
          <img
            src={HidePasswordPng}
            alt="Show Password icon"
            className="hidepassword"
            style={{
              visibility: `${showPassword ? "visible" : "hidden"}`,
            }}
            onClick={() => {
              setShowPassword((prev) => !prev);
            }}
          />
        </div>
        <div
          className="login"
          onClick={async () => {
            try {
              await createUserWithEmailAndPassword(auth, Email, Password);
              alert("Registered Logged In");
            } catch (e) {
              alert(e.message);
            }
          }}
        >
          <img src={LoginPng} alt="Login icon" className="login-icon" />
          <p>
            <b>Sign Up</b>
          </p>
        </div>
        <div className="signup-instead">
          <p>Already Have An Account ?</p>
          <p
            onClick={() => {
              navigate("/sign-in");
            }}
          >
            <button>Sign In</button>
          </p>
        </div>
      </div>
    </div>
  );
}
