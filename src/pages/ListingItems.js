import React from "react";
import "./ListingItems.css";
import BedIcon from "../assets/svg/bedIcon.svg";
import BathIcon from "../assets/svg/bathtubIcon.svg";

export default function ListingItems({ listing, id }) {
  return (
    <div className="listing-items">
      <img src={listing.imgUrls[0]} alt={listing.name}></img>
      <div className="listing-details">
        <p style={{ fontSize: "0.9em", fontWeight: "bold" }}>{listing.Name}</p>

        <div className="listing-price">
          {listing.offer === true && listing.type === "rent" && (
            <div>
              <p className="regular-price">
                {listing.regularPrice && `${listing.regularPrice}€ / month`}
              </p>
              <p>{`Price : ${listing.discountedPrice}€ / month`}</p>
            </div>
          )}
          {listing.offer === true && listing.type === "sale" && (
            <div>
              <p className="regular-price">
                {listing.regularPrice && `${listing.regularPrice}€`}
              </p>
              <p>{`Price : ${listing.discountedPrice}€`}</p>
            </div>
          )}
          {listing.offer === false && listing.type === "rent" && (
            <div>
              <p>
                {listing.regularPrice && `${listing.regularPrice}€ / month`}
              </p>
            </div>
          )}
          {listing.offer === false && listing.type === "sale" && (
            <div>
              <p>{listing.regularPrice && `${listing.regularPrice}€`}</p>
            </div>
          )}
        </div>
        <div className="listing-features">
          <div>
            <img
              src={BedIcon}
              alt="BedIcon"
              style={{ height: "30px", opacity: "0.7" }}
            />
            <span className="bath-bed"> {listing.bedrooms} Bedrooms</span>
          </div>
          <div>
            <img
              src={BathIcon}
              alt="BathIcon"
              style={{ height: "30px", opacity: "0.7" }}
            />
            <span className="bath-bed"> {listing.bathroom} Bathrooms</span>
          </div>
        </div>
        <div className="listing-location">
          <p>{listing.location}</p>
        </div>
      </div>
    </div>
  );
}
