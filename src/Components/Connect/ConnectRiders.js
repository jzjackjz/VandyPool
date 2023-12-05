import "./ConnectRiders.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

function ConnectRiders() {
  const navigate = useNavigate();
  const [passengers, setPassengers] = useState([]);
  const username = localStorage.getItem("username");

  const location = useLocation();
  const { date } = location.state || {};

  useEffect(() => {
    fetchFlights();
  }, []);

  async function fetchFlights() {
    try {
      const searchResponse = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/flights/`
      );
      const filtered = searchResponse.data.filter(
        (obj) => obj.user !== username && obj.flight_date === date
      );
      setPassengers(filtered);
    } catch (error) {
      console.log("Something went wrong when fetching the passengers, please refresh page");
    }
  }

  async function contactPassengers(id) {
    try {
      const selectedPassenger = passengers.find(
        (passenger) => passenger.id === id
      );
      navigate("/ContactPassenger", {
        state: { passenger: selectedPassenger },
      });

      window.location.reload();
    } catch (error) {
      console.log("Something went wrong when selecting the passenger, please try again");
    }
  }

  function handleOtherFlights() {
    navigate("/FlightInfo");
  }

  return (
    <div className="connect">
      <h1>Passengers Avaialble For {date}</h1>
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
                  <button onClick={() => contactPassengers(item.id)}>
                    {">"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div>
        <button onClick={() => handleOtherFlights()}>
          Browse Other Flights
        </button>
      </div>
    </div>
  );
}
export default ConnectRiders;
