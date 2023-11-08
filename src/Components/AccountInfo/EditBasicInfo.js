import "./AccountInfo.css";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function EditBasicInfo(){
    const navigate = useNavigate();

    const [phone, setPhone] = useState("(615) 000-0000");
    const [carModel, setCarModel] = useState("Car Model");
    const [carColor, setCarColor] = useState("Car Color");
    const [licensePlate, setLicensePlate] = useState("License Plate");
  
    const [editedPhone, setEditedPhone] = useState(phone);
    const [editedCarModel, setEditedCarModel] = useState(carModel);
    const [editedCarColor, setEditedCarColor] = useState(carColor);
    const [editedLicensePlate, setEditedLicensePlate] = useState(licensePlate);
  
    // Function to handle changes in the edited phone number
    const handlePhoneChange = (e) => {
      setEditedPhone(e.target.value);
    };
  
    // Function to handle changes in the edited car model
    const handleCarModelChange = (e) => {
      setEditedCarModel(e.target.value);
    };
  
    // Function to handle changes in the edited car color
    const handleCarColorChange = (e) => {
      setEditedCarColor(e.target.value);
    };
  
    // Function to handle changes in the edited license plate
    const handleLicensePlateChange = (e) => {
      setEditedLicensePlate(e.target.value);
    };
  
    // Function to save the changes
    const handleSave = () => {
      // Update the actual phone number, car model, car color, and license plate with the edited values when the user clicks Save
      setPhone(editedPhone);
      setCarModel(editedCarModel);
      setCarColor(editedCarColor);
      setLicensePlate(editedLicensePlate);
  
      navigate("/AccountInfo");
  
      // TO-DO: Update in the database
    };
  
    // Function to cancel the changes
    const handleCancel = () => {
      // Reset the edited values to the current values when the user clicks Cancel
      setEditedPhone(phone);
      setEditedCarModel(carModel);
      setEditedCarColor(carColor);
      setEditedLicensePlate(licensePlate);
  
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
                    onChange={handlePhoneChange}
                />
                </div>

                <div className="label">Car Model</div>
                <div className="input-box">
                <input
                    type="text"
                    className="name-input"
                    value={editedCarModel}
                    onChange={handleCarModelChange}
                />
                </div>

                <div className="label">Car Color</div>
                <div className="input-box">
                <input
                    type="text"
                    className="name-input"
                    value={editedCarColor}
                    onChange={handleCarColorChange}
                />
                </div>

                <div className="label">License Plate</div>
                <div className="input-box">
                <input
                    type="text"
                    className="name-input"
                    value={editedLicensePlate}
                    onChange={handleLicensePlateChange}
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
    )
}

export default EditBasicInfo;