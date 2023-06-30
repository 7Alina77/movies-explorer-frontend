import {MY_API_URL} from './constants';

const checkResponse = response => response.ok ? response.json() : Promise.reject(`${response.status}`);
  
export const register = (name, email, password) => {
  return fetch(`${MY_API_URL}/signup`, {
    mode: 'no-cors',
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({name, email, password}),
  })
  .then(response => checkResponse(response))
  .then((res) => {
    return res;
  })
}

export const authorize = (email, password) => {
  return fetch(`${MY_API_URL}/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(email,password)
  })
  .then(response => checkResponse(response))
}; 

export const logout = () => {
  return fetch(`${MY_API_URL}/signout`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(response => checkResponse(response))
}