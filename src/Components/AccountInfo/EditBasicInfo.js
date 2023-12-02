import "./AccountInfo.css";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import userImage from "./DefaultProfile.png";

function EditBasicInfo() {
  const navigate = useNavigate();

  const [editedPhone, setEditedPhone] = useState("");
  const [editedCarModel, setEditedCarModel] = useState("");
  const [editedCarColor, setEditedCarColor] = useState("");
  const [editedLicensePlate, setEditedLicensePlate] = useState("");
  const username = localStorage.getItem("username");

  useEffect(() => {
    async function driverCheck() {
      try {
        const driverResponse = await axios.get(
          `${process.env.REACT_APP_API_BASE_URL}/driver/?username=${username}`
        );
        const userResponse = await axios.get(
          `${process.env.REACT_APP_API_BASE_URL}/users/?username=${username}`
        );
        const length = driverResponse.data.length;
        if (length >= 1) {
          const index = length - 1;
          setEditedPhone(userResponse.data[index].phone_number);
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
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/users/?username=${username}`
      );
      const length = response.data.length;
      if (length >= 1) {
        const index = length - 1;
        const firstName = response.data[index].first_name;
        const lastName = response.data[index].last_name;
        const email = response.data[index].user;
        const profilePictureUrl =
          response.data[index].profile_picture_url || userImage;
        try {
          const res = await axios.post(
            `${process.env.REACT_APP_API_BASE_URL}/users/`,
            {
              user: email,
              phone_number: editedPhone,
              profile_picture_url: profilePictureUrl,
              first_name: firstName,
              last_name: lastName,
            }
          );
        } catch (error) {}
      }
    } catch (error) {
      console.error("Error fetching user info:", error);
    }
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/driver/`,
        {
          user: username,
          carModel: editedCarModel,
          carColor: editedCarColor,
          licensePlate: editedLicensePlate,
        }
      );
    } catch (error) {}
  };

  const handleSave = () => {
    handlePost();
    const timer = setTimeout(() => {
      navigate("/AccountInfo");
    }, 200);
    return () => clearTimeout(timer);
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
