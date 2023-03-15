import React, { useState } from "react";
import MailPng from "../assets/png/mail.png";
import { auth } from "../firebaseconfig/config";
import { toast } from "react-toastify";
import { sendPasswordResetEmail } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export default function ForgotPassword() {
  const [Email, setEmail] = useState("");
  const navigate = useNavigate();

  return (
    <div className="all-parent">
      <h1>Forgot Password ?</h1>
      <div className="page-container">
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            try {
              await sendPasswordResetEmail(auth, Email);
              toast.success("A reset Email has been sent");
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

          <button
            style={{
              marginTop: "20px",
              padding: "5px",
              fontSize: "1.1em",
              backgroundColor: "white",
              cursor: "pointer",
              border: "1px solid black",
            }}
          >
            Reset Password
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
