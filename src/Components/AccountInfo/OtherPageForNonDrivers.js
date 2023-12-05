import React from "react";
import { useNavigate } from "react-router-dom";
import "./OtherPageForNonDrivers.css";


function OtherPageForNonDrivers() {
    let navigate = useNavigate();

    return (
        <div className="log-in-container">
          <h1>Must be a Driver to access</h1>
          <div className="register-container">
            <button className="register-button" onClick={() => navigate("/AccountInfo")}>
              Register to drive here
            </button>
          </div>
        </div>
    );
}

export default OtherPageForNonDrivers;