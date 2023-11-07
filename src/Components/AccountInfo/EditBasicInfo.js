import "./AccountInfo.css";
import React, { useState } from "react";
import { Link } from "react-router-dom";


function EditBasicInfo(){
    const [firstName, setFirstName] = useState("First");
    const [lastName, setLastName] = useState("Last");

    const [editedFirstName, setEditedFirstName] = useState(firstName);
    const [editedLastName, setEditedLastName] = useState(lastName);

    // Function to handle changes in the edited first name
    const handleFirstNameChange = (e) => {
        setEditedFirstName(e.target.value);
    };

    // Function to handle changes in the edited last name
    const handleLastNameChange = (e) => {
        setEditedLastName(e.target.value);
    };

    // Function to save the changes
    const handleSave = () => {
        // Update the actual first name and last name with the edited values when the user clicks Save
        setFirstName(editedFirstName);
        setLastName(editedLastName);

        // TO-DO: Update in the database
    };

    // Function to cancel the changes
    const handleCancel = () => {
        // Reset the edited first name and last name to the current values when the user clicks Cancel
        setEditedFirstName(firstName);
        setEditedLastName(lastName);
    };

    return (
        <div className="account_info_container">
            <bigbox>
            
                <subtitle>Edit Name</subtitle>
                <div className="label">First Name</div>
                <div className="input-box">
                    <input
                        type="text"
                        className="name-input"
                        value={editedFirstName}
                        onChange={handleFirstNameChange}
                    />
                </div>
                

                <div className="label">Last Name</div>
                <div className="input-box">
                    <input
                        type="text"
                        className="name-input"
                        value={editedLastName}
                        onChange={handleLastNameChange}
                    />
                </div>
                
            </bigbox>
            <div className="button-container">
                
                <Link to="/AccountInfo">
                    <button className="cancel-button" onClick={handleCancel}>
                        Cancel
                    </button>
                </Link>
                <button className="save-button" onClick={handleSave}>
                    Save
                </button>
            </div>
        </div>
    )
}

export default EditBasicInfo;