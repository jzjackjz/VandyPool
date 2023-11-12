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
          {!isAuthenticated && (
            <li>
              <Link to="/">VandyPool</Link>
            </li>
          )}

          {isAuthenticated && (
            <>
              <li>
                <Link to="/AccountInfo" className="nav-button">My Account</Link>
              </li>
              <li>
                <Link to="/FlightInfo" className="nav-button">Riders</Link>
              </li>
              <li>
                <Link to="/CurrTimeslots" className="nav-button">Drivers</Link>
              </li>
              <li>
                <Link to="/LogOut" className="nav-button">Log Out</Link>
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