import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import AccountInfo from "./Components/AccountInfo/AccountInfo";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/AccountInfo" element={<AccountInfo />} />
      <Route path="/ConnectPassengers" element={<App />} />
      <Route path="/FlightInfo" element={<App />} />
      <Route path="/ViewDrivers" element={<App />} />
    </Routes>
  </BrowserRouter>
);

reportWebVitals();
