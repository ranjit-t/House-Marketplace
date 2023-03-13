import { Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Explore from "./pages/Explore";
import ForgotPassword from "./pages/ForgotPassword";
import Offers from "./pages/Offers";
import Profile from "./pages/Profile";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";

function App() {
  return (
    <div className="App">
      <h1 className="App-heading">House Marketplace</h1>
      <Routes>
        <Route path="/" element={<Explore></Explore>}></Route>
        <Route path="/offers" element={<Offers></Offers>}></Route>
        <Route path="/profile" element={<Profile></Profile>}></Route>
        <Route path="/sign-in" element={<Signin></Signin>}></Route>
        <Route path="/sign-up" element={<Signup></Signup>}></Route>
        <Route
          path="/forgot-password"
          element={<ForgotPassword></ForgotPassword>}
        ></Route>
      </Routes>
      <Navbar />
    </div>
  );
}

export default App;
