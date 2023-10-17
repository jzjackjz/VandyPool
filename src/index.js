import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { CookiesProvider } from "react-cookie";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import AccountInfo from "./Components/AccountInfo/AccountInfo";
import DriverSignUp from "./Components/CreateAccount/DriverSignUp";
import Footer from "./Components/Footer/Footer";
import NavBar from "./Components/NavBar/NavBar";
import RiderSignUp from "./Components/CreateAccount/RiderSignUp";
import LogIn from "./Components/LogIn/LogIn";
import AllFlights from "./Components/FlightInfo/AllFlights";
import DriverTimeslots from "./Components/DriverTimeslots/DriverTimeslots";
import NewTimeslots from "./Components/DriverTimeslots/NewTimeslots";
import Connect from "./Components/Connect/Connect";
import FlightInfo from "./Components/FlightInfo/FlightInfo";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <CookiesProvider>
  <BrowserRouter>
    <NavBar />
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/LogIn" element={<LogIn />} />
      <Route path="/RiderSignUp" element={<RiderSignUp />} />
      <Route path="/DriverSignUp" element={<DriverSignUp />} />
      <Route path="/AccountInfo" element={<AccountInfo />} />
      <Route path="/ConnectPassengers" element={<Connect />} />
      <Route path="/FlightInfo" element={<AllFlights />} />
      <Route path="/AddFlight" element={<FlightInfo />} />
      <Route path="/CurrTimeslots" element={<DriverTimeslots />} />
      <Route path="/NewTimeslot" element={<NewTimeslots />} />
      <Route path="/ViewDrivers" element={<App />} />
    </Routes>
    <Footer />
  </BrowserRouter>
  </CookiesProvider>
);

reportWebVitals();
