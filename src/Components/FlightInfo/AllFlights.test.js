// AllFlights.test.js
import React from 'react';
import { render, fireEvent, waitFor, screen, act } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import AllFlights from './AllFlights';
import axios from 'axios';
import { BrowserRouter as Router } from 'react-router-dom';

// Mocks
jest.mock('axios');
const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

const mockLocalStorage = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  clear: jest.fn(),
};
Object.defineProperty(window, 'localStorage', {
  value: mockLocalStorage
});

// Mock window.location.reload
let originalWindowLocation = window.location;
beforeAll(() => {
  delete window.location;
  window.location = { ...originalWindowLocation, reload: jest.fn() };
});

afterAll(() => {
  window.location = originalWindowLocation;
});

describe('AllFlights Component', () => {
  const mockFlights = [
    { id: 1, ride_type: 'Departure', flight_time: '10:00', flight_date: '2023-01-01', dropoff_point: 'JFK Airport', airline: 'Delta' }
  ];

  beforeEach(() => {
    window.localStorage.getItem.mockReturnValue('mockToken');
    axios.get.mockResolvedValue({ data: mockFlights });
    axios.delete.mockResolvedValue({});
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders AllFlights component and fetches flights', async () => {
    await act(async () => {
      render(
        <Router>
          <AllFlights />
        </Router>
      );
    });

    expect(screen.getByText('Your Current Flights')).toBeInTheDocument();
    expect(axios.get).toHaveBeenCalled();
  });

  test('renders flight data correctly', async () => {
    await act(async () => {
      render(
        <Router>
          <AllFlights />
        </Router>
      );
    });

    expect(screen.getByText('Departure')).toBeInTheDocument();
    expect(screen.getByText('10:00')).toBeInTheDocument();
    expect(screen.getByText('2023-01-01')).toBeInTheDocument();
    expect(screen.getByText('JFK Airport')).toBeInTheDocument();
    expect(screen.getByText('Delta')).toBeInTheDocument();
  });

  test('handles flight deletion', async () => {
    await act(async () => {
      render(
        <Router>
          <AllFlights />
        </Router>
      );
    });

    const deleteButtons = screen.getAllByTestId('delete-icon');
    const firstDeleteButton = deleteButtons[0];
    fireEvent.click(firstDeleteButton);
  
    await waitFor(() => {
      expect(axios.delete).toHaveBeenCalled();
    });
  });

  test('handles selecting a flight for passengers', async () => {
    await act(async () => {
      render(
        <Router>
          <AllFlights />
        </Router>
      );
    });
  
    const connectPassengerButtons = screen.getAllByText('Connect')[0];
    fireEvent.click(connectPassengerButtons);
  
    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/ConnectPassengers', expect.anything());
    });
  });

  test('handles selecting a flight for drivers', async () => {
    await act(async () => {
      render(
        <Router>
          <AllFlights />
        </Router>
      );
    });
  
    const connectDriverButtons = screen.getAllByText('Connect')[1];
    fireEvent.click(connectDriverButtons);
  
    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/ConnectDrivers', expect.anything());
    });
  });
});

