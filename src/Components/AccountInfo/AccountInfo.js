import "./AccountInfo.css";
import React from "react";
import userImage from "./DefaultProfile.png"
import { Link } from "react-router-dom";

function AccountInfo() {
  return (
    <div className="account_info_container">
      <h1>Account Information</h1> 

      <bigbox>
        <Link to="/DriverSignUp">
          <button><subtitle>Basic Information</subtitle>{">"}</button>
        </Link>
        <field>
          <field-name>Profile Picture</field-name>
          <field-value><img
              src={userImage} /* Replace with the user's profile picture URL */
              alt="User Profile"
              className="profile-picture" /* Apply the circular styling */
            /></field-value>
        </field>
        <field>
          <field-name>Name</field-name>
          <field-value>FirstName LastName</field-value>
        </field>
      </bigbox>

      <bigbox>
        <Link to="/DriverSignUp">
          <button><subtitle>Contact Information</subtitle>{">"}</button>
        </Link>
        <field>
          <field-name>Email</field-name>
          <field-value>email@vanderbilt.edu</field-value>
        </field>
        <field>
          <field-name>Phone Number</field-name>
          <field-value>(615) 000-0000</field-value>
        </field>
      </bigbox>

    </div>
  );
}

export default AccountInfo;
