import "./ConnectDrivers.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

function ConnectDrivers() {
  const [drivers, setDrivers] = useState([]);
  const username = localStorage.getItem("username");

  const location = useLocation();
  const { flight } = location.state || {};

  useEffect(() => {
    fetchTimeslots();
  }, []);

  async function fetchTimeslots() {
    try {
      const searchResponse = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/timeslot/`
      );
      const filtered = searchResponse.data.filter(
        (obj) => obj.user !== username && obj.date === flight.flight_date
      );
      setDrivers(filtered);
    } catch (error) {
      alert(
        "Something went wrong when fetching the flights, please refresh page"
      );
    }
  }

  return (
    <div className="connect">
      <h1>Drivers Avaialble For {flight.flight_date}</h1>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Driver Username</th>
              <th>Date</th>
              <th>Time</th>
              <th>Space Available</th>
              <th>Contact Driver</th>
            </tr>
          </thead>
          <tbody>
            {drivers.map((item) => (
              <tr key={item.id}>
                <td>{item.user}</td>
                <td>{item.date}</td>
                <td>{item.time}</td>
                <td>{item.space_available}</td>
                <td>
                  <button> {">"}</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
export default ConnectDrivers;
