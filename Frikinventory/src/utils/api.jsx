class Api {
  constructor(options) {
    this.baseUrl = options.baseUrl;
    this.headers = options.headers;
  }
  getProducts() {
    return fetch(`${this.baseUrl}/products`, {
      method: "GET",
      headers: this.headers,
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    });
  }
  getUserInfo() {
    return fetch(`${this.baseUrl}/users/me`, {
      method: "GET",
      headers: this.headers,
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    });
  }
}
const api = new Api({
  baseUrl: "http://localhost:3000",

  headers: {
    authorization:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2N2MzNWRjNDgzZjdkMDA0NTllNWQzOTYiLCJpYXQiOjE3NDA4NjUzMTMsImV4cCI6MTc0MTQ3MDExM30.Q0JtByIw02hAtOz_9vLshQ8ythx7x-HOMSR5YaiahMA",
    "Content-Type": "application/json; charset=UTF-8",
  },
});

export default api;
