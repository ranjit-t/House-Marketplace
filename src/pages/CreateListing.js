import React, { useEffect, useState } from "react";
import { auth } from "../firebaseconfig/config";
// import { serverTimestamp } from "firebase/firestore";
import "./CreateListing.css";

import { geocodeByAddress, getLatLng } from "react-places-autocomplete";

export default function CreateListing() {
  const [address, setAddress] = useState("");
  const [coordinates, setCoordinates] = useState({ lat: 0, lng: 0 });
  const [FormData, setFormData] = useState({
    name: "",
    type: "rent",
    userRef: auth.currentUser ? auth.currentUser.uid : "",
    bedrooms: 1,
    bathroom: 1,
    parking: true,
    furnished: true,
    offer: true,
    regularPrice: "",
    discountedPrice: "",
    location: "",
    // lat: "",
    // lng: "",
    imageUrls: [],
    // timestamp: serverTimestamp,
  });

  const {
    name,
    type,
    bedrooms,
    bathroom,
    parking,
    furnished,
    offer,
    regularPrice,
    discountedPrice,
    // location,
    // lat,
    // lng,
  } = FormData;
  useEffect(() => {
    console.log(FormData);
    console.log(coordinates);
  }, [coordinates, FormData]);
  useEffect(() => {
    console.log(FormData);
  }, [FormData]);

  const onMutate = (e) => {
    if (e.target.files) {
      setFormData((prev) => ({ ...prev, imgUrls: [e.target.files] }));
    } else if (e.target.value === "true") {
      setFormData((prev) => ({ ...prev, [e.target.id]: true }));
    } else if (e.target.value === "false") {
      setFormData((prev) => ({ ...prev, [e.target.id]: false }));
    } else {
      setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    }
  };

  const handleSelect = async (value) => {
    const results = await geocodeByAddress(value);
    const latLng = await getLatLng(results[0]);
    setAddress(value);
    setCoordinates(latLng);
    setFormData((prev) => ({ ...prev, location: address }));
    setFormData((prev) => ({ ...prev, lat: coordinates.lat }));
    setFormData((prev) => ({ ...prev, lng: coordinates.lng }));
  };

  const handleKeyDown = (event) => {
    event.preventDefault();
    handleSelect(address);
  };
  return (
    <div className="all-parent">
      <h1>Rent/Sell Your House</h1>
      <div className="create-listing-parent">
        <form className="create-listing-form">
          <div className="input-section">
            <p>Title : </p>
            <p> </p>
            <input
              className="input-listing-title"
              type="text"
              placeholder="Title of your listing"
              id="name"
              value={name}
              onChange={onMutate}
              required
            />
          </div>
          <div className="input-section">
            <p>Rent/Sale :</p>
            <button
              type="button"
              className={type === "rent" ? "form-button-active" : "form-button"}
              id="type"
              value="rent"
              onClick={onMutate}
            >
              Rent
            </button>
            <button
              type="button"
              className={type === "sale" ? "form-button-active" : "form-button"}
              id="type"
              value="sale"
              onClick={onMutate}
            >
              Sale
            </button>
          </div>
          <div className="input-section">
            <p>Bedrooms : </p>
            <p> </p>
            <input
              className="little-input-box"
              type="number"
              placeholder="No. of bedrooms"
              id="bedrooms"
              min="1"
              value={bedrooms}
              onChange={onMutate}
              required
            />
          </div>
          <div className="input-section">
            <p>Bathrooms : </p>
            <p> </p>

            <input
              className="little-input-box"
              type="number"
              placeholder="No. of Bathrooms"
              id="bathroom"
              min="1"
              value={bathroom}
              onChange={onMutate}
              required
            />
          </div>
          <div className="input-section">
            <p>Parking :</p>
            <button
              type="button"
              className={
                parking === true ? "form-button-active" : "form-button"
              }
              id="parking"
              value="true"
              onClick={onMutate}
            >
              Yes
            </button>
            <button
              type="button"
              className={
                parking === false ? "form-button-active" : "form-button"
              }
              id="parking"
              value="false"
              onClick={onMutate}
            >
              No
            </button>
          </div>
          <div className="input-section">
            <p>Furnished :</p>
            <button
              type="button"
              className={
                furnished === true ? "form-button-active" : "form-button"
              }
              id="furnished"
              value="true"
              onClick={onMutate}
            >
              Yes
            </button>
            <button
              type="button"
              className={
                furnished === false ? "form-button-active" : "form-button"
              }
              id="furnished"
              value="false"
              onClick={onMutate}
            >
              No
            </button>
          </div>

          <div className="input-section">
            <p>Address : </p>
            <p> </p>

            <input
              type="textarea"
              className="input-listing-title"
              placeholder="Address of your listing"
              value={address}
              onChange={(event) => setAddress(event.target.value)}
              required
            />
          </div>
          <div className="find-geo-btn-parent">
            <p> </p>
            <p> </p>
            <button className="find-geo-btn" onClick={handleKeyDown}>
              Get Coordinates
            </button>
          </div>

          <div className="input-section">
            <p>Latitude : </p>
            <p> </p>

            <input
              className="input-listing-title"
              type="number"
              placeholder="Latitude of your listing"
              id="lat"
              value={coordinates.lat}
              onChange={onMutate}
              required
            />
          </div>
          <div className="input-section">
            <p>Longitude : </p>
            <p> </p>

            <input
              className="input-listing-title"
              type="number"
              placeholder="Longitude of your listing"
              id="lng"
              value={coordinates.lng}
              onChange={onMutate}
              required
            />
          </div>

          <div className="input-section">
            <p>Offer :</p>
            <button
              type="button"
              className={offer === true ? "form-button-active" : "form-button"}
              id="offer"
              value="true"
              onClick={onMutate}
            >
              Yes
            </button>
            <button
              type="button"
              className={offer === false ? "form-button-active" : "form-button"}
              id="offer"
              value="false"
              onClick={onMutate}
            >
              No
            </button>
          </div>
          <div className="input-section">
            <p>{`Regular Price(€) : `}</p>
            <p> </p>
            <input
              className="little-input-box"
              type="number"
              placeholder="Price"
              id="regularPrice"
              value={regularPrice}
              onChange={onMutate}
              required
            />
          </div>
          {offer === true && (
            <div className="input-section">
              <p>{`Offer Price(€) :`} </p>
              <p> </p>
              <input
                className="little-input-box"
                type="number"
                placeholder="Offer Price"
                id="discountedPrice"
                value={discountedPrice}
                onChange={onMutate}
                required
              />
            </div>
          )}
          <div className="input-section">
            <p> Images : </p>
            <p> </p>

            <input
              className="images-input"
              type="file"
              name="files"
              multiple
              placeholder="Longitude of your listing"
              id="imgUrls"
              onChange={onMutate}
              required
            />
          </div>

          <div className="input-section">
            <button className="input-submit-button">Add Listing</button>
          </div>
        </form>
      </div>
    </div>
  );
}
