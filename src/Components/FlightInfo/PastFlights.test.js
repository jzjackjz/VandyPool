import React from 'react';
import { render, waitFor, act } from '@testing-library/react';
import axios from 'axios';
import PastFlights from './PastFlights';
import { BrowserRouter as Router } from 'react-router-dom';

jest.mock('axios');

describe('PastFlights Component', () => {
  const mockFlights = [
    {
      id: 1,
      ride_type: 'Economy',
      flight_time: '10:00',
      flight_date: '2023-01-01',
      dropoff_point: 'Airport A',
      airline: 'Airline A',
    }
  ];

  beforeEach(() => {
    axios.get.mockResolvedValue({ data: mockFlights });
    localStorage.setItem('username', 'testUser');
  });

  afterEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  test('renders without crashing', () => {
    render(
      <Router>
        <PastFlights />
      </Router>
    );
  });

  test('fetches past flights successfully and displays them', async () => {
    const { getByText } = render(
      <Router>
        <PastFlights />
      </Router>
    );

    await waitFor(() => {
      mockFlights.forEach(flight => {
        expect(getByText(flight.ride_type)).toBeInTheDocument();
        expect(getByText(flight.flight_time)).toBeInTheDocument();
        expect(getByText(flight.flight_date)).toBeInTheDocument();
        expect(getByText(flight.dropoff_point)).toBeInTheDocument();
        expect(getByText(flight.airline)).toBeInTheDocument();
      });
    });
  });

  test('identifies past dates correctly', async () => {
    const pastDate = '2023-01-01';
    const futureDate = '2024-01-01';
  
    const currentDate = new Date('2023-06-01');
    jest.spyOn(global, 'Date').mockImplementation(() => currentDate);
  
    const { queryByText } = render(
      <Router>
        <PastFlights />
      </Router>
    );
  
    await waitFor(() => {
      expect(queryByText(pastDate)).not.toBeInTheDocument();
    });
    global.Date.mockRestore();
  });
});

