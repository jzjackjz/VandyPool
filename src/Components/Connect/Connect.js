import "./Connect.css";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Trash } from "react-bootstrap-icons";
import { useLocation } from 'react-router-dom';

function ConnectPassengers() {
  const [connect, setPassengers] = useState([]);

  const location = useLocation();
  const { flight } = location.state || {};

  // useEffect(() => {
  //   fetchTimeslots();
  // }, []);

  

  // async function fetchTimeslots() {
  //   try {
  //     const searchResponse = await axios.get("http://127.0.0.1:8000/flights/");
  //     setPassengers(searchResponse.data);
  //   } catch (error) {
  //     alert(
  //       "Something went wrong when fetching the flights, please refresh page"
  //     );
  //   }
  // }


  return (
    <div className="connect-container">
      <h1>Other Passengers</h1>
      /*PLACEHOLDER FOR NOW*/

      <div>
      <h2>Flight id: {flight.id}</h2>
      <p>Ride Type: {flight.ride_type}</p>
      <p>Time: {flight.flight_time}</p>
      <p>Date: {flight.flight_date}</p>
      <p>Dropoff/Pickup: {flight.dropoff_point}</p>
      <p>Airline: {flight.airline}</p>
    </div>

      {/* <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Time</th>
            <th>Dropoff Point</th>
            <th>Airline</th>
          </tr>
        </thead>
        <tbody>
          {connect.map((item) => (
            <tr key={item.id}>
              <td>{item.flight_date}</td>
              <td>{item.flight_time}</td>
              <td>{item.dropoff_point}</td>
              <td> {item.airline}</td>
            </tr>
          ))}
        </tbody>
      </table> */}
    </div>
  );
}
export default ConnectPassengers;

