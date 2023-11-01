import axios from "axios";
import "./NewTimeslots.css";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../../UserContext";

function NewTimeslots() {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [spotsAvail, setSpotsAvail] = useState("");
  const navigate = useNavigate();
  const user = useUser();

  async function handleSubmit() {
    try {
      const searchResponse = await axios.post(
        "http://127.0.0.1:8000/timeslot/",
        {
          date: date,
          time: time,
          space_available: spotsAvail,
          username: user.user,
        }
      );
      navigate("/CurrTimeslots");
    } catch (error) {
      alert(
        "Something went wrong when creating a new timeslot, please try again"
      );
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
        <button onClick={handleSubmit}>Submit</button>
        <button className="buttonLink">
          <Link to="/CurrTimeslots">Cancel</Link>
        </button>
      </div>
    </div>
  );
}
export default NewTimeslots;
