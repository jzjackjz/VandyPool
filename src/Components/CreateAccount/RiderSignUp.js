import React from "react";
import { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./RiderSignUp.css";

const clientId =
  "889198131381-dhul247pghoitlna875j2t6kej68mllq.apps.googleusercontent.com";

function RiderSignUp() {
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleGoogleRegister = async (response) => {
    console.log(response);
    if (response.error) {
      setError(`Google registration error: ${response.error}`);
      return;
    }

    try {
      await axios.post("http://127.0.0.1:8000/auth/google-register", {
        token: response.credential,
      });
      navigate("/");
    } catch (error) {
      setError(
        `Error during Google registration: ${error.response.data.message}`
      );
    }
  };

  return (
    <div className="rider-signup-container">
      <h1>Rider Registration</h1>
      <p>Please use your Vanderbilt associated email</p>
      <GoogleLogin
        onSuccess={handleGoogleRegister}
        text="Sign Up With Google"
      />
    </div>
  );
}

export default RiderSignUp;
