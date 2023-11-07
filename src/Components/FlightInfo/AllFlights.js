import "./AllFlights.css";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Trash } from "react-bootstrap-icons";

function AllFlights() {
    const [flights, setFlights] = useState([]);
    const headers = {
      'Authorization': `Token ${localStorage.getItem('sessionToken')}`
    };

    async function fetchFlights() {
        try {
            const searchResponse = await axios.get("http://127.0.0.1:8000/flights", { headers });
            setFlights(searchResponse.data);
        } catch(error) {
            alert(
                "Something went wrong when fetching flights, please refresh page"
            );
        }
    }
    async function handleDelete(id) {
        try {
          const searchResponse = await axios.delete(
            "http://127.0.0.1:8000/flights/" + id + "/", { headers }
          );
          window.location.reload();
        } catch (error) {
          alert("Something went wrong when deleting the flight, please try again");
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
            <button>
              <Link to="/AddFlight">+ New Flight</Link>
            </button>
          </div>
        </div>
      );
}
export default AllFlights