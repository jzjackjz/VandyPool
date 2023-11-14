import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import axios from 'axios';
import AxiosMockAdapter from 'axios-mock-adapter';
import { MemoryRouter } from 'react-router-dom';

import ConnectDrivers from './ConnectDrivers'; // Adjust the path as needed

// Mock axios
const mock = new AxiosMockAdapter(axios);

window.alert = jest.fn();

// Mock data for the API response
const mockDriversData = [
  { id: '1', user: 'driver1', date: '2023-01-01', time: '10:00', space_available: '2' },
  // Add more mock driver data as necessary
];

// Mock local storage
const localStorageMock = (function() {
  let store = {};
  return {
    getItem: function(key) {
      return store[key] || null;
    },
    setItem: function(key, value) {
      store[key] = value.toString();
    },
    clear: function() {
      store = {};
    }
  };
})();
Object.defineProperty(window, 'localStorage', { value: localStorageMock });

// Mocking useLocation hook
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: () => ({
    state: { flight: { flight_date: '2023-01-01' } }
  })
}));

describe('ConnectDrivers Component', () => {
  beforeEach(() => {
    window.localStorage.setItem('username', 'testuser');
    mock.reset();
  });

  it('renders and makes an API call', async () => {
    mock.onGet(`${process.env.REACT_APP_API_BASE_URL}/timeslot/`).reply(200, mockDriversData);

    render(
      <MemoryRouter>
        <ConnectDrivers />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Drivers Avaialble For 2023-01-01')).toBeInTheDocument();
      expect(screen.getByText('driver1')).toBeInTheDocument();
      // Add assertions for other driver details
    });
  });
});
