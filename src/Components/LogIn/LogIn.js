import React, { useState, useEffect } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../AuthContext";
import axios from "axios";
import "./LogIn.css";

const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

function LogIn() {
  const [error, setError] = useState("");
  const { setIsAuthenticated } = useAuth();
  let navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('sessionToken');
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Token ${token}`;
      navigate("/");
    }
  }, [navigate]);

  const handleGoogleLogin = async (response) => {
    console.log('Login response:', response);
    if (response.error) {
      setError(`Google login error: ${response.error}`);
      return;
    }

    try {
      const res = await axios.post("http://127.0.0.1:8000/auth/google-login", {
        token: response.credential,
      });
      if (res.data.sessionToken) {
        localStorage.setItem('sessionToken', res.data.sessionToken);
        axios.defaults.headers.common['Authorization'] = `Token ${res.data.sessionToken}`;
        setIsAuthenticated(true);
        navigate("/");
      } else {
        setError('Login failed: No session token returned from backend');
      }
    } catch (error) {
      setError(`Error during Google login: ${error.response.data.message}`);
    }
  };


  return (
    <div className="log-in-container">
      <h1>Log In</h1>
      <GoogleLogin
        clientId={clientId}
        buttonText="Log in with Google"
        onSuccess={handleGoogleLogin}
        onFailure={handleGoogleLogin}
      />
      {error && <div className="error-message">{error}</div>}
      <div className="register-container">
        <p>If you don't have an account, please</p>
        <button className="register-button" onClick={() => navigate("/")}>
          register here
        </button>
      </div>
    </div>
  );
}

export default LogIn;