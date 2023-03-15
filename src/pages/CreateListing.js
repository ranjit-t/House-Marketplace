import React, { useEffect, useState } from "react";
// import { auth } from "../firebaseconfig/config";
import { serverTimestamp } from "firebase/firestore";
import "./CreateListing.css";

export default function CreateListing() {
  const [FormData, setFormData] = useState({
    name: "",
    type: "rent",
    // userRef: auth.currentUser.uid,
    bedrooms: 1,
    bathroom: 1,
    parking: true,
    furnished: true,
    offer: true,
    regularPrice: 0,
    discountedPrice: 0,
    location: "",
    lat: 0,
    lng: 0,
    imageUrls: [],
    timestamp: serverTimestamp,
  });

  const {
    // name,
    type,
    bedrooms,
    bathroom,
    parking,
    furnished,
    // offer,
    // regularPrice,
    // discountedPrice,
    // location,
    // lat,
    // lng,
  } = FormData;
  useEffect(() => {
    console.log(FormData);
  }, [FormData]);

  const onMutate = (e) => {
    if (e.target.value === "true") {
      setFormData((prev) => ({ ...prev, [e.target.id]: true }));
    } else if (e.target.value === "false") {
      setFormData((prev) => ({ ...prev, [e.target.id]: false }));
    } else {
      setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    }
  };

  return (
    <div className="all-parent">
      <h1>Rent/Sale Your House</h1>
      <div className="create-listing-parent">
        <form className="create-listing-form">
          <div>
            Title :{" "}
            <input
              className="input-listing-title"
              type="text"
              placeholder="Title of your listing"
              id="name"
              onChange={onMutate}
              required
            />
          </div>
          <div>
            <label>Rent/Sale :</label>
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
          <div>
            Bedrooms :{" "}
            <input
              className="input-listing-title"
              type="number"
              placeholder="No. of bedrooms"
              id="bedrooms"
              min="1"
              value={bedrooms}
              onChange={onMutate}
              required
            />
          </div>
          <div>
            Bathrooms :{" "}
            <input
              className="input-listing-title"
              type="number"
              placeholder="No. of Bathrooms"
              id="bathroom"
              min="1"
              value={bathroom}
              onChange={onMutate}
              required
            />
          </div>
          <div>
            <label>Parking :</label>
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
          <div>
            <label>Furnished :</label>
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
        </form>
      </div>
    </div>
  );
}
