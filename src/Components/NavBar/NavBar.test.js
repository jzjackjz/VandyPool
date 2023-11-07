import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import NavBar from './NavBar';
import { useAuth } from '../../AuthContext';

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

    expect(screen.getByText(/vandypool/i)).toBeInTheDocument();
    expect(screen.getByText(/account info/i)).toBeInTheDocument();
    expect(screen.getByText(/connect with passengers/i)).toBeInTheDocument();
    expect(screen.getByText(/flight info/i)).toBeInTheDocument();
    expect(screen.getByText(/view drivers/i)).toBeInTheDocument();
    expect(screen.getByText(/view current timeslots/i)).toBeInTheDocument();
    expect(screen.getByText(/log out/i)).toBeInTheDocument();
    expect(screen.queryByText(/log in/i)).toBeNull();
  });
});
