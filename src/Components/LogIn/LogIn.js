import React, { useState, useEffect } from "react";
import APIService from "../../APIService";
import { useCookies } from "react-cookie";
import { GoogleLogin } from 'react-google-login';
import { useNavigate } from "react-router-dom";
import { useUser } from "../../UserContext";
import "./LogIn.css";

const clientId = "889198131381-dhul247pghoitlna875j2t6kej68mllq.apps.googleusercontent.com";

function LogIn() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [cookies, setCookie, removeCookie] = useCookies(['sessionToken']);
  const [error, setError] = useState("");
  const { user, setNewUser } = useUser();
  let navigate = useNavigate();

  useEffect(() => {
    if (cookies.sessionToken) {
      navigate("/");
    }
  }, [cookies, navigate]);

  const responseGoogle = async () => {
    try {
      const resp = await APIService.LoginUser({
        username: username,
        password: password,
      });
      if (resp.token) {
        setCookie('sessionToken', resp.token, { path: '/' });
        navigate("/");
      } else {
        setError("Incorrect username or password");
      }
    } catch (error) {
      setError("An error occurred, please try again");
    }
  };

  return (
    <div className="log-in-container">
      <h1>Log In</h1>
      <GoogleLogin
        clientId={clientId}
        buttonText="Log in with Google"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={'single_host_origin'}
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