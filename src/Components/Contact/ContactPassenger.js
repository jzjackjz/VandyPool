import "./ContactPassenger.css";
import React, { useEffect, useState } from "react";
import userImage from "./DefaultProfile.png";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

function ContactPassenger() {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({
    email: "",
    phoneNumber: "",
    firstName: "",
    lastName: "",
    profilePictureUrl: userImage,
  });
  const location = useLocation();
  const { passenger } = location.state || {};
  console.log(passenger);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_BASE_URL}/users/?username=${passenger.user}`
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

  async function handleOtherPassengers() {
    try {
      const date = passenger.flight_date;
      navigate("/ConnectPassengers", { state: { date: date } });

      window.location.reload();
    } catch (error) {
      alert("Something went wrong when selecting the flight, please try again");
    }
  }

  return (
    <div className="account_info_container">
      <div className="header-container">
        <h1>Passenger's Information</h1>
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
      <button onClick={() => handleOtherPassengers()}>
        View Other Passengers
      </button>
    </div>
  );
}

export default ContactPassenger;
