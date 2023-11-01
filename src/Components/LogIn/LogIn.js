import React, { useState, useEffect } from "react";
import "./LogIn.css";
import APIService from "../../APIService";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../UserContext";

function LogIn() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useCookies(["mytoken"]);
  const [error, setError] = useState("");
  const { user, setNewUser } = useUser();
  let navigate = useNavigate();

  useEffect(() => {
    if (token["mytoken"]) {
      navigate("/");
    }
  }, [token, navigate]);

  const handleSubmit = () => {
    APIService.LoginUser({
      username: username,
      password: password,
    })
      .then((resp) => {
        if (resp.token) {
          setToken("mytoken", resp.token);
        } else {
          setError("Incorrect username or password");
        }
      })
      .catch((error) => {
        console.error("An error occurred during login", error);
        setError("An error occurred, please try again");
      });
    setNewUser(username);
  };

  return (
    <div className="log-in-container">
      <h1>Log In</h1>
      {error && <p>{error}</p>}
      <input
        type="text"
        placeholder="Username (Email)"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="Password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleSubmit}>Submit</button>
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
