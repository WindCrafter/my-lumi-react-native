import { _global } from '../global/global';

export function _POST(url, data, token) {
  _global.Loading.show();
  const response = fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: ' Bearer ' + token,
    },
    body: JSON.stringify(data),
  })
    .then(
      (res) => res.json(),
      setTimeout(() => {
        _global.Loading.hide();
      }, 200),
    )
    .catch((error) => {
      _global.Loading.hide();
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

export function _GET(url, token) {
  _global.Loading.show();
  const response = fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: ' Bearer ' + token,
    },
  })
    .then(
      (res) => res.json(),
      setTimeout(() => {
        _global.Loading.hide();
      }, 200),
    )
    .catch((error) => {
      _global.Loading.hide();
    });
  return response;
}
