import "./ContactDriver.css";
import React, { useEffect, useState } from "react";
import userImage from "./DefaultProfile.png";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

function ContactDriver() {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({
    email: "",
    phoneNumber: "",
    firstName: "",
    lastName: "",
    profilePictureUrl: userImage,
  });
  const [driverInfo, setDriverInfo] = useState([]);
  const location = useLocation();
  const { driver } = location.state || {};
  console.log(driver);

  const handleSubmit = () => {
    navigate("/ConnectDrivers");
  };

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_BASE_URL}/users/?username=${driver.user}`
        );
        const length = response.data.length;
        if (length >= 1) {
          const index = length - 1;
          setUserInfo({
            firstName: response.data[index].first_name,
            lastName: response.data[index].last_name,
            email: response.data[index].user,
            phoneNumber: response.data[index].phone_number,
            profilePictureUrl:
              response.data[index].profile_picture_url || userImage,
          });
        }
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    };

    fetchUserInfo();
  }, []);

  useEffect(() => {
    async function driverCheck() {
      try {
        const driverResponse = await axios.get(
          `${process.env.REACT_APP_API_BASE_URL}/driver/?username=${driver.user}`
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

  async function handleOtherDrivers() {
    try {
      const date = driver.date;
      navigate("/ConnectDrivers", { state: { date: date } });

      window.location.reload();
    } catch (error) {
      alert("Something went wrong when selecting the flight, please try again");
    }
  }

  return (
    <div className="account_info_container">
      <div className="header-container">
        <h1>Driver's Information</h1>
      </div>
      <bigbox>
        <subtitle>Basic Information</subtitle>
        <field>
          <field-name>Profile Picture</field-name>
          <field-value>
            <img
              src={userInfo.profilePictureUrl}
              alt="User Profile"
              className="profile-picture"
            />
          </field-value>
        </field>
        <field>
          <field-name>Name</field-name>
          <field-value>{`${userInfo?.firstName} ${userInfo?.lastName}`}</field-value>
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
          <field-value>{userInfo?.phoneNumber}</field-value>
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
      <button onClick={() => handleOtherDrivers()}>View Other Drivers</button>
    </div>
  );
}

export default ContactDriver;
