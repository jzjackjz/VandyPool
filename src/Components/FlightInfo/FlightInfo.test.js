import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import FlightInfo from './FlightInfo';
import APIService from '../../APIService';

// Mocking useNavigate and APIService
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
}));

jest.mock('../../APIService', () => ({
  InsertFlightInformation: jest.fn(),
}));

const mockLocalStorage = (() => {
  let store = {};
  return {
    getItem(key) {
      return store[key] || null;
    },
    setItem(key, value) {
      store[key] = value.toString();
    },
    clear() {
      store = {};
    }
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: mockLocalStorage
});

describe('FlightInfo Component', () => {
  beforeEach(() => {
    APIService.InsertFlightInformation.mockClear();
  });

  test('renders FlightInfo component', () => {
    const { getByText } = render(<FlightInfo />);
    expect(getByText('Flight Registration')).toBeInTheDocument();
  });

  test('allows the user to enter flight details', () => {
    const { getByPlaceholderText } = render(<FlightInfo />);

    const timeInput = getByPlaceholderText('Flight Time');
    fireEvent.change(timeInput, { target: { value: '10:00' } });
    expect(timeInput.value).toBe('10:00');

    const dateInput = getByPlaceholderText('Flight Date');
    fireEvent.change(dateInput, { target: { value: '2023-01-01' } });
    expect(dateInput.value).toBe('2023-01-01');

    const locationInput = getByPlaceholderText('Location');
    fireEvent.change(locationInput, { target: { value: 'JFK Airport' } });
    expect(locationInput.value).toBe('JFK Airport');

    const airlineInput = getByPlaceholderText('Airline');
    fireEvent.change(airlineInput, { target: { value: 'Delta' } });
    expect(airlineInput.value).toBe('Delta');
  });

  test('submits the form with flight info', async () => {
    APIService.InsertFlightInformation.mockResolvedValue({ success: true });
    window.localStorage.setItem('sessionToken', 'mockToken');
  
    const { getByPlaceholderText, getByText, getByDisplayValue } = render(<FlightInfo />);
  
    fireEvent.change(getByPlaceholderText('Flight Time'), { target: { value: '10:00' } });
    fireEvent.change(getByPlaceholderText('Flight Date'), { target: { value: '2023-01-01' } });
    fireEvent.change(getByPlaceholderText('Location'), { target: { value: 'JFK Airport' } });
    fireEvent.change(getByPlaceholderText('Airline'), { target: { value: 'Delta' } });
  
    fireEvent.change(getByDisplayValue('Select Type of Ride'), { target: { value: 'Departure' } });
  
    fireEvent.click(getByText('Submit'));
  
    await waitFor(() => {
      expect(APIService.InsertFlightInformation).toHaveBeenCalledWith({
        ride_type: 'Departure',
        flight_time: '10:00',
        flight_date: '2023-01-01',
        dropoff_point: 'JFK Airport',
        airline: 'Delta'
      }, 'mockToken');
    });
  });
});

