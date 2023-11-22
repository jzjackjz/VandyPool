export default class APIService {
  static InsertDriverInfo(body, token) {
    return fetch(`${process.env.REACT_APP_API_BASE_URL}/driver/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
      body: JSON.stringify(body),
    }).then((resp) => resp.json());
  }
}
