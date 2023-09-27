import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import AccountInfo from "./Components/AccountInfo/AccountInfo";
import RiderSignUp from "./Components/LogIn/RiderSignUp";
import DriverSignUp from "./Components/CreateAccount/DriverSignUp";
import Footer from "./Components/Footer/Footer";
import NavBar from "./Components/NavBar/NavBar";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <NavBar />
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/RiderSignUp" element={<RiderSignUp />} />
      <Route path="/DriverSignUp" element={<DriverSignUp />} />
      <Route path="/AccountInfo" element={<AccountInfo />} />
      <Route path="/ConnectPassengers" element={<App />} />
      <Route path="/FlightInfo" element={<App />} />
      <Route path="/ViewDrivers" element={<App />} />
    </Routes>
    <Footer />
  </BrowserRouter>
);

reportWebVitals();
