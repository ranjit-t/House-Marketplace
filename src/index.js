import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { ListingContextProvider } from "./Contextdata/Contextdata";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ListingContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ListingContextProvider>
  </React.StrictMode>
);
