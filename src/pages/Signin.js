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
import { toast } from "react-toastify";

export default function Signin({ user }) {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");

  return (
    <div className="all-parent">
      <h1>Welcome Back!</h1>
      <div className="page-container">
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            try {
              await signInWithEmailAndPassword(auth, Email, Password);

              toast.success("Welcome Back");
              navigate("/");
            } catch (e) {
              toast.error(e.message.slice(10, 100));
            }
          }}
        >
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
            />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="input-box"
              value={Password}
              required
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
            className="forgotpassword-link"
            onClick={() => {
              navigate("/forgot-password");
            }}
          >
            <p>Forgot Password ?</p>
          </div>

          <button>
            <div className="login">
              <img src={LoginPng} alt="Login icon" className="login-icon" />
              <p>
                <b>Sign In</b>
              </p>
            </div>
          </button>
        </form>
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
