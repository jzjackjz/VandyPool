import "./ConnectDrivers.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

function ConnectDrivers() {
  const [drivers, setDrivers] = useState([]);
  const username = localStorage.getItem("username");
  const navigate = useNavigate();

  const location = useLocation();
  const { date } = location.state || {};

  useEffect(() => {
    fetchTimeslots();
  }, []);

  async function fetchTimeslots() {
    try {
      const searchResponse = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/timeslot/`
      );
      const filtered = searchResponse.data.filter(
        (obj) => obj.user !== username && obj.date === date
      );
      setDrivers(filtered);
    } catch (error) {
      console.log("Something went wrong when fetching the flights, please refresh page");
    }
  }

  async function contactDrivers(id) {
    try {
      const selectedDriver = drivers.find((driver) => driver.id === id);
      navigate("/ContactDrivers", { state: { driver: selectedDriver } });

      window.location.reload();
    } catch (error) {
      console.log("Something went wrong when selecting the driver, please try again");
    }
  }

  function handleOtherFlights() {
    navigate("/FlightInfo");
  }

  return (
    <div className="connect">
      <h1>Drivers Avaialble For {date}</h1>
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
                  <button onClick={() => contactDrivers(item.id)}>{">"}</button>
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
export default ConnectDrivers;
