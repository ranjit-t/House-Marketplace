import { useParams } from "react-router-dom";
import React, { useEffect, useState, useRef } from "react";
import { db } from "../firebaseconfig/config";
import { Loader } from "@googlemaps/js-api-loader";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "./SingleListing.css";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/autoplay";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper";

import { collection, getDocs } from "@firebase/firestore";
import { toast } from "react-toastify";
// import { Toast } from "react-toastify/dist/components";

export default function SingleListing() {
  //   const [Listings, setListings] = useState([]);
  const [currentListing, setCurrentListing] = useState([]);
  const { listingName } = useParams();
  // For Map
  const [map, setMap] = useState(null);
  const mapContainerRef = useRef(null);
  const google = window.google;
  useEffect(() => {
    const Fetchlistings = async () => {
      try {
        const listingRef = collection(db, "listings");
        const querySnap = await getDocs(listingRef);
        let listings = [];
        querySnap.forEach((doc) => {
          return listings.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        // console.log(listings);
        setCurrentListing(
          listings.filter(
            (listing) =>
              listing.data.userRef + listing.data.Name.replace(/ /g, "") ===
              listingName
          )
        );
      } catch (e) {
        toast.error("Sorry, Could not fetch listings");
      }
    };
    Fetchlistings();
  }, [listingName]);

  useEffect(() => {
    const loader = new Loader({
      apiKey: "AIzaSyDvgwIxdIBwD_sQR3DxJthQlQNuGqKG0Eo",
      version: "weekly",
    });

    loader.load().then(() => {
      const map = new google.maps.Map(mapContainerRef.current, {
        center: {
          lat: currentListing[0].data.geolocation.lat,
          lng: currentListing[0].data.geolocation.lng,
        },
        zoom: 15,
      });

      new google.maps.Marker({
        position: {
          lat: currentListing[0].data.geolocation.lat,
          lng: currentListing[0].data.geolocation.lng,
        },
        map: map,
      });

      setMap(map);
    });
  }, [currentListing, google.maps.Map, google.maps.Marker]);

  console.log(map);

  return (
    <div>
      {currentListing.length === 1 ? (
        <div>
          <div className="singl-listing-features">
            <Swiper
              spaceBetween={30}
              centeredSlides={true}
              autoplay={{
                delay: 2500,
                disableOnInteraction: false,
              }}
              pagination={{
                clickable: true,
              }}
              navigation={false}
              modules={[Autoplay, Pagination, Navigation]}
              className="mySwiper"
            >
              {currentListing[0].data.imgUrls.length > 0 &&
                currentListing[0].data.imgUrls.map((listing) => {
                  return (
                    <SwiperSlide key={Math.random()}>
                      <img
                        className="image-slide"
                        src={listing}
                        alt={listing}
                      />
                    </SwiperSlide>
                  );
                })}
            </Swiper>
            <div>
              <h3 className="current-listing-title">
                {currentListing[0].data.Name}
              </h3>
            </div>
            <div>
              <p>Location : {currentListing[0].data.location}</p>
              <p>
                Type : <b>{currentListing[0].data.type}</b>
              </p>
              <p>
                Number of Bedrooms : <b>{currentListing[0].data.bedrooms}</b>
              </p>
              <p>
                Number of Bathrooms : <b>{currentListing[0].data.bathroom}</b>
              </p>
              <p>
                Is it furnished ? :{" "}
                <b>{currentListing[0].data.furnished ? "Yes" : " No"}</b>
              </p>
              <p>
                Does it have a parking place ? :{" "}
                <b>{currentListing[0].data.parking ? "Yes" : " No"}</b>
              </p>
            </div>
            <div className="listing-price">
              {currentListing[0].data.offer === true &&
                currentListing[0].data.type === "rent" && (
                  <div>
                    <p className="regular-price">
                      {currentListing[0].data.regularPrice &&
                        `${currentListing[0].data.regularPrice}€ / month`}
                    </p>
                    <p>{`Price : ${currentListing[0].data.discountedPrice}€ / month`}</p>
                  </div>
                )}
              {currentListing[0].data.offer === true &&
                currentListing[0].data.type === "sale" && (
                  <div>
                    <p className="regular-price">
                      {currentListing[0].data.regularPrice &&
                        `${currentListing[0].data.regularPrice}€`}
                    </p>
                    <p>{`Price : ${currentListing[0].data.discountedPrice}€`}</p>
                  </div>
                )}
              {currentListing[0].data.offer === false &&
                currentListing[0].data.type === "rent" && (
                  <div>
                    <p>
                      {currentListing[0].data.regularPrice &&
                        `${currentListing[0].data.regularPrice}€ / month`}
                    </p>
                  </div>
                )}
              {currentListing[0].data.offer === false &&
                currentListing[0].data.type === "sale" && (
                  <div>
                    <p>
                      {currentListing[0].data.regularPrice &&
                        `${currentListing[0].data.regularPrice}€`}
                    </p>
                  </div>
                )}
              <div className="map-display">
                <div ref={mapContainerRef} style={{ height: "500px" }}></div>
              </div>
            </div>
          </div>
          <p>-</p>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}
