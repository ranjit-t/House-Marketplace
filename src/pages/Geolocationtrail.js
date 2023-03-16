// // import React, { useState } from "react";
// // import PlacesAutocomplete, {
// //   geocodeByAddress,
// //   getLatLng,
// // } from "react-places-autocomplete";

// // function Geolocationtrial() {
// //   const [address, setAddress] = useState("");
// //   const [coordinates, setCoordinates] = useState({ lat: null, lng: null });

// //   const handleSelect = async (value) => {
// //     const results = await geocodeByAddress(value);
// //     const latLng = await getLatLng(results[0]);
// //     setAddress(value);
// //     setCoordinates(latLng);
// //   };

// //   return (
// //     <div>
// //       <p>
// //         Latitude: {coordinates.lat}, Longitude: {coordinates.lng}
// //       </p>
// //       <PlacesAutocomplete
// //         value={address}
// //         onChange={setAddress}
// //         onSelect={handleSelect}
// //         searchOptions={{ types: ["address"] }}
// //         debounce={500}
// //         shouldFetchSuggestions={address.length > 2}
// //         googleMapsApiKey="AIzaSyDvgwIxdIBwD_sQR3DxJthQlQNuGqKG0Eo"
// //       >
// //         {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
// //           <div>
// //             <input {...getInputProps({ placeholder: "Enter an address" })} />
// //             <div>
// //               {loading ? <div>Loading...</div> : null}

// //               {suggestions.map((suggestion) => {
// //                 const style = {
// //                   backgroundColor: suggestion.active ? "#41b6e6" : "#fff",
// //                 };

// //                 return (
// //                   <div {...getSuggestionItemProps(suggestion, { style })}>
// //                     {suggestion.description}
// //                   </div>
// //                 );
// //               })}
// //             </div>
// //           </div>
// //         )}
// //       </PlacesAutocomplete>
// //     </div>
// //   );
// // }

// // export default Geolocationtrial;

// import React, { useState } from "react";
// import PlacesAutocomplete, {
//   geocodeByAddress,
//   getLatLng,
// } from "react-places-autocomplete";

// function Geolocationtrial() {
//   const [address, setAddress] = useState("");
//   const [coordinates, setCoordinates] = useState({ lat: null, lng: null });

//   const handleSelect = async (value) => {
//     const results = await geocodeByAddress(value);
//     const latLng = await getLatLng(results[0]);
//     setAddress(value);
//     setCoordinates(latLng);
//   };

//   const handleKeyDown = (event) => {
//     if (event.key === "Enter") {
//       handleSelect(address);
//     }
//   };

//   return (
//     <div>
//       <p>
//         Latitude: {coordinates.lat}, Longitude: {coordinates.lng}
//       </p>
//       <input
//         className="input-listing-title"
//         placeholder="Enter an address"
//         value={address}
//         onChange={(event) => setAddress(event.target.value)}
//         onKeyDown={handleKeyDown}
//       />
//     </div>
//   );
// }

// export default Geolocationtrial;
