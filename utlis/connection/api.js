export function _POST(url, data, token) {
  const response = fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': ' Bearer ' + token,
    },
    body: JSON.stringify(data),
  }).then((res) => res.json());

  return response;
}

export function _PUT(url, data, token) {
  const response = fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': ' Bearer ' + token,
    },
    body: JSON.stringify(data),
  }).then((res) => res.json());

  return response;
}

export function _GET(url, token) {
  const response = fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': ' Bearer ' + token,
    },
  }).then((res) => {
    console.log(res)
    return res.json()
  });

  return response;
}
