import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import NewTimeslots from './NewTimeslots';
import axios from 'axios';
import { MemoryRouter } from 'react-router-dom';

// Mocking axios and useNavigate
jest.mock('axios');
const mockedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedNavigate,
}));

describe('NewTimeslots Component', () => {
  // Mock localStorage
  beforeEach(() => {
    Storage.prototype.getItem = jest.fn(() => 'mockUsername');
  });

  it('should update states on input change', () => {
    const { getByPlaceholderText } = render(<NewTimeslots />, { wrapper: MemoryRouter });
    
    // Example for date input
    const dateInput = getByPlaceholderText('Select A Date');
    fireEvent.change(dateInput, { target: { value: '2023-01-01' } });
    expect(dateInput.value).toBe('2023-01-01');
    // Repeat for other inputs
  });

  it('should handle error on form submission failure', async () => {
    axios.post.mockRejectedValue(new Error('Network error')); // Mock axios post to reject
  
    const { getByText } = render(<NewTimeslots />, { wrapper: MemoryRouter });
  
    // Trigger submit without setting input values to simulate a failed submission
    fireEvent.click(getByText('Submit'));
  
    // Since handleSubmit is an async function, we wait for the axios call to be made
    await expect(axios.post).toHaveBeenCalled();
  });
  

  // Additional tests can be added as needed
});
