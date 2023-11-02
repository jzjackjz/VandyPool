import { useCookies } from "react-cookie";
import axios from 'axios';

export default class APIService {
    static LoginUser(body) {
        return fetch('http://127.0.0.1:8000/auth/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(body)
        }).then(resp => resp.json())
      }

    static InsertFlightInformation(body, token) {
        return fetch('http://127.0.0.1:8000/flights/', {
            'method':'POST',
            headers: {
                'Content-Type':'application/json',
                'Authorization': `Token ${token['mytoken']}`
            },
            body:JSON.stringify(body)

        }).then(resp=> resp.json())
    }
}