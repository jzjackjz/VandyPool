import "./DriverTimeslots.css";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Trash } from "react-bootstrap-icons";

function DriverTimeslots() {
  const [timeslots, setTimeslots] = useState([]);

  async function fetchTimeslots() {
    try {
      const searchResponse = await axios.get("http://127.0.0.1:8000/timeslot/");
      setTimeslots(searchResponse.data);
    } catch (error) {
      alert(
        "Something went wrong when fetching the timeslots, please refresh page"
      );
    }
  }

  async function handleDelete(id) {
    try {
      const searchResponse = await axios.delete(
        "http://127.0.0.1:8000/timeslot/" + id + "/"
      );
      window.location.reload();
    } catch (error) {
      alert("Something went wrong when deleting the timeslot, pleas try again");
    }
  }

  useEffect(() => {
    fetchTimeslots();
  }, []);

  return (
    <div className="timeslots">
      <h1>Your Current Time Slots</h1>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Time</th>
            <th>Space Available</th>
            <th>Delete Timeslot</th>
          </tr>
        </thead>
        <tbody>
          {timeslots.map((item) => (
            <tr key={item.id}>
              <td>{item.date}</td>
              <td>{item.time}</td>
              <td>{item.space_available}</td>
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
      <div className="buttons">
        <button>
          <Link to="/NewTimeslot">+ New Timeslot</Link>
        </button>
      </div>
    </div>
  );
}
export default DriverTimeslots;
