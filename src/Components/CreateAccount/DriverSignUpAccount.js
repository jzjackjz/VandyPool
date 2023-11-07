import "./DriverSignUpAccount.css";
import React from "react";
import { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../AuthContext";
import axios from "axios";

const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

function DriverSignUpAccount() {
  const [error, setError] = useState("");
  const [duplicate, setDuplicate] = useState("");
  const { setIsAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleGoogleRegister = async (response) => {
    if (response.error) {
      setError(`Google registration error: ${response.error}`);
      return;
    }

    try {
      const res = await axios.post(
        "http://127.0.0.1:8000/auth/google-register",
        {
          token: response.credential,
        }
      );
      if (res.data.sessionToken) {
        localStorage.setItem("sessionToken", res.data.sessionToken);
        axios.defaults.headers.common[
          "Authorization"
        ] = `Token ${res.data.sessionToken}`;
        setIsAuthenticated(true);
        navigate("/");
      } else {
        setError("Registration failed: No session token returned from backend");
      }
    } catch (error) {
      if (error.response.data.message == "User already exists") {
        setDuplicate(
          "It appears you already have an account, please proceed to add a few details"
        );
      } else {
        setError(
          `Error during Google registration: ${error.response.data.message}`
        );
      }
    }
  };

  const handleSubmit = () => {
    navigate("/DriverInfo");
  };

  return (
    <div className="driver-signup-container">
      <h1>Driver Registration</h1>
      <p>Please use your Vanderbilt associated email</p>
      <GoogleLogin clientId={clientId} onSuccess={handleGoogleRegister} />
      {error && <div className="error-message">{error}</div>}
      {duplicate && <div className="error-message">{duplicate}</div>}
      {duplicate && <button onClick={handleSubmit}>Proceed Here</button>}
    </div>
  );
}

export default DriverSignUpAccount;
