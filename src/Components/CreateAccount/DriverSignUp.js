import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./DriverSignUp.css";
import axios from "axios";

function DriverSignUp() {
  const [carModel, setCarModel] = useState("");
  const [carColor, setCarColor] = useState("");
  const [licensePlate, setLicensePlate] = useState("");
  const navigate = useNavigate();
  const username = localStorage.getItem("username");

  const handleSubmit = async () => {
    console.log(username);
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/driver/`,
        {
          user: username,
          carModel: carModel,
          carColor: carColor,
          licensePlate: licensePlate,
        }
      );
      navigate("/AccountInfo");
    } catch (error) {}
  };

  return (
    <div className="driver-signup-container">
      <h1>Add A Few More Details Here</h1>
      <input
        type="model"
        placeholder="Car Model"
        value={carModel}
        onChange={(e) => setCarModel(e.target.value)}
      />
      <input
        type="car_color"
        placeholder="Car Color"
        value={carColor}
        onChange={(e) => setCarColor(e.target.value)}
      />
      <input
        type="license plate"
        placeholder="License Plate"
        value={licensePlate}
        onChange={(e) => setLicensePlate(e.target.value)}
      />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}

export default DriverSignUp;
