import { NavLink } from "react-router-dom";
import { ReactComponent as OfferIcon } from "../assets/svg/localOfferIcon.svg";
import { ReactComponent as ExploreIcon } from "../assets/svg/exploreIcon.svg";
import { ReactComponent as PersonOutlineIcon } from "../assets/svg/personOutlineIcon.svg";

import "./Navbar.css";

export default function Navbar() {
  return (
    <div className="navbar">
      <NavLink to="/" className="navbarNav">
        <ExploreIcon fill="#2C2C2C" width="36px" height="36px" />
        <p>Explore</p>
      </NavLink>
      <NavLink to="/offers" className="navbarNav">
        <OfferIcon fill="#2C2C2C" width="36px" height="36px" />
        <p>Offers</p>
      </NavLink>
      <NavLink to="/profile" className="navbarNav">
        <PersonOutlineIcon fill="#2C2C2C" width="36px" height="36px" />
        <p>Profile</p>
      </NavLink>
    </div>
  );
}
