import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import APIService from '../../APIService';
import FlightInfo from './FlightInfo';

// Mock APIService
jest.mock('../../APIService', () => ({
  InsertFlightInformation: jest.fn(),
}));

// Mock useNavigate
const mockedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedNavigate,
}));

beforeEach(() => {
  localStorage.setItem('sessionToken', 'fake-token');
});

afterEach(() => {
  localStorage.removeItem('sessionToken');
});

test('renders all form inputs', () => {
  render(
    <MemoryRouter>
      <FlightInfo />
    </MemoryRouter>
  );
  // Check all inputs are in the document
  expect(screen.getByPlaceholderText('Flight Time')).toBeInTheDocument();
  expect(screen.getByPlaceholderText('Flight Date')).toBeInTheDocument();
  expect(screen.getByPlaceholderText('Dropoff Point')).toBeInTheDocument();
  expect(screen.getByPlaceholderText('Airline')).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /Submit/i })).toBeInTheDocument();
});

test('allows users to fill out and submit the form', async () => {
  APIService.InsertFlightInformation.mockResolvedValue({ success: true });

  render(
    <MemoryRouter>
      <FlightInfo />
    </MemoryRouter>
  );

  fireEvent.change(screen.getByPlaceholderText('Flight Time'), { target: { value: '10:00' } });
  fireEvent.change(screen.getByPlaceholderText('Flight Date'), { target: { value: '2023-12-24' } });
  fireEvent.change(screen.getByPlaceholderText('Dropoff Point'), { target: { value: 'Terminal 1' } });
  fireEvent.change(screen.getByPlaceholderText('Airline'), { target: { value: 'Delta' } });
  fireEvent.click(screen.getByRole('button', { name: /Submit/i }));

  await waitFor(() => {
    // Expect the InsertFlightInformation method to be called with the form data and the session token
    expect(APIService.InsertFlightInformation).toHaveBeenCalledWith({
      ride_type: expect.any(String),
      flight_time: '10:00',
      flight_date: '2023-12-24',
      dropoff_point: 'Terminal 1',
      airline: 'Delta'
    }, 'fake-token');

    // Expect the navigate function to be called after successful form submission
    expect(mockedNavigate).toHaveBeenCalledWith("/FlightInfo");
  });
});
