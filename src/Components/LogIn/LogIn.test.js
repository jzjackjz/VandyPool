import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import axios from 'axios';
import LogIn from './LogIn';
import { useAuth } from '../../AuthContext';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';

// Mocks
jest.mock('@react-oauth/google', () => ({
  GoogleOAuthProvider: ({ children }) => <div>{children}</div>,
  GoogleLogin: ({ onSuccess, onFailure }) => (
    <button onClick={() => onSuccess({
      credential: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RAZXhhbXBsZS5jb20iLCJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IlRlc3QgVXNlciIsImlhdCI6MTUxNjIzOTAyMn0.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c' // Mock JWT Token
    })}>
      Mock Google Login
    </button>
  ),
}));

jest.mock('axios');
jest.mock('../../AuthContext', () => ({
  useAuth: jest.fn(),
}));
jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
}));

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
    },
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});


describe('LogIn Component', () => {
  let mockSetIsAuthenticated;
  let mockNavigate;

  beforeEach(() => {
    mockSetIsAuthenticated = jest.fn();
    mockNavigate = jest.fn();
    useAuth.mockImplementation(() => ({ setIsAuthenticated: mockSetIsAuthenticated }));
    useNavigate.mockReturnValue(mockNavigate);
    localStorage.clear();
    axios.post.mockClear();
    mockNavigate.mockClear();
  });

  it('navigates to the home page if a session token is found in localStorage', async () => {
    localStorage.setItem('sessionToken', 'test-token');
    render(<LogIn />);
    
    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/');
    });
  });

  it('handles successful Google login', async () => {
    axios.post.mockResolvedValue({ data: { sessionToken: 'new-test-token' } });
  
    const setItemSpy = jest.spyOn(localStorage, 'setItem');
  
    render(<LogIn />);
    const loginButton = screen.getByText('Mock Google Login');
    fireEvent.click(loginButton);
  
    await waitFor(() => {
      console.log('localStorage.setItem was called:', setItemSpy.mock.calls);
      expect(setItemSpy).toHaveBeenCalledWith('username', expect.any(String));
      expect(setItemSpy).toHaveBeenCalledWith('sessionToken', 'new-test-token');
      expect(mockNavigate).toHaveBeenCalledWith('/');
    });
  
    // Clean up
    setItemSpy.mockRestore();
  });

  describe('Register button click', () => {
    it('navigates to the registration page when clicking on the register button', () => {
      render(<LogIn />);
      const registerButton = screen.getByText('register here');
      fireEvent.click(registerButton);
      expect(mockNavigate).toHaveBeenCalledWith('/');
    });
  });
});

