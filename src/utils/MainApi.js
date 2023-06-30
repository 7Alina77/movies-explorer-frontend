import {MY_API_URL} from './constants';

class MainApi {
  constructor(url) {
    this._url = url;
    this._headers = {
      "Accept": "application/json",
      "Content-Type": "application/json",
    }
  };

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  }

  register = (name, email, pass) => {
    return fetch(`${this._url}/signup`, {
      method: 'POST',
      headers: this._headers,
      credentials: 'include',
      body: JSON.stringify(name, email, pass)
    })
    .then(this._checkResponse)
    .then((res) => {
      return res;
    })
  }

  login(name, email) {
    return fetch(`${this._url}/signin`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify(name, email)
    })
    .then(this._checkResponse)
    .then((res) => {
      return res;
    })
  }

  getUserInfo() {
    return fetch(`${this._url}/users/me`, {
      headers: this._headers,
    })
    .then(this._checkResponse)
  }

  updateUserInfo({name, email}) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({name, email})
    })
    .then(this._checkResponse)
  }

  getSavedMovies() {
    return fetch(`${this._url}/movies`, {
      headers: this._headers,
    })
    .then(this._checkResponse)
  }

  deleteMovie(id) {
    return fetch(`${this._url}/movies/${id}`, {
      method: 'DELETE',
      headers: this._headers,
    })
    .then(this._checkResponse)
  }

  saveMovie(body) {
    return fetch(`${this._url}/movies`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify(body)

    })
    .then(this._checkResponse)
  }

  logOut() {
    return fetch(`${this._url}/signout`, {
      method: 'POST',
      headers: this._headers
    })
    .then(this._checkResponse)
  }
};

export const NewMainApi = new MainApi(MY_API_URL);