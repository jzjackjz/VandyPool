import "./ConnectRiders.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

function ConnectRiders() {
  const [passengers, setPassengers] = useState([]);
  const username = localStorage.getItem("username");

  const location = useLocation();
  const { flight } = location.state || {};

  useEffect(() => {
    fetchFlights();
  }, []);

  async function fetchFlights() {
    try {
      const searchResponse = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/flights/`
      );
      const filtered = searchResponse.data.filter(
        (obj) => obj.user !== username && obj.flight_date === flight.flight_date
      );
      setPassengers(filtered);
    } catch (error) {
      alert(
        "Something went wrong when fetching the passengers, please refresh page"
      );
    }
  }

  return (
    <div className="connect">
      <h1>Passengers Avaialble For {flight.flight_date}</h1>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Passenger Username</th>
              <th>Date</th>
              <th>Time</th>
              <th>Dropoff Point</th>
              <th>Airline</th>
              <th>Ride Type</th>
              <th>Contact Passenger</th>
            </tr>
          </thead>
          <tbody>
            {passengers.map((item) => (
              <tr key={item.id}>
                <td>{item.user}</td>
                <td>{item.flight_date}</td>
                <td>{item.flight_time}</td>
                <td>{item.dropoff_point}</td>
                <td>{item.airline}</td>
                <td>{item.ride_type}</td>
                <td>
                  <button> Connect</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
export default ConnectRiders;
