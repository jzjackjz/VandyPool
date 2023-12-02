import React from "react";
import { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../AuthContext";
import axios from "axios";
import "./RiderSignUp.css";
import { jwtDecode } from "jwt-decode";

const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

function RiderSignUp() {
  const [error, setError] = useState("");
  const { setIsAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [phoneNum, setPhoneNum] = useState("");
  const [success, setSuccess] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [user, setUser] = useState("");
  const [profPic, setProfPic] = useState("");

  const handleSubmit = () => {
    try {
      const res = axios.post(`${process.env.REACT_APP_API_BASE_URL}/users/`, {
        user: user,
        phone_number: phoneNum,
        profile_picture_url: profPic,
        first_name: firstName,
        last_name: lastName,
      });
      navigate("/AccountInfo");
    } catch (error) {
      setError(
        `Error during Google registration: ${error.response.data.message}`
      );
    }
  };

  const handleGoogleRegister = async (response) => {
    if (response.error) {
      setError(`Google registration error: ${response.error}`);
      return;
    }
    const info = jwtDecode(response.credential);
    setFirstName(info.given_name);
    setLastName(info.family_name);
    setProfPic(info.picture);
    setUser(info.email);
    console.log(info);

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/auth/google-register`,
        {
          token: response.credential,
        }
      );
      if (res.data.sessionToken) {
        localStorage.setItem("username", info.email);
        localStorage.setItem("sessionToken", res.data.sessionToken);
        axios.defaults.headers.common[
          "Authorization"
        ] = `Token ${res.data.sessionToken}`;
        setIsAuthenticated(true);
        setSuccess("Account Created! Please enter a valid US number below");
      } else {
        setError("Registration failed: No session token returned from backend");
      }
    } catch (error) {
      setError(
        `Error during Google registration: ${error.response.data.message}`
      );
    }
  };

  return (
    <div className="rider-signup-container">
      <h1>Register For An Account</h1>
      <p>Please use your Vanderbilt associated email</p>
      <GoogleLogin
        clientId={clientId}
        onSuccess={handleGoogleRegister}
        width={350}
      />
      {error && <div className="error-message">{error}</div>}
      {success && <div>{success}</div>}
      {success && (
        <input
          type="text"
          placeholder="Phone Number"
          value={phoneNum}
          onChange={(e) => setPhoneNum(e.target.value)}
        />
      )}
      {success && <button onClick={handleSubmit}>Submit</button>}
    </div>
  );
}

export default RiderSignUp;
