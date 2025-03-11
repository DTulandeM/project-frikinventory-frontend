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

  editProduct(data) {
    return fetch(`${this.baseUrl}/products/${data._id}`, {
      method: "PUT",
      headers: this.headers,
      body: JSON.stringify({
        id: data._id,
        name: data.name,
        price: data.price,
        quantity: data.quantity,
        buyCost: data.buyCost,
        typeOfProduct: data.typeOfProduct,
        articuleRef: data.articuleRef,
      }),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    });
  }
  addNewProduct(data) {
    return fetch(`${this.baseUrl}/products`, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify({
        image: data.image,
        name: data.name,
        price: data.price,
        quantity: data.quantity,
        buyCost: data.buyCost,
        typeOfProduct: data.typeOfProduct,
        articuleRef: data.articuleRef,
      }),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    });
  }

  removeProduct(productId) {
    return fetch(`${this.baseUrl}/products/${productId}`, {
      method: "DELETE",
      headers: this.headers,
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    });
  }

  editUser(data) {
    return fetch(`${this.baseUrl}/users/me`, {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify({
        name: data.name,
        userImage: data.userImage,
      }),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    });
  }

  setAuthToken(token) {
    this.headers.authorization = `Bearer ${token}`;
  }
}

const api = new Api({
  baseUrl: "http://localhost:3000",

  headers: {
    authorization: "",
    "Content-Type": "application/json; charset=UTF-8",
  },
});

export default api;
