import "./ViewDrivers.css";
import React from "react";
import { Link } from "react-router-dom";

function ViewDrivers() {
  return (
    <div className="view_drivers_container">
      <h1>Available Drivers</h1> 
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Time</th>
                <th>Date</th>
                <th>Number of Seats</th>
              </tr>
            </thead>
          </table>
    </div>
  );
}

export default ViewDrivers;
