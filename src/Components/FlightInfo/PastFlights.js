import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function PastFlights() {
  const [flights, setFlights] = useState([]);
  const username = localStorage.getItem("username");

  function convertToCentralTime(date) {
    return new Date(date).toLocaleString("en-US", {
      timeZone: "America/Chicago",
    });
  }

  function isPastDate(flightDate, currentDate) {
    const flight = new Date(flightDate);
    const current = new Date(currentDate);

    flight.setHours(0, 0, 0, 0);
    current.setHours(0, 0, 0, 0);
    flight.setDate(flight.getDate() + 1);

    return flight < current;
  }

  async function fetchPastFlights() {
    try {
      const searchResponse = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/flights/?username=${username}`
      );
      const todayCentralTime = convertToCentralTime(new Date());
      const pastFlights = searchResponse.data.filter((flight) => {
        const flightDateCentralTime = convertToCentralTime(flight.flight_date);
        return isPastDate(flightDateCentralTime, todayCentralTime);
      });
      setFlights(pastFlights);
    } catch (error) {
      alert(
        "Something went wrong when fetching past flights, please refresh the page"
      );
    }
  }

  useEffect(() => {
    fetchPastFlights();
  }, []);

  return (
    <div className="flights">
      <h1>Your Past Flights</h1>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Ride Type</th>
              <th>Time</th>
              <th>Date</th>
              <th>Dropoff/Pickup</th>
              <th>Airline</th>
            </tr>
          </thead>
          <tbody>
            {flights.map((item) => (
              <tr key={item.id}>
                <td>{item.ride_type}</td>
                <td>{item.flight_time}</td>
                <td>{item.flight_date}</td>
                <td>{item.dropoff_point}</td>
                <td>{item.airline}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="buttons">
        <button style={{ width: "15%" }}>
          <Link to="/FlightInfo">Back to Current Flights</Link>
        </button>
      </div>
    </div>
  );
}

export default PastFlights;
