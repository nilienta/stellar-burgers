import { getCookie } from './cookie';

export const checkResponse = (res) => {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

export const request = (url, options) => {
  return fetch(url, options).then(checkResponse);
};

export const defaultOptions = (data = {}) => {
  return {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify(data),
  };
};

export const getData = (URL, method, data, token = false) => {
  let query = {
    method: method,
    headers: {
      'Content-Type': 'application/json',
    },
  };
  if (token) {
    query = {
      ...query,
      headers: {
        ...query.headers,
        Authorization: 'Bearer ' + getCookie('accessToken'),
      },
    };
  }
  if (method === 'PATCH') {
    query = { ...query, body: JSON.stringify(data) };
  }
  if (method === 'POST') {
    query = defaultOptions(data);
  }
  return request(URL, query);
};
