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
            <Link to="/LogIn">Login</Link>
          </button>
          <button className="Box">
            <Link to="/CreateAccount">Create Account</Link>
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
