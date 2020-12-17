import {_global} from '../global/global';

export function _POST(url, data, token, loading = true) {
  console.log('POST: ', url, data, token);
  if (loading) {
    _global.Loading.show();
  }
  const response = fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: ' Bearer ' + token,
    },
    body: JSON.stringify(data),
  })
    .then((res) => {
      return res.json();
    })
    .catch((error) => {
      console.log(error);
      _global.Loading.hide();
      return error;
    });

  return response;
}

export function _PUT(url, data, token) {
  const response = fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: ' Bearer ' + token,
    },
    body: JSON.stringify(data),
  }).then((res) => res.json());

  return response;
}

export function _GET(url, token, loading) {
  console.log('_Get', url);
  if (loading) {
    _global.Loading.show();
  }
  const response = fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: ' Bearer ' + token,
    },
  })
    .then((res) => res.json())
    .catch((error) => {
      _global.Loading.hide();
      return error;
    });
  return response;
}
