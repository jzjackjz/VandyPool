import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./DriverSignUp.css";
import APIService from "../../APIService";

function DriverSignUp() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [carModel, setCarModel] = useState("");
  const [carColor, setCarColor] = useState("");
  const [licensePlate, setLicensePlate] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async () => {
    const sessionToken = localStorage.getItem("sessionToken");
    APIService.InsertDriverInfo(
      {
        carModel: carModel,
        carColor: carColor,
        licensePlate: licensePlate,
      },
      sessionToken
    )
      .then((resp) => {
        console.log(resp);
        navigate("/AccountInfo", { replace: true });
      })
      .catch((error) => console.error("Error:", error));
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
