import { getCookie } from '../services/utils';

export const checkResponse = (res) => {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

export const request = (url, options = defaultOptions) => {
  return fetch(url, options).then(checkResponse);
};

export const requestDefault = (url, data) => {
  return fetch(url, defaultOptions(data)).then(checkResponse);
};

export const requestDefaultToken = (url) => {
  return fetch(url, defaultOptionsToken()).then(checkResponse);
};

export const requestDefaultPatch = (url, form) => {
  return fetch(url, defaultOptionsPatch(form)).then(checkResponse);
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

export const defaultOptionsToken = () => {
  return {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + getCookie('accessToken'),
    },
  };
};

export const defaultOptionsPatch = (form) => {
  return {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + getCookie('accessToken'),
    },
    body: JSON.stringify(form),
  };
};
export const getData = (URL, method, data) => {
  let query = undefined;
  if (method === 'POST') {
    query = {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json: charset=utf-8',
      },
    };
  }
  return request(URL, query);
};
