import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import axios from 'axios';
import AxiosMockAdapter from 'axios-mock-adapter';
import { BrowserRouter as Router } from 'react-router-dom';

import ConnectPassengers from './Connect'; // Adjust the path as needed

// Mocking axios
const mock = new AxiosMockAdapter(axios);

// Mock data for the API response
const mockFlightData = {
  id: '1',
  ride_type: 'Shared',
  flight_time: '10:00',
  flight_date: '2023-01-01',
  dropoff_point: 'Terminal 1',
  airline: 'AirTest'
};

// Mocking useLocation hook
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: () => ({
    state: { flight: mockFlightData }
  })
}));

describe('Connect Component', () => {


  it('renders flight information correctly', async () => {
    // Setup mock response for the API call
    mock.onGet("http://127.0.0.1:8000/flights/").reply(200, [mockFlightData]);

    render(
      <Router>
        <ConnectPassengers />
      </Router>
    );

    // Check for flight details in the rendered component
    expect(screen.getByText(`Flight id: ${mockFlightData.id}`)).toBeInTheDocument();
    expect(screen.getByText(`Ride Type: ${mockFlightData.ride_type}`)).toBeInTheDocument();
    // Add checks for other fields as needed
  });

  // Add more tests as needed
});

it('renders a list of passengers after successful API call', async () => {
    // Mock API response with passenger data
    const mockPassengerData = [
      { /* Passenger data structure */ },
      { /* Another passenger's data */ }
      // Include as many mock passengers as needed for the test
    ];
    mock.onGet("http://127.0.0.1:8000/flights/").reply(200, mockPassengerData);

    render(
      <Router>
        <ConnectPassengers />
      </Router>
    );

    // Verify that passenger data is rendered
    // Example: expect(screen.getByText(mockPassengerData[0].name)).toBeInTheDocument();
  });