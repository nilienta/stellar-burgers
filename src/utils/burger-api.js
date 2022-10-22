const checkResponse = (res) => {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

const request = (url, options) => {
  return fetch(url, options).then(checkResponse);
};

const getData = (URL, method, data) => {
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

export default getData;
