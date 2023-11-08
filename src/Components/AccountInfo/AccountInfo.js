import "./AccountInfo.css";
import React, { useEffect, useState } from "react";
import userImage from "./DefaultProfile.png";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function AccountInfo() {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({
    email: '',
    phoneNumber: '',
    firstName: '',
    lastName: '',
    profilePictureUrl: userImage});
  const [driverInfo, setDriverInfo] = useState([]);
  const headers = {
    Authorization: `Token ${localStorage.getItem("sessionToken")}`,
  };

  const handleSubmit = () => {
    navigate("/DriverInfo");
  };

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/users/current-user/', {
          headers: {
            Authorization: `Token ${localStorage.getItem("sessionToken")}`,
          },
        });
        setUserInfo({
          first_name: response.data.first_name,
          last_name: response.data.last_name,
          email: response.data.email,
          phone_number: response.data.phone_number,
          profilePictureUrl: response.data.profile_picture_url || userImage
        });
      } catch (error) {
        console.error('Error fetching user info:', error);
      }
    };
  
    fetchUserInfo();
  }, []);

  useEffect(() => {
    async function driverCheck() {
      try {
        const driverResponse = await axios.get(
          "http://127.0.0.1:8000/driver/",
          { headers }
        );
        const length = driverResponse.data.length;
        if (length >= 1) {
          const index = length - 1;
          setDriverInfo(driverResponse.data[index]);
        }
      } catch (error) {
        console.log(error);
      }
    }
    driverCheck();
  }, []);

  return (
    <div className="account_info_container">
      <div className="header-container">
        <h1>Account Information</h1>
        <Link
          to="/EditBasicInfo"
          style={{ color: "white", marginLeft: "30px" }}
        >
          <span>Edit</span>
        </Link>
      </div>

      <bigbox>
        <subtitle>Basic Information</subtitle>
        <field>
          <field-name>Profile Picture</field-name>
          <field-value>
            <img
              src={userInfo.profilePictureUrl} /* Replace with the user's profile picture URL */
              alt="User Profile"
              className="profile-picture" /* Apply the circular styling */
            />
          </field-value>
        </field>
        <field>
          <field-name>Name</field-name>
          <field-value>{`${userInfo?.first_name} ${userInfo?.last_name}`}</field-value>
        </field>
      </bigbox>

      <bigbox>
        <subtitle>Contact Information</subtitle>
        <field>
          <field-name>Email</field-name>
          <field-value>{userInfo?.email}</field-value>
        </field>
        <field>
          <field-name>Phone Number</field-name>
          <field-value>{userInfo?.phone_number}</field-value>
        </field>
      </bigbox>

      {driverInfo.length !== 0 && (
        <bigbox>
          <subtitle>Driver Information</subtitle>
          <field>
            <field-name>Car Model</field-name>
            <field-value>{driverInfo.carModel}</field-value>
          </field>
          <field>
            <field-name>Car Color</field-name>
            <field-value>{driverInfo.carColor}</field-value>
          </field>
          <field>
            <field-name>License Plate</field-name>
            <field-value>{driverInfo.licensePlate}</field-value>
          </field>
        </bigbox>
      )}

      {driverInfo.length === 0 && (
        <button onClick={handleSubmit}>Register to Drive</button>
      )}
    </div>
  );
}

export default AccountInfo;
