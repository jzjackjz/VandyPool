import React, { useState } from "react";
import "./FlightInfo.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function FlightInfo() {
  const [option, setOption] = useState("");
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");
  const [dropoff, setDropoff] = useState("");
  const [airline, setAirline] = useState("");
  const navigate = useNavigate();
  const username = localStorage.getItem("username");

  async function handleSubmit() {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/flights/`,
        {
          ride_type: option,
          flight_time: time,
          flight_date: date,
          dropoff_point: dropoff,
          airline: airline,
          user: username,
        }
      );
      navigate("/FlightInfo", { replace: true });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="flight-registration-container">
      <h1>Flight Registration</h1>

      <select value={option} onChange={(e) => setOption(e.target.value)}>
        <option value="" disabled>
          Select Type of Ride
        </option>
        <option value="Departure">Departure</option>
        <option value="Arrival">Arrival</option>
      </select>

      <input
        type="time"
        placeholder="Flight Time"
        value={time}
        onChange={(e) => setTime(e.target.value)}
      />
      <input
        type="date"
        placeholder="Flight Date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      <input
        type="text"
        placeholder="Location"
        value={dropoff}
        onChange={(e) => setDropoff(e.target.value)}
      />
      <input
        type="text"
        placeholder="Airline"
        value={airline}
        onChange={(e) => setAirline(e.target.value)}
      />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}

export default FlightInfo;
