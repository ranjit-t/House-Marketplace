import React from "react";
import "./ListingItems.css";
import BedIcon from "../assets/svg/bedIcon.svg";
import BathIcon from "../assets/svg/bathtubIcon.svg";

export default function ListingItems({ listing, id }) {
  return (
    <div className="listing-items">
      <img src={listing.imgUrls[0]} alt={listing.name}></img>
      <div className="listing-details">
        <p>
          <b>{listing.Name}</b>
        </p>
        <div className="listing-price">
          {listing.type === "rent"
            ? `Price : ${listing.discountedPrice}€ / month `
            : `Price : ${listing.discountedPrice}€`}
        </div>
        <div className="listing-features">
          <div>
            <img src={BedIcon} alt="BedIcon" style={{ height: "30px" }} />
            <span> {listing.bedrooms} Bedrooms</span>
          </div>
          <div>
            <img src={BathIcon} alt="BathIcon" style={{ height: "30px" }} />
            <span> {listing.bathroom} Bathrooms</span>
          </div>
        </div>
        <div>
          <p>{listing.location}</p>
        </div>
      </div>
    </div>
  );
}
