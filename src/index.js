import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { CookiesProvider } from "react-cookie";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import AccountInfo from "./Components/AccountInfo/AccountInfo";
import DriverSignUp from "./Components/CreateAccount/DriverSignUp";
import NavBar from "./Components/NavBar/NavBar";
import RiderSignUp from "./Components/CreateAccount/RiderSignUp";
import LogIn from "./Components/LogIn/LogIn";
import AllFlights from "./Components/FlightInfo/AllFlights";
import DriverTimeslots from "./Components/DriverTimeslots/DriverTimeslots";
import NewTimeslots from "./Components/DriverTimeslots/NewTimeslots";
import FlightInfo from "./Components/FlightInfo/FlightInfo";
import LogOut from "./Components/LogIn/LogOut";
import EditBasicInfo from "./Components/AccountInfo/EditBasicInfo";
import { UserProvider } from "./UserContext";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { AuthProvider } from "./AuthContext";
import ConnectDrivers from "./Components/Connect/ConnectDrivers";
import ConnectRiders from "./Components/Connect/ConnectRiders";
import ContactDriver from "./Components/Contact/ContactDriver";
import PastFlights from "./Components/FlightInfo/PastFlights";
import ContactPassenger from "./Components/Contact/ContactPassenger";
import OtherPageForNonDrivers from "./Components/AccountInfo/OtherPageForNonDrivers"

const root = ReactDOM.createRoot(document.getElementById("root"));
const googleClientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

root.render(
  <AuthProvider>
    <GoogleOAuthProvider clientId={googleClientId}>
      <CookiesProvider>
        <BrowserRouter>
          <UserProvider>
            <NavBar />
            <Routes>
              <Route path="/" element={<App />} />
              <Route path="/LogIn" element={<LogIn />} />
              <Route path="/LogOut" element={<LogOut />} />
              <Route path="/RiderSignUp" element={<RiderSignUp />} />
              <Route path="/ContactDrivers" element={<ContactDriver />} />
              <Route path="/ContactPassenger" element={<ContactPassenger />} />
              <Route path="/DriverInfo" element={<DriverSignUp />} />
              <Route path="/AccountInfo" element={<AccountInfo />} />
              <Route path="/ConnectPassengers" element={<ConnectRiders />} />
              <Route path="/ConnectDrivers" element={<ConnectDrivers />} />
              <Route path="/FlightInfo" element={<AllFlights />} />
              <Route path="/AddFlight" element={<FlightInfo />} />
              <Route path="/PastFlights" element={<PastFlights />} />
              <Route path="/CurrTimeslots" element={<DriverTimeslots />} />
              <Route path="/NewTimeslot" element={<NewTimeslots />} />
              <Route path="/EditBasicInfo" element={<EditBasicInfo />} />
              <Route path="/OtherPageForNonDrivers" element={<OtherPageForNonDrivers />} />
            </Routes>
          </UserProvider>
        </BrowserRouter>
      </CookiesProvider>
    </GoogleOAuthProvider>
  </AuthProvider>
);

reportWebVitals();
