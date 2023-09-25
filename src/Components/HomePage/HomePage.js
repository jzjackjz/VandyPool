import InfoInput from "../InfoInput/InfoInput";
import NavBar from "../NavBar/NavBar";
import "./HomePage.css";
import React from "react";

function HomePage() {
  return (
    <div>
      <div className="HomePage">
        Welcome to VandyPool
        <InfoInput />
      </div>
    </div>
  );
}

export default HomePage;
