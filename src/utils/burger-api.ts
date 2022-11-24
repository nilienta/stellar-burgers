import { getCookie } from './cookie';

export const checkResponse = (res: Response) => {
  return res.ok
    ? res.json()
    : res.json().then((err: Error) => Promise.reject(err));
};

export const request = async (url: string, options: Object) => {
  const res = await fetch(url, options);
  return checkResponse(res);
};

export const defaultOptions = (data = {}): RequestInit => {
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

export const getData = (
  URL: string,
  method: string,
  data?: Object,
  token = false
) => {
  let query: RequestInit = {
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
