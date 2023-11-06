import axios from "axios";
import "./NewTimeslots.css";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../../UserContext";
import APIService from "../../APIService";

function NewTimeslots() {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [spotsAvail, setSpotsAvail] = useState("");
  const navigate = useNavigate();

  async function handleSubmit() {
    const sessionToken = localStorage.getItem("sessionToken");

    APIService.InsertTimeslot(
      {
        date: date,
        time: time,
        space_available: spotsAvail,
      },
      sessionToken
    )
      .then((resp) => console.log(resp))
      .catch((error) => console.error("Error:", error));

    navigate("/CurrTimeslots");
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
        <button onClick={handleSubmit}>Submit</button>
        <button className="buttonLink">
          <Link to="/CurrTimeslots">Cancel</Link>
        </button>
      </div>
    </div>
  );
}
export default NewTimeslots;
