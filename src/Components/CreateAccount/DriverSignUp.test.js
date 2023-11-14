import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import DriverSignUp from './DriverSignUp';
import APIService from '../../APIService';
import { BrowserRouter } from 'react-router-dom';

// Mock the APIService
jest.mock('../../APIService');

// Mock the useNavigate hook
const mockedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedNavigate,
}));

describe('DriverSignUp Component', () => {
  it('renders correctly', () => {
    const { getByPlaceholderText, getByText } = render(
      <BrowserRouter>
        <DriverSignUp />
      </BrowserRouter>
    );

    expect(getByPlaceholderText('Car Model')).toBeInTheDocument();
    expect(getByPlaceholderText('Car Color')).toBeInTheDocument();
    expect(getByPlaceholderText('License Plate')).toBeInTheDocument();
    expect(getByText('Submit')).toBeInTheDocument();
  });

  it('allows input to be set', () => {
    const { getByPlaceholderText } = render(
      <BrowserRouter>
        <DriverSignUp />
      </BrowserRouter>
    );

    fireEvent.change(getByPlaceholderText('Car Model'), { target: { value: 'Model X' } });
    fireEvent.change(getByPlaceholderText('Car Color'), { target: { value: 'Red' } });
    fireEvent.change(getByPlaceholderText('License Plate'), { target: { value: 'XYZ123' } });

    expect(getByPlaceholderText('Car Model').value).toBe('Model X');
    expect(getByPlaceholderText('Car Color').value).toBe('Red');
    expect(getByPlaceholderText('License Plate').value).toBe('XYZ123');
  });

  it('submits the form and navigates on success', async () => {
    APIService.InsertDriverInfo.mockResolvedValue({ data: 'Success' });

    const { getByPlaceholderText, getByText } = render(
      <BrowserRouter>
        <DriverSignUp />
      </BrowserRouter>
    );

    fireEvent.change(getByPlaceholderText('Car Model'), { target: { value: 'Model X' } });
    fireEvent.change(getByPlaceholderText('Car Color'), { target: { value: 'Red' } });
    fireEvent.change(getByPlaceholderText('License Plate'), { target: { value: 'XYZ123' } });
    fireEvent.click(getByText('Submit'));

    await waitFor(() => expect(APIService.InsertDriverInfo).toHaveBeenCalled());
    expect(mockedNavigate).toHaveBeenCalledWith('/AccountInfo', { replace: true });
  });

  // More tests can be added for error handling, invalid inputs, etc.
});