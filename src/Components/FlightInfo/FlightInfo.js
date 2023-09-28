import React, { useState } from 'react';
import "./FlightInfo.css";

function FlightInfo() {
    const [time, setTime] = useState('');
    const [date, setDate] = useState('');
    const [dropoff, setDropoff] = useState('');
    const [airline, setAirline] = useState('');
    const [option, setOption] = useState('');  
  
    const handleSubmit = () => {
    };
  
    return (
      <div className="flight-registration-container">
        <h1>Flight Registration</h1>
  
        <select value={option} onChange={e => setOption(e.target.value)}>
        <option value="" disabled>Select Type of Ride</option>
        <option value="dropoff">Dropoff</option>
        <option value="pickup">Pickup</option>
      </select>
        
        <input type="text" placeholder="Flight Time" value={time} onChange={e => setTime(e.target.value)} />
        <input type="date" placeholder="Flight Date" value={date} onChange={e => setDate(e.target.value)} />
        <input type="text" placeholder="Dropoff Point" value={dropoff} onChange={e => setDropoff(e.target.value)} />
        <input type="text" placeholder="Airline" value={airline} onChange={e => setAirline(e.target.value)} />
        <button onClick={handleSubmit}>Submit</button>
      </div>
    );
  }

export default FlightInfo;