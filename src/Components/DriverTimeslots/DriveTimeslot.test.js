import React from 'react';
import { render, waitFor, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import axios from 'axios';
import DriverTimeslots from './DriverTimeslots';
import { BrowserRouter } from 'react-router-dom';

// Mocks
jest.mock('axios');
jest.spyOn(window, 'alert').mockImplementation(() => {}); // Mock window.alert

const renderWithRouter = (component) => {
  return {
    ...render(<BrowserRouter>{component}</BrowserRouter>),
  };
};

describe('DriverTimeslots Component', () => {
  const mockTimeslots = [
    { id: 1, date: '2023-04-01', time: '10:00', space_available: 5 },
    { id: 2, date: '2023-04-02', time: '11:00', space_available: 3 }
  ];

  beforeEach(() => {
    localStorage.setItem('username', 'testuser');
    axios.get.mockResolvedValue({ data: mockTimeslots });
    axios.delete.mockResolvedValue({});
  });

  afterEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  it('fetches and displays timeslots', async () => {
    renderWithRouter(<DriverTimeslots />);
    await waitFor(() => {
      mockTimeslots.forEach((timeslot) => {
        expect(screen.getByText(timeslot.date)).toBeInTheDocument();
        expect(screen.getByText(timeslot.time)).toBeInTheDocument();
        expect(screen.getByText(timeslot.space_available)).toBeInTheDocument();
      });
    });
  });

  it('handles timeslot deletion', async () => {
    renderWithRouter(<DriverTimeslots />);
    await waitFor(() => expect(screen.getByText(mockTimeslots[0].date)).toBeInTheDocument());
  
    const deleteButtons = screen.getAllByTestId('delete-icon');
    const firstDeleteButton = deleteButtons[0];
    fireEvent.click(firstDeleteButton);
  
    await waitFor(() => {
      expect(axios.delete).toHaveBeenCalled();
    });
  });

  it('navigates to new timeslot creation page', () => {
    renderWithRouter(<DriverTimeslots />);
    const newTimeslotLink = screen.getByText('+ New Timeslot').closest('a');
    expect(newTimeslotLink).toHaveAttribute('href', '/NewTimeslot');
  });

});
