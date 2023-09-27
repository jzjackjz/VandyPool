import "./NavBar.css";
import React from "react";
import { Link } from "react-router-dom";

function NavBar() {
  return (
    <div>
      <nav className="navbar">
        <ul>
          <li>
            <Link to="/">VandyPool</Link>
          </li>
          <li>
            <Link to="/AccountInfo">Account Info</Link>
          </li>
          <li>
            <Link to="/ConnectPassengers">Connect With Passengers</Link>
          </li>
          <li>
            <Link to="/FlightInfo">Enter Flight Info</Link>
          </li>
          <li>
            <Link to="/ViewDrivers">View Drivers</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default NavBar;
