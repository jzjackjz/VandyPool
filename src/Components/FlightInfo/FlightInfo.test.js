import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import FlightInfo from './FlightInfo';

test('renders Flight Registration header', () => {
    render(
      <MemoryRouter>
        <FlightInfo />
      </MemoryRouter>
    );
    const headerElement = screen.getByText(/Flight Registration/i);
    expect(headerElement).toBeInTheDocument();
  });
  