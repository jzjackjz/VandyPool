import React, { useState } from 'react';
import "./FlightInfo.css";
import APIService from '../../APIService';
import { useNavigate } from "react-router-dom";

function FlightInfo() {
    const [option, setOption] = useState('');  
    const [time, setTime] = useState('');
    const [date, setDate] = useState('');
    const [dropoff, setDropoff] = useState('');
    const [airline, setAirline] = useState('');
    const navigate = useNavigate();
  
    const handleSubmit = () => {
      const sessionToken = localStorage.getItem('sessionToken');

      APIService.InsertFlightInformation({
        ride_type: option,
        flight_time: time,
        flight_date: date,
        dropoff_point: dropoff,
        airline: airline
      }, sessionToken)
      .then(resp => console.log(resp))
      navigate("/FlightInfo")
    };
  
    return (
      <div className="flight-registration-container">
        <h1>Flight Registration</h1>
  
        <select value={option} onChange={e => setOption(e.target.value)}>
        <option value="" disabled>Select Type of Ride</option>
        <option value="dropoff">Dropoff</option>
        <option value="pickup">Pickup</option>
      </select>
        
        <input type="time" placeholder="Flight Time" value={time} onChange={e => setTime(e.target.value)} />
        <input type="date" placeholder="Flight Date" value={date} onChange={e => setDate(e.target.value)} />
        <input type="text" placeholder="Dropoff Point" value={dropoff} onChange={e => setDropoff(e.target.value)} />
        <input type="text" placeholder="Airline" value={airline} onChange={e => setAirline(e.target.value)} />
        <button onClick={handleSubmit}>Submit</button>
      </div>
    );
  }

export default FlightInfo;