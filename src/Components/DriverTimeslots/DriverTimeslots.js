import "./DriverTimeslots.css";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function DriverTimeslots() {
  const [timeslots, setTimeslots] = useState([]);

  async function fetchTimeslots() {
    try {
      const searchResponse = await axios.get("http://127.0.0.1:8000/timeslot/");
      setTimeslots(searchResponse.data);
    } catch (error) {
      alert(
        "Something went wrong when fetching the timeslots, please refresh page"
      );
    }
  }

  useEffect(() => {
    fetchTimeslots();
  }, []);

  return (
    <div className="timeslots">
      <h1>Your Current Time Slots</h1>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Time</th>
            <th>Space Available</th>
          </tr>
        </thead>
        <tbody>
          {timeslots.map((item) => (
            <tr key={item.id}>
              <td>{item.date}</td>
              <td>{item.time}</td>
              <td>{item.space_available}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button>
        <Link to="/NewTimeslot">New Timeslot</Link>
      </button>
    </div>
  );
}
export default DriverTimeslots;
