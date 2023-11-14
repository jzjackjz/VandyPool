import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import { AuthProvider, useAuth } from './AuthContext';

// Mock component to test useAuth hook
const MockComponent = () => {
  const { isAuthenticated, setIsAuthenticated } = useAuth();
  return (
    <div>
      <span>Authenticated: {isAuthenticated.toString()}</span>
      <button onClick={() => setIsAuthenticated(true)}>Log in</button>
    </div>
  );
};

describe('AuthContext', () => {
  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  it('initializes isAuthenticated as false when no session token is present', () => {
    render(
      <AuthProvider>
        <MockComponent />
      </AuthProvider>
    );

    expect(screen.getByText('Authenticated: false')).toBeInTheDocument();
  });

  it('initializes isAuthenticated as true when a session token is present', () => {
    localStorage.setItem('sessionToken', 'test-token');
    render(
      <AuthProvider>
        <MockComponent />
      </AuthProvider>
    );

    expect(screen.getByText('Authenticated: true')).toBeInTheDocument();
  });

  it('allows changing isAuthenticated through setIsAuthenticated', () => {
    render(
      <AuthProvider>
        <MockComponent />
      </AuthProvider>
    );

    act(() => {
      fireEvent.click(screen.getByText('Log in'));
    });

    expect(screen.getByText('Authenticated: true')).toBeInTheDocument();
  });
});
