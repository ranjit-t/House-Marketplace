import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from "@firebase/firestore";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { db } from "../firebaseconfig/config";
import ListingItems from "./ListingItems";

export default function Category() {
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
    <div className="all-parent">
      <h1>Offers</h1>

      {Loading ? (
        <p style={{ marginTop: "100px" }}>...Loading</p>
      ) : Listings.length > 0 ? (
        <>
          <main>
            <ul style={{ marginBottom: "100px" }}>
              {Listings.map((listing) => {
                return (
                  <li key={listing.id}>
                    <ListingItems listing={listing.data} id={listing.id} />
                  </li>
                );
              })}
            </ul>
            <p>-</p>
          </main>
        </>
      ) : (
        <p className="no-items">There are no Offers at the moment</p>
      )}
    </div>
  );
}
