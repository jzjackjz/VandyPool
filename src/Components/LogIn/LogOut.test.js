import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useAuth } from '../../AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import LogOut from './LogOut';


jest.mock('../../AuthContext', () => ({
  useAuth: jest.fn(),
}));
jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
}));

describe('LogOut', () => {
  const mockSetIsAuthenticated = jest.fn();
  const mockNavigate = jest.fn();

  beforeEach(() => {
    mockSetIsAuthenticated.mockClear();
    mockNavigate.mockClear();

    useAuth.mockImplementation(() => ({ setIsAuthenticated: mockSetIsAuthenticated }));
    useNavigate.mockReturnValue(mockNavigate);

    // Mock the localStorage methods
    Storage.prototype.removeItem = jest.fn();
    Storage.prototype.getItem = jest.fn();

    // Mock the axios defaults
    delete axios.defaults.headers.common['Authorization'];
  });

  it('should clear the session token from localStorage', () => {
    render(<LogOut />);
    expect(localStorage.removeItem).toHaveBeenCalledWith('sessionToken');
  });

  it('should delete the Authorization header from axios defaults', () => {
    render(<LogOut />);
    expect(axios.defaults.headers.common['Authorization']).toBeUndefined();
  });

  it('should set isAuthenticated to false', () => {
    render(<LogOut />);
    expect(mockSetIsAuthenticated).toHaveBeenCalledWith(false);
  });

  it('should navigate to the home page', () => {
    render(<LogOut />);
    expect(mockNavigate).toHaveBeenCalledWith('/');
  });
});
