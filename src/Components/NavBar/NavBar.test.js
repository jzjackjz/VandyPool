import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { useAuth } from '../../AuthContext';
import NavBar from './NavBar';

// Mock authentication
jest.mock('../../AuthContext', () => ({
  useAuth: jest.fn(),
}));

const mockAuthenticated = (isAuthenticated) => {
  useAuth.mockImplementation(() => ({ isAuthenticated }));
};

describe('NavBar', () => {
  it('should show login link when user is not authenticated', () => {
    mockAuthenticated(false);
    
    render(
      <Router>
        <NavBar />
      </Router>
    );

    expect(screen.getByText(/vandypool/i)).toBeInTheDocument();
    expect(screen.getByText(/log in/i)).toBeInTheDocument();
    expect(screen.queryByText(/log out/i)).toBeNull();
  });

  it('should show user links when user is authenticated', () => {
    mockAuthenticated(true);
    
    render(
      <Router>
        <NavBar />
      </Router>
    );

    expect(screen.getByText(/my account/i)).toBeInTheDocument();
    expect(screen.getByText(/riders/i)).toBeInTheDocument();
    expect(screen.getByText(/drivers/i)).toBeInTheDocument();
    expect(screen.getByText(/log out/i)).toBeInTheDocument();
    expect(screen.queryByText(/log in/i)).toBeNull();
  });
});

