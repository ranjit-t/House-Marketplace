import React, { useEffect, useState } from "react";
import { auth, db, storage } from "../firebaseconfig/config";
import { serverTimestamp } from "firebase/firestore";
import "./CreateListing.css";

import { geocodeByAddress, getLatLng } from "react-places-autocomplete";
import { getDownloadURL, listAll, ref, uploadBytes } from "firebase/storage";
import { addDoc, collection } from "firebase/firestore";

export default function CreateListing() {
  const [address, setAddress] = useState("");
  const [images, setImages] = useState(null);

  const [dataToSend, setDataToSend] = useState();

  const [coordinates, setCoordinates] = useState({ lat: 0, lng: 0 });
  const [FormData, setFormData] = useState({
    Name: "",
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
  });

  const {
    Name,
    type,
    bedrooms,
    bathroom,
    parking,
    furnished,
    offer,
    regularPrice,
    discountedPrice,
  } = FormData;
  useEffect(() => {
    setDataToSend();
  }, []);
  useEffect(() => {
    console.log(dataToSend);
  }, [dataToSend]);

  const onMutate = (e) => {
    if (e.target.files) {
      setImages(e.target.files);
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
  };

  const handleKeyDown = (event) => {
    event.preventDefault();
    handleSelect(address);
  };

  // const handleFormSubmit = async (e) => {
  //   e.preventDefault();

  //   const uploadingImages = async () => {
  //     for (let i = 0; i < images.length; i++) {
  //       const file = images[i];
  //       const imagesRef = ref(
  //         storage,
  //         `${auth.currentUser.uid}+${Name}/${file.name}`
  //       );

  //       try {
  //         await uploadBytes(imagesRef, file);
  //         console.log("image uploaded");
  //       } catch (e) {
  //         console.log("error", e.message);
  //       }
  //     }
  //   };

  //   const AllinOneTask = async () => {
  //     let AllUrls = [];
  //     const storageRef = ref(storage, `${auth.currentUser.uid}+${Name}/`);
  //     await listAll(storageRef)
  //       .then((result) => {
  //         result.items.forEach((itemRef) => {
  //           getDownloadURL(itemRef)
  //             .then((url) => {
  //               AllUrls.push(url);
  //             })
  //             .catch((error) => {
  //               console.log(error);
  //             });
  //         });
  //       })
  //       .then(() => {
  //         setDataToSend({
  //           ...FormData,
  //           geolocation: { lat: coordinates.lat, lng: coordinates.lng },
  //           imgUrls: AllUrls,
  //           timestamp: serverTimestamp(),
  //         });
  //       })
  //       .then(async () => {
  //         try {
  //           await addDoc(collection(db, "listings"), dataToSend);
  //           console.log(dataToSend, "is sent");
  //         } catch (e) {
  //           console.error("Error adding document: ", e);
  //         }
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //       });
  //   };

  //   await uploadingImages();
  //   await AllinOneTask();
  // };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    let dataToSend = {};

    const uploadingImages = async () => {
      for (let i = 0; i < images.length; i++) {
        const file = images[i];
        const imagesRef = ref(
          storage,
          `${auth.currentUser.uid}+${Name}/${file.name}`
        );

        try {
          await uploadBytes(imagesRef, file);
          console.log("image uploaded");
        } catch (e) {
          console.log("error", e.message);
        }
      }

      // Set dataToSend once all images have been uploaded
      const AllUrls = [];
      const storageRef = ref(storage, `${auth.currentUser.uid}+${Name}/`);

      try {
        const result = await listAll(storageRef);
        for (let i = 0; i < result.items.length; i++) {
          const itemRef = result.items[i];
          const url = await getDownloadURL(itemRef);
          AllUrls.push(url);
        }

        dataToSend = {
          ...FormData,
          geolocation: { lat: coordinates.lat, lng: coordinates.lng },
          imgUrls: AllUrls,
          timestamp: serverTimestamp(),
        };

        console.log("dataToSend set:", dataToSend);
      } catch (error) {
        console.log(error);
      }
    };

    const AllinOneTask = async () => {
      try {
        await addDoc(collection(db, "listings"), dataToSend);
        console.log(dataToSend, "is sent");
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    };

    await new Promise((resolve, reject) => {
      uploadingImages()
        .then(() => {
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });

    await AllinOneTask();
  };

  return (
    <div className="all-parent">
      <h2>Rent/Sell Your House</h2>
      <div className="create-listing-parent">
        <form className="create-listing-form" onSubmit={handleFormSubmit}>
          <div className="input-section">
            <p>Title : </p>
            <p> </p>
            <input
              className="input-listing-title"
              type="text"
              placeholder="Title of your listing"
              id="Name"
              value={Name}
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
            <div className="images-input">
              {" "}
              <input
                type="file"
                name="files"
                multiple
                placeholder="Longitude of your listing"
                id="images"
                onChange={onMutate}
                // required
              />
            </div>
          </div>

          <div className="input-section">
            <button className="input-submit-button">Add Listing</button>
          </div>
        </form>
      </div>
    </div>
  );
}
