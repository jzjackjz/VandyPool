import "./App.css";
import React from "react";
import HomePage from "./Components/HomePage/HomePage";
import NavBar from "./Components/NavBar/NavBar";

function App() {
  return (
    <div className="App">
      <NavBar />
      <HomePage />
      <header className="App-header">VandyPool</header>
    </div>
  );
}

export default App;
