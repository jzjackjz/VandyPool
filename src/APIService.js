export default class APIService {
  static InsertFlightInformation(body, token) {
    return fetch("http://127.0.0.1:8000/flights/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
      body: JSON.stringify(body),
    }).then((resp) => resp.json());
  }

  static InsertTimeslot(body, token) {
    return fetch("http://127.0.0.1:8000/timeslot/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
      body: JSON.stringify(body),
    }).then((resp) => resp.json());
  }
}
