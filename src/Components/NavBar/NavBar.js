import "./NavBar.css";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../AuthContext";
import axios from "axios";

function NavBar() {

  const { isAuthenticated } = useAuth();
  const [isDriver, setIsDriver] = useState(false);
  const username = localStorage.getItem("username");

  useEffect(() => {
    checkStatus();
  }, []);

  async function checkStatus(){
    try {
        const searchResponse = await axios.get(
          `${process.env.REACT_APP_API_BASE_URL}/driver/?username=${username}`
        );
        console.log(searchResponse.data.length)

        if (searchResponse.data.length > 0) {
          setIsDriver(true);
        } else {
          setIsDriver(false);
        }

      } catch (error) {
        setIsDriver(false);
      }

    }

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
              {isDriver && (
                <li>
                  <Link to="/CurrTimeslots" className="nav-button">Drivers</Link>
                </li>
              )}
              {!isDriver && (
                <li>
                  <Link to="/OtherPageForNonDrivers" className="nav-button">Drivers</Link>
                </li>
              )}
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