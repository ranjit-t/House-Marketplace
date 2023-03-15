import React, { useState } from "react";
import MailPng from "../assets/png/mail.png";
import PasswordPng from "../assets/png/password.png";
import ShowPasswordPng from "../assets/png/showpassword.png";
import HidePasswordPng from "../assets/png/hidepassword.png";
import LoginPng from "../assets/png/login.png";
import DisplaynamePng from "../assets/png/displayname.png";

import "./Signin.css";

import { useNavigate } from "react-router-dom";

import { auth, db } from "../firebaseconfig/config";
import { createUserWithEmailAndPassword, updateProfile } from "@firebase/auth";
import { serverTimestamp, setDoc, doc } from "firebase/firestore";

import { toast } from "react-toastify";

export default function Signin() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [DisplayName, setDisplayName] = useState("");

  return (
    <div className="all-parent">
      <h1>Sign Up!</h1>
      <div className="page-container">
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            try {
              const userCred = await createUserWithEmailAndPassword(
                auth,
                Email,
                Password
              );
              const userUID = userCred.user.uid;
              updateProfile(auth.currentUser, {
                displayName: DisplayName.trim(),
              });

              const formData = {
                name: DisplayName,
                email: Email,
                timestamp: serverTimestamp(),
              };
              await setDoc(doc(db, "users", userUID), formData);

              navigate("/profile");

              toast.success("You are Registered");
            } catch (e) {
              toast.error(e.message.slice(10, 100));
            }
          }}
        >
          <div className="input-container">
            <img src={DisplaynamePng} alt="Mail icon" className="input-icons" />
            <input
              type="text"
              placeholder="Display Name"
              className="input-box"
              value={DisplayName}
              onChange={(e) => {
                setDisplayName(e.target.value);
              }}
              required
            />
          </div>
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
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              required
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
          <button>
            <div className="login">
              <img src={LoginPng} alt="Login icon" className="login-icon" />
              <p>
                <b>Sign Up</b>
              </p>
            </div>
          </button>
        </form>

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
