import "./AccountInfo.css";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import APIService from "../../APIService";
import axios from "axios";

function EditBasicInfo() {
  const navigate = useNavigate();

  const headers = {
    Authorization: `Token ${localStorage.getItem("sessionToken")}`,
  };

  const [editedPhone, setEditedPhone] = useState("");
  const [editedCarModel, setEditedCarModel] = useState("");
  const [editedCarColor, setEditedCarColor] = useState("");
  const [editedLicensePlate, setEditedLicensePlate] = useState("");

  useEffect(() => {
    async function driverCheck() {
      try {
        const driverResponse = await axios.get(
          "http://127.0.0.1:8000/driver/",
          { headers }
        );
        const phoneResponse = await axios.post(
          'http://127.0.0.1:8000/add-edit-phone-number',
          { headers }
        );
        const length = driverResponse.data.length;
        if (length >= 1) {
          const index = length - 1;
          setEditedPhone(phoneResponse);
          setEditedCarModel(driverResponse.data[index].carModel);
          setEditedCarColor(driverResponse.data[index].carColor);
          setEditedLicensePlate(driverResponse.data[index].licensePlate);
        }
      } catch (error) {
        console.log(error);
      }
    }
    driverCheck();
  }, []);

  const handlePost = async () => {
    const sessionToken = localStorage.getItem("sessionToken");
    APIService.InsertDriverInfo(
      {
        carModel: editedCarModel,
        carColor: editedCarColor,
        licensePlate: editedLicensePlate,
      },
      sessionToken
    )
      .then((resp) => {
        navigate("/AccountInfo", { replace: true });
      })
      .catch((error) => console.error("Error:", error));
  };

  const handleSave = () => {
    handlePost();
    navigate("/AccountInfo");
  };

  const handleCancel = () => {
    navigate("/AccountInfo");
  };

  return (
    <div className="account_info_container">
      <bigbox>
        <subtitle>Edit Information</subtitle>

        <div className="label">Phone Number</div>
        <div className="input-box">
          <input
            type="text"
            className="name-input"
            value={editedPhone}
            onChange={(e) => setEditedPhone(e.target.value)}
          />
        </div>

        <div className="label">Car Model</div>
        <div className="input-box">
          <input
            type="text"
            className="name-input"
            value={editedCarModel}
            onChange={(e) => setEditedCarModel(e.target.value)}
          />
        </div>

        <div className="label">Car Color</div>
        <div className="input-box">
          <input
            type="text"
            className="name-input"
            value={editedCarColor}
            onChange={(e) => setEditedCarColor(e.target.value)}
          />
        </div>

        <div className="label">License Plate</div>
        <div className="input-box">
          <input
            type="text"
            className="name-input"
            value={editedLicensePlate}
            onChange={(e) => setEditedLicensePlate(e.target.value)}
          />
        </div>
      </bigbox>
      <div className="button-container">
        <button className="cancel-button" onClick={handleCancel}>
          Cancel
        </button>

        <button className="save-button" onClick={handleSave}>
          Save
        </button>
      </div>
    </div>
  );
}

export default EditBasicInfo;
