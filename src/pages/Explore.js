import React from "react";
import { Link } from "react-router-dom";

import RentImage from "../assets/jpg/rentCategoryImage.jpg";
import SellImage from "../assets/jpg/sellCategoryImage.jpg";
import Slideshow from "../swiper/Slideshow";

import "./Explore.css";

export default function Explore() {
  return (
    <div className="all-parent">
      <h1>Explore</h1>
      <h2 className="categories-heading">Categories</h2>
      <div className="explore-categories">
        <Link to="/category/Rent">
          <img src={RentImage} alt="Rent"></img>
        </Link>
        <Link to="/category/Sale">
          <img src={SellImage} alt="Sale"></img>
        </Link>

        <p>Places for Rent</p>
        <p>Places for Sale</p>
      </div>

      <h2 className="categories-heading">Featured</h2>
      <Slideshow></Slideshow>
      <div style={{ marginBottom: "80px" }}></div>
      <p>-</p>
    </div>
  );
}
