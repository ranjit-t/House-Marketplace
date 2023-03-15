import React, { useState } from "react";
import "./Profile.css";
import DisplaynamePng from "../assets/png/displayname.png";
import MailPng from "../assets/png/mail.png";
import { auth } from "../firebaseconfig/config";
import { updateProfile } from "firebase/auth";

import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function Profile({ user }) {
  const [DisplayName, setDisplayName] = useState(user.displayName);
  const [Email, setEmail] = useState(user.email);
  const navigate = useNavigate();

  // console.log(auth.currentUser);

  return (
    <div className="all-parent">
      <h1>Profile</h1>
      {auth.currentUser ? (
        <div>
          <div className="welcome-message">
            {user && <p>Hello, {user.displayName}!</p>}
          </div>
          <div className="edit-user-info">
            <div className="edit-user-info-heading">
              <h2>Edit User Info : </h2>
            </div>
            <form
              className="edit-form"
              onSubmit={async (e) => {
                e.preventDefault();
                if (auth.currentUser.displayName !== DisplayName) {
                  try {
                    updateProfile(auth.currentUser, {
                      displayName: DisplayName.trim(),
                    });
                    toast.success("Profile name has been changed");
                  } catch (e) {
                    toast.error("Oops, There is an error!");
                  }
                } else {
                  toast.error("The name is same as before");
                }
              }}
            >
              <div className="input-container">
                <img
                  src={DisplaynamePng}
                  alt="Mail icon"
                  className="input-icons"
                />
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
                  disabled
                />
              </div>

              <button className="save-changes">Save Changes</button>
            </form>
          </div>
        </div>
      ) : (
        <div>
          <div className="welcome-message">
            Please Sign In to Access Your Profile
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
            onClick={(e) => {
              e.preventDefault();
              navigate("/sign-in");
            }}
          >
            Sign In
          </button>
        </div>
      )}
    </div>
  );
}
