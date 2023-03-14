import React, { useState } from "react";
import MailPng from "../assets/png/mail.png";
import PasswordPng from "../assets/png/password.png";
import ShowPasswordPng from "../assets/png/showpassword.png";
import HidePasswordPng from "../assets/png/hidepassword.png";
import LoginPng from "../assets/png/login.png";

import "./Signin.css";

import { useNavigate } from "react-router-dom";

import { auth } from "../firebaseconfig/config";
import { signInWithEmailAndPassword } from "@firebase/auth";

export default function Signin() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");

  return (
    <div className="all-parent">
      <h1>Welcome Back!</h1>
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
          <img
            src={PasswordPng}
            alt="Password icon"
            className="input-icons"
            required
          />
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
        <div className="forgotpassword-link">
          <p>Forgot Password ?</p>
        </div>

        <div
          className="login"
          onClick={async () => {
            try {
              await signInWithEmailAndPassword(auth, Email, Password);
              alert("Logged In");
            } catch (e) {
              alert(e.message);
            }
          }}
        >
          <img src={LoginPng} alt="Login icon" className="login-icon" />
          <p>
            <b>Log In</b>
          </p>
        </div>
        <div className="signup-instead">
          <p>Don't Have An Account Yet ?</p>
          <p
            onClick={() => {
              navigate("/sign-up");
            }}
          >
            <button>Sign Up</button>
          </p>
        </div>
      </div>
    </div>
  );
}
