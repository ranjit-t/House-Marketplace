import { Routes, Route } from "react-router-dom";
import React, { useEffect, useState } from "react";

import "./App.css";
import Navbar from "./components/Navbar";
import Explore from "./pages/Explore";
import ForgotPassword from "./pages/ForgotPassword";
import Offers from "./pages/Offers";
import Category from "./pages/Category";
import Profile from "./pages/Profile";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Logo from "./assets/house-market-log.png";
import { useNavigate } from "react-router-dom";
import { auth } from "./firebaseconfig/config";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import CreateListing from "./pages/CreateListing";

function App() {
  const navigate = useNavigate();
  const [user, setUser] = useState("");

  // console.log(user);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser("");
      }
    });
  }, [user]);

  return (
    <div className="App">
      <h1 className="App-heading">
        <img src={Logo} alt="Logo" className="App-logo" />
        {!user ? (
          <div className="heading-nav">
            <span
              onClick={() => {
                navigate("/sign-in");
              }}
            >
              Sign In
            </span>
            <span
              onClick={() => {
                navigate("/sign-up");
              }}
            >
              Sign Up
            </span>
          </div>
        ) : (
          <div className="heading-nav">
            <span
              onClick={() => {
                signOut(auth);
                toast.success("Signed Out, Come Back Soon!");

                navigate("/sign-in");
              }}
            >
              Sign Out
            </span>
          </div>
        )}
      </h1>
      <Routes>
        <Route path="/" element={<Explore></Explore>}></Route>
        <Route path="/offers" element={<Offers></Offers>}></Route>
        <Route
          path="/category/:categoryName"
          element={<Category></Category>}
        ></Route>

        <Route
          path="/profile"
          element={<Profile user={user}></Profile>}
        ></Route>
        <Route
          path="/create-listing"
          element={<CreateListing></CreateListing>}
        ></Route>
        <Route path="/sign-in" element={<Signin user={user}></Signin>}></Route>
        <Route path="/sign-up" element={<Signup user={user}></Signup>}></Route>
        <Route
          path="/forgot-password"
          element={<ForgotPassword></ForgotPassword>}
        ></Route>
      </Routes>
      <Navbar user={user} />
      <ToastContainer
        position="top-center"
        autoClose={3000}
        draggable
        pauseOnHover
      ></ToastContainer>
    </div>
  );
}

export default App;
