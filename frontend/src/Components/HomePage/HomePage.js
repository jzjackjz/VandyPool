import "./HomePage.css";
import React from "react";
import HomePageLogo from "./HomePage.jpg";
import { Link } from "react-router-dom";

function HomePage() {
  return (
    <div className="HomePageColumn">
      <div className="HomePage">
        <div className="Title">Save Money On Rides to the Airport</div>
        <div className="SubTitle">
          <button className="Box">
            <Link to="/RiderSignUp">Sign up to ride</Link>
          </button>
          <button className="Box">
            <Link to="/DriverSignUp">Sign up to drive</Link>
          </button>
        </div>
      </div>
      <div className="HomePageLogo">
        <img src={HomePageLogo} alt="logo" />
      </div>
    </div>
  );
}

export default HomePage;
