import {MY_API_URL} from './constants';

class MainApi {
  constructor(url) {
    this._url = url;
    this._headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  };

  _checkHeaders = () => {
    this._token = localStorage.getItem('token');
    this._headers.authorization = `Bearer ${this._token}`;
    return this._headers;
  };

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Ошибка: ${res.status} ${res.statusText}`);
    }
  }

  register(name, email, password) {
    return fetch(`${this._url}/signup`, {
      mode: 'no-cors',
      method: 'POST',
      headers:  {
        'Accept': '*/*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({name, email, password})
    })
    .then(this._checkResponse)
    .then((res) => {
      console.log(res);
      return res;
    })
  }

  login(email, password) {
    return fetch(`${this._url}/signin`, {
      mode: 'no-cors',
      method: 'POST',
      headers:  {
        'Accept': '*/*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({email, password})
    })
    .then(this._checkResponse)
    .then((data) => {
      if (data.token){
        localStorage.setItem('token', data.token);
        return data;
      }
    })
  }

  getUserInfo() {
    return fetch(`${this._url}/users/me`, {
      mode: 'no-cors',
      headers: this._checkHeaders(),
    })
    .then(this._checkResponse)
  }

  updateUserInfo({name, email}) {
    return fetch(`${this._url}/users/me`, {
      mode: 'no-cors',
      method: 'PATCH',
      headers: this._checkHeaders(),
      body: JSON.stringify({name, email})
    })
    .then(this._checkResponse)
  }

  getSavedMovies() {
    return fetch(`${this._url}/movies`, {
      mode: 'no-cors',
      headers: this._checkHeaders(),
    })
    .then(this._checkResponse)
  }

  deleteMovie(id) {
    return fetch(`${this._url}/movies/${id}`, {
      mode: 'no-cors',
      method: 'DELETE',
      headers: this._checkHeaders(),
    })
    .then(this._checkResponse)
  }

  saveMovie(body) {
    console.log(body)
    return fetch(`${this._url}/movies`, {
      mode: 'no-cors',
      method: 'POST',
      headers: this._checkHeaders(),
      body: JSON.stringify(body)

    })
    .then(this._checkResponse)
  }

  logOut() {
    return fetch(`${this._url}/signout`, {
      mode: 'no-cors',
      method: 'POST',
      headers: this._headers
    })
    .then(this._checkResponse)
  }
};

export const NewMainApi = new MainApi(MY_API_URL);