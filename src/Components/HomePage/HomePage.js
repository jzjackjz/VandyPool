import "./HomePage.css";
import React from "react";
import HomePageLogo from "./HomePage.jpg";

function HomePage() {
  return (
    <div className="HomePageColumn">
      <div className="HomePage">
        <div className="Title">Save Money On Rides to the Airport</div>
        <div className="SubTitle">
          <div className="Box">Login</div>
          <div className="Box">Create Account</div>
        </div>
      </div>
      <div className="HomePageLogo">
        <img src={HomePageLogo} alt="logo" />
      </div>
    </div>
  );
}

export default HomePage;
