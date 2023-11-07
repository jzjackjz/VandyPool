import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useAuth } from '../../AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import LogIn from './LogIn';


jest.mock('../../AuthContext', () => ({
  useAuth: jest.fn(),
}));

jest.mock('axios');
jest.mock('@react-oauth/google', () => ({
  GoogleLogin: ({ onSuccess, onFailure }) => (
    <button onClick={() => onSuccess({ credential: 'test-credential' })}>
      Mock Google Login
    </button>
  ),
}));
jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
}));


describe('LogIn', () => {
  const mockSetIsAuthenticated = jest.fn();
  const mockNavigate = jest.fn();

  beforeEach(() => {
    useAuth.mockImplementation(() => ({ setIsAuthenticated: mockSetIsAuthenticated }));
    useNavigate.mockReturnValue(mockNavigate);
    localStorage.clear();
    axios.post.mockClear();
    mockNavigate.mockClear();
  });

  it('navigates to the home page if a session token is found in localStorage', () => {
    localStorage.setItem('sessionToken', 'test-token');
    render(<LogIn />);
    expect(mockNavigate).toHaveBeenCalledWith('/');
  });

  it('displays an error if Google login fails', async () => {
    render(<LogIn />);
    axios.post.mockRejectedValue({
      response: { data: { message: 'Google login failed' } },
    });

    fireEvent.click(screen.getByText('Mock Google Login'));

    await waitFor(() => screen.getByText('Error during Google login: Google login failed'));
    expect(screen.getByText('Error during Google login: Google login failed')).toBeInTheDocument();
  });

  it('sets the session token and navigates home on successful Google login', async () => {
    const response = { data: { sessionToken: 'new-token' } };
    axios.post.mockResolvedValue(response);

    render(<LogIn />);
    fireEvent.click(screen.getByText('Mock Google Login'));

    await waitFor(() => expect(localStorage.getItem('sessionToken')).toEqual('new-token'));
    await waitFor(() => expect(mockSetIsAuthenticated).toHaveBeenCalledWith(true));
    await waitFor(() => expect(mockNavigate).toHaveBeenCalledWith('/'));
  });


describe('LogIn - Register button click', () => {
    const mockSetIsAuthenticated = jest.fn();
    const mockNavigate = jest.fn();
  
    beforeEach(() => {
      useAuth.mockImplementation(() => ({ setIsAuthenticated: mockSetIsAuthenticated }));
      useNavigate.mockReturnValue(mockNavigate);
      mockNavigate.mockClear();
    });
  
    it('navigates to the registration page when clicking on the register button', () => {
      render(<LogIn />);
      const registerButton = screen.getByText('register here');
      fireEvent.click(registerButton);
      expect(mockNavigate).toHaveBeenCalledWith('/');
    });
  });
});
