import APIService from './APIService';

// Mock global fetch
global.fetch = jest.fn();

describe("APIService", () => {
  const mockToken = "test-token";
  const mockAPIBaseURL = "http://localhost:3000";
  process.env.REACT_APP_API_BASE_URL = mockAPIBaseURL;

  beforeEach(() => {
    fetch.mockClear();
  });

  describe("InsertFlightInformation", () => {
    const mockFlightInfo = { flightNumber: "ABC123", date: "2023-04-01" };

    it("sends a POST request with correct body and headers", async () => {
      fetch.mockResolvedValueOnce({
        json: () => Promise.resolve({ message: "Flight information inserted" }),
      });

      await APIService.InsertFlightInformation(mockFlightInfo, mockToken);

      expect(fetch).toHaveBeenCalledWith(`${mockAPIBaseURL}/flights/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${mockToken}`,
        },
        body: JSON.stringify(mockFlightInfo),
      });
    });
  });

  describe("InsertDriverInfo", () => {
    const mockDriverInfo = { name: "John Doe", vehicle: "Car" };

    it("sends a POST request with correct body and headers", async () => {
      fetch.mockResolvedValueOnce({
        json: () => Promise.resolve({ message: "Driver information inserted" }),
      });

      await APIService.InsertDriverInfo(mockDriverInfo, mockToken);

      expect(fetch).toHaveBeenCalledWith(`${mockAPIBaseURL}/driver/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${mockToken}`,
        },
        body: JSON.stringify(mockDriverInfo),
      });
    });
  });
});
