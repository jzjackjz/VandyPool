import "./NavBar.css";
import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../AuthContext";

function NavBar() {

  const { isAuthenticated } = useAuth();

  return (
    <div>
      <div className="navbar">
        <ul>
          <li>
            <Link to="/">VandyPool</Link>
          </li>

          {isAuthenticated && (
            <>
              <li>
                <Link to="/AccountInfo">Account Info</Link>
              </li>
              <li>
                <Link to="/ConnectPassengers">Connect With Passengers</Link>
              </li>
              <li>
                <Link to="/FlightInfo">Flight Info</Link>
              </li>
              <li>
                <Link to="/ViewDrivers">View Drivers</Link>
              </li>
              <li>
                <Link to="/CurrTimeslots">View Current Timeslots</Link>
              </li>
              <li>
                <Link to="/LogOut">Log Out</Link>
              </li>
            </>
          )}

          {!isAuthenticated && (
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