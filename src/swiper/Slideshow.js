import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from "@firebase/firestore";
import React, { useEffect, useState } from "react";

import { db } from "../firebaseconfig/config";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "./styles.css";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/autoplay";

// import "./styles.css";
import { toast } from "react-toastify";

// import required modules

export default function Slideshow() {
  const [Listings, setListings] = useState([]);
  const [Loading, setLoading] = useState(true);

  useEffect(() => {
    const Fetchlistings = async () => {
      try {
        const listingRef = collection(db, "listings");
        const q = query(
          listingRef,
          where("offer", "==", true),
          orderBy("timestamp", "desc"),
          limit(10)
        );

        const querySnap = await getDocs(q);
        let listings = [];
        querySnap.forEach((doc) => {
          return listings.push({
            id: doc.id,
            data: doc.data(),
          });
        });

        setListings(listings);
        setLoading(false);
      } catch (e) {
        setLoading(false);

        toast.error("Sorry, Could not fetch listings");
      }
    };
    Fetchlistings();
  }, []);

  return (
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
      {Listings.length > 0 &&
        Loading === false &&
        Listings.map((listing) => {
          return (
            <SwiperSlide key={Math.random()}>
              {/* <div className="slide-div"> */}
              <h4 className="image-title">{listing.data.Name}</h4>
              <img
                className="image-slide"
                src={listing.data.imgUrls[0]}
                alt={listing.data.Name}
              />
              {/* </div>{" "} */}
            </SwiperSlide>
          );
        })}
    </Swiper>
  );
}
