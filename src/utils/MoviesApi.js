import {MOVIES_URL} from './constants';

class MoviesApi {
  constructor(url) {
    this._url = url;
    this._headers = {
      'Content-Type': 'application/json'
    }
  };

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  }

  getMovies() {
    return fetch(`${this._url}/beatfilm-movies`)
      .then(this._checkResponse)
  }
};

export const NewMoviesApi = new MoviesApi(MOVIES_URL);