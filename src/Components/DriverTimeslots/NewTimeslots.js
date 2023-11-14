import axios from "axios";
import "./NewTimeslots.css";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function NewTimeslots() {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [spotsAvail, setSpotsAvail] = useState("");
  const navigate = useNavigate();
  const username = localStorage.getItem("username");

  async function handleSubmit() {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/timeslot/`,
        {
          date: date,
          time: time,
          space_available: spotsAvail,
          user: username,
        }
      );
      navigate("/CurrTimeslots", { replace: true });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="timeslot">
      <h1>Add A New Timeslot</h1>
      <input
        type="date"
        placeholder="Select A Date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      <input
        type="time"
        placeholder="Select A Time"
        value={time}
        onChange={(e) => setTime(e.target.value)}
      />
      <input
        type="text"
        placeholder="Number of spots available"
        value={spotsAvail}
        onChange={(e) => setSpotsAvail(e.target.value)}
      />
      <div className="buttons">
        <button className="buttonLink">
          <Link to="/CurrTimeslots">Cancel</Link>
        </button>
        <button onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
}
export default NewTimeslots;
