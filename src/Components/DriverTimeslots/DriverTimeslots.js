import "./DriverTimeslots.css";
import React from "react";
import { Link } from "react-router-dom";

function DriverTimeslots() {
  return (
    <div className="timeslots">
      <div>Test</div>
      <button>
        <Link to="/NewTimeslot">New Timeslot</Link>
      </button>
    </div>
  );
}
export default DriverTimeslots;
