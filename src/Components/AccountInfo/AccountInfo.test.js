import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import AccountInfo from './AccountInfo';
import axios from 'axios';

jest.mock('axios');
jest.mock('react-router-dom', () => ({
  useNavigate: () => jest.fn(),
  Link: ({children}) => <div>{children}</div>
}));

// Mock localStorage
const localStorageMock = (function() {
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
Object.defineProperty(window, 'localStorage', { value: localStorageMock });

test('renders AccountInfo with initial state', () => {
    const { getByText } = render(<AccountInfo />);
    expect(getByText(/Account Information/i)).toBeInTheDocument();
  });

test('loads and displays user info', async () => {
    axios.get.mockResolvedValue({
      data: { first_name: 'John', last_name: 'Doe', email: 'john@example.com', phone_number: '123456789', profile_picture_url: 'url' }
    });
  
    const { findByText } = render(<AccountInfo />);
  
    expect(await findByText(/John Doe/i)).toBeInTheDocument();
    expect(await findByText(/john@example.com/i)).toBeInTheDocument();
  });

test('handles failure in fetching user info', async () => {
    axios.get.mockRejectedValue(new Error('Async error'));
  
    const { findByText } = render(<AccountInfo />);
  
    await waitFor(() => {
    });
  });