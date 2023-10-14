import "./NewTimeslots.css";
import React, { useState } from "react";
import { Link } from "react-router-dom";

function NewTimeslots() {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [spotsAvail, setSpotsAvail] = useState("");

  const handleSubmit = () => {
    // TODO: handle when submit button is clicked
  };

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
