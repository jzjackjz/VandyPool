import "./AllFlights.css";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Trash } from "react-bootstrap-icons";

function AllFlights() {
  const navigate = useNavigate();
  const [flights, setFlights] = useState([]);
  const username = localStorage.getItem("username");

  async function fetchFlights() {
    try {
      const searchResponse = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/flights/?username=${username}`
      );
      setFlights(searchResponse.data);
    } catch (error) {
      alert("Something went wrong when fetching flights, please refresh page");
    }
  }
  async function handleDelete(id) {
    try {
      const searchResponse = await axios.delete(
        `${process.env.REACT_APP_API_BASE_URL}/flights/` +
          id +
          `/?username=${username}`
      );
      window.location.reload();
    } catch (error) {
      alert("Something went wrong when deleting the flight, please try again");
    }
  }
  async function handleRiders(id) {
    try {
      const selectedFlight = flights.find((flight) => flight.id === id);
      navigate("/ConnectPassengers", { state: { flight: selectedFlight } });

      window.location.reload();
    } catch (error) {
      alert("Something went wrong when selecting the flight, please try again");
    }
  }

  async function handleDrivers(id) {
    try {
      const selectedFlight = flights.find((flight) => flight.id === id);
      navigate("/ConnectDrivers", { state: { flight: selectedFlight } });

      window.location.reload();
    } catch (error) {
      alert("Something went wrong when selecting the flight, please try again");
    }
  }

  useEffect(() => {
    fetchFlights();
  }, []);

  return (
    <div className="flights">
      <h1>Your Current Flights</h1>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Ride Type</th>
              <th>Time</th>
              <th>Date</th>
              <th>Dropoff/Pickup</th>
              <th>Airline</th>
              <th>View Passengers</th>
              <th>View Drivers</th>
              <th>Delete</th>
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
                <td>
                  <button onClick={() => handleRiders(item.id)}>Connect</button>
                </td>
                <td>
                  <button onClick={() => handleDrivers(item.id)}>
                    Connect
                  </button>
                </td>
                <td>
                  {
                    <Trash
                      className="icon"
                      onClick={() => handleDelete(item.id)}
                    />
                  }
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="buttons">
        <button style={{ width: "10%" }}>
          <Link to="/AddFlight">+ New Flight</Link>
        </button>
      </div>
    </div>
  );
}
export default AllFlights;
