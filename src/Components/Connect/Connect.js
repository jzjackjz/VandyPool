import "./Connect.css";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Trash } from "react-bootstrap-icons";

function ConnectPassengers() {
  const [timeslots, setPassengers] = useState([]);

  async function fetchTimeslots() {
    try {
      const searchResponse = await axios.get("http://127.0.0.1:8000/flights/");
      setPassengers(searchResponse.data);
    } catch (error) {
      alert(
        "Something went wrong when fetching the flights, please refresh page"
      );
    }
  }

  useEffect(() => {
    fetchTimeslots();
  }, []);

  return (
    <div className="connect-container">
      <h1>Other Passengers</h1>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Time</th>
            <th>Dropoff Point</th>
            <th>Airline</th>
          </tr>
        </thead>
        <tbody>
          {timeslots.map((item) => (
            <tr key={item.id}>
              <td>{item.date}</td>
              <td>{item.time}</td>
              <td>{item.dropoff}</td>
              <td> {item.airline}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export default ConnectPassengers;

