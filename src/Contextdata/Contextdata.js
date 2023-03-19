import { collection, getDocs } from "firebase/firestore";
import { createContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import { db } from "../firebaseconfig/config";

export const ListingContext = createContext(null);

export function ListingContextProvider({ children }) {
  const [listings, setListings] = useState("");

  useEffect(() => {
    const Fetchlistings = async () => {
      try {
        const listingRef = collection(db, "listings");
        const querySnap = await getDocs(listingRef);
        let listingsfetched = [];
        querySnap.forEach((doc) => {
          return listingsfetched.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        setListings(listingsfetched);
      } catch (e) {
        toast.error("Sorry, Could not fetch listings");
      }
    };
    Fetchlistings();
  }, []);

  return (
    <ListingContext.Provider value={{ listings }}>
      {children}
    </ListingContext.Provider>
  );
}
