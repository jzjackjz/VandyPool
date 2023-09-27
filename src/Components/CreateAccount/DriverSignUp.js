import React, { useState } from 'react';
import "./DriverSignUp.css";

function DriverSignUp() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [carModel, setCarModel] = useState('');
  const [carColor, setCarColor] = useState('');
  const [licensePlate, setLicensePlate] = useState('');
  const [seatsAvailable, setSeatsAvailable] = useState('');

  const handleSubmit = () => {
    // Add logic to handle form submission
  };

  return (
    <div className="driver-signup-container">
      <h1>Driver Registration</h1>
      <input type="text" placeholder="First Name" value={firstName} onChange={e => setFirstName(e.target.value)} />
      <input type="text" placeholder="Last Name" value={lastName} onChange={e => setLastName(e.target.value)} />
      <input type="email" placeholder="Vanderbilt Email Address" value={email} onChange={e => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
      <input type="tel" placeholder="Phone Number" value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)} />
      <input type="model" placeholder="Car Model" value={carModel} onChange={e => setCarModel(e.target.value)} />
      <input type="car_color" placeholder="Car Color" value={carColor} onChange={e => setCarColor(e.target.value)} />
      <input type="license plate" placeholder="License Plate" value={licensePlate} onChange={e => setLicensePlate(e.target.value)} />
      <input type="seatsAvailable" placeholder="Number of Available Seats" value={seatsAvailable} onChange={e => setSeatsAvailable(e.target.value)} />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}

export default DriverSignUp;
