import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import RiderSignUp from './RiderSignUp';
import axios from 'axios';
import { useAuth } from '../../AuthContext';
import { useNavigate } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';

jest.mock('axios');
jest.mock('../../AuthContext');

// Mock for useNavigate
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'), // Preserve other exports
  useNavigate: () => mockNavigate,
}));

describe('RiderSignUp', () => {
  const mockSetIsAuthenticated = jest.fn();

  beforeEach(() => {
    useAuth.mockImplementation(() => ({ setIsAuthenticated: mockSetIsAuthenticated }));
    mockNavigate.mockClear();
  });

  it('renders correctly', () => {
    const mockClientId = 'your-mock-client-id'; // Replace with an appropriate mock ID
    const { getByText } = render(
      <GoogleOAuthProvider clientId={mockClientId}>
        <RiderSignUp />
      </GoogleOAuthProvider>
    );
    expect(getByText('Register For An Account')).toBeInTheDocument();
  });

  // Continue with additional tests
});
