import "./NavBar.css";
import React from "react";
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";

function NavBar() {
  const [token] = useCookies(["sessionToken"]);

  const isLoggedIn = token["sessionToken"] ? true : false;

  return (
    <div>
      <div className="navbar">
        <ul>
          <li>
            <Link to="/">VandyPool</Link>
          </li>

          {isLoggedIn && (
            <li>
              <Link to="/AccountInfo">Account Info</Link>
            </li>
          )}
          {isLoggedIn && (
            <li>
              <Link to="/ConnectPassengers">Connect With Passengers</Link>
            </li>
          )}
          {isLoggedIn && (
            <li>
              <Link to="/FlightInfo">Flight Info</Link>
            </li>
          )}
          {isLoggedIn && (
            <li>
              <Link to="/ViewDrivers">View Drivers</Link>
            </li>
          )}
          {isLoggedIn && (
            <li>
              <Link to="/CurrTimeslots">View Current Timeslots</Link>
            </li>
          )}

          {isLoggedIn && (
            <li>
              <Link to="/LogOut">Log Out</Link>
            </li>
          )}

          {!isLoggedIn && (
            <li>
              <Link to="/LogIn">Log In</Link>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}

export default NavBar;
