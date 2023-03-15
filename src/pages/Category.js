import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from "@firebase/firestore";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { toast } from "react-toastify";
import { db } from "../firebaseconfig/config";
import ListingItems from "./ListingItems";

export default function Category() {
  const { categoryName } = useParams();
  const [Listings, setListings] = useState([]);
  const [Loading, setLoading] = useState(true);

  useEffect(() => {
    const Fetchlistings = async () => {
      try {
        const listingRef = collection(db, "listings");
        const q = query(
          listingRef,
          where("type", "==", categoryName),
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
        console.log(e.message);
        toast.error("Sorry, Could not fetch listings");
      }
    };
    Fetchlistings();
  }, [categoryName]);

  console.log(Listings);

  return (
    <div className="all-parent">
      <h1>Category</h1>
      {/* <h2>{categoryName}</h2> */}
      {Loading ? (
        <p>...Loading</p>
      ) : Listings.length > 0 ? (
        <>
          <main>
            <ul>
              {Listings.map((listing) => {
                return (
                  <li key={listing.id}>
                    {/* <h3>{listing.data.Name}</h3> */}
                    <ListingItems listing={listing.data} id={listing.id} />
                  </li>
                );
              })}
            </ul>
          </main>
        </>
      ) : (
        <p>No Listing for {categoryName}</p>
      )}
    </div>
  );
}
