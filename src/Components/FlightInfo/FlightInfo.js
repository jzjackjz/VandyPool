import React, { useState } from 'react';
import "./FlightInfo.css";

function FlightInfo() {
    const [time, setTime] = useState('');
    const [dropoff, setDropoff] = useState('');
    const [airline, setAirline] = useState('');
    const [option, setOption] = useState('');  // New state to handle dropdown selection
  
    const handleSubmit = () => {
      // TODO: handle form submission based on the selected option
    };
  
    return (
      <div className="flight-registration-container">
        <h1>Flight Registration</h1>
  
        {/* New Dropdown */}
        <select value={option} onChange={e => setOption(e.target.value)}>
        <option value="" disabled>Select Type of Ride</option> {/* New default option */}
        <option value="dropoff">Dropoff</option>
        <option value="pickup">Pickup</option>
      </select>
        
        <input type="text" placeholder="Flight Time" value={time} onChange={e => setTime(e.target.value)} />
        <input type="text" placeholder="Dropoff Point" value={dropoff} onChange={e => setDropoff(e.target.value)} />
        <input type="text" placeholder="Airline" value={airline} onChange={e => setAirline(e.target.value)} />
        <button onClick={handleSubmit}>Submit</button>
      </div>
    );
  }

export default FlightInfo;