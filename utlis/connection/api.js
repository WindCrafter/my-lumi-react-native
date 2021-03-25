import { _global } from '../global/global';
import { globalApp } from '../../logs/logs';
import { formatTimeNow } from '../../logs/helpers';

export async function _POST(url, data, token, loading = true) {
  console.log('___POST: ', url, data, token);
  if (loading) {
    _global.Loading.show();
  }
  if (globalApp.customLog && globalApp.customLog.enableLog) {
    globalApp.customLog.emitEvent({
      type: 'call_api',
      method: 'POST',
      payload: {
        url,
        data,
        token,
        time: formatTimeNow(),
      },
    });
  }
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: ` Bearer ${token}`,
    },
    body: JSON.stringify(data),
  })
    .then(res => res.json())
    .catch(error => {
      _global.Loading.hide();
      if (globalApp.customLog && globalApp.customLog.enableLog) {
        globalApp.customLog.emitEvent({
          type: 'call_api_response',
          payload: `POST_ERROR:: ${url}${JSON.stringify(
            error,
          )}\nTIME_RES:: ${formatTimeNow()}`,
        });
      }
      return error;
    });

  if (globalApp.customLog && globalApp.customLog.enableLog) {
    globalApp.customLog.emitEvent({
      type: 'call_api_response',
      payload: `POST_RES:: ${url}${JSON.stringify(
        response,
      )}\nTIME_RES:: ${formatTimeNow()}`,
    });
  }

  return response;
}

export function _PUT(url, data, token) {
  const response = fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: ` Bearer ${token}`,
    },
    body: JSON.stringify(data),
  }).then(res => res.json());

  return response;
}

export async function _GET(url, token, loading) {
  console.log('___GET', url);
  if (loading) {
    _global.Loading.show();
  }
  if (globalApp.customLog && globalApp.customLog.enableLog) {
    globalApp.customLog.emitEvent({
      type: 'call_api',
      method: 'GET',
      payload: {
        url,
        token,
        time: formatTimeNow(),
      },
    });
  }
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: ` Bearer ${token}`,
    },
  })
    .then(res => res.json())
    .catch(error => {
      _global.Loading.hide();
      if (globalApp.customLog && globalApp.customLog.enableLog) {
        globalApp.customLog.emitEvent({
          type: 'call_api_response',
          payload: `POST_ERROR:: ${url}${JSON.stringify(
            error,
          )}\nTIME_RES:: ${formatTimeNow()}`,
        });
      }
      return error;
    });

  if (globalApp.customLog && globalApp.customLog.enableLog) {
    globalApp.customLog.emitEvent({
      type: 'call_api_response',
      payload: `POST_RES:: ${url}${JSON.stringify(
        response,
      )}\nTIME_RES:: ${formatTimeNow()}`,
    });
  }
  return response;
}

export async function _POST_WIFI(url, data, token, loading = true) {
  console.log('___POST: ', url, data, token);
  if (globalApp.customLog && globalApp.customLog.enableLog) {
    globalApp.customLog.emitEvent({
      type: 'call_api',
      method: 'POST_WIFI',
      payload: {
        url,
        token,
        time: formatTimeNow(),
      },
    });
  }
  if (loading) {
    _global.Loading.show();
  }
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: ` Bearer ${token}`,
    },
    body: JSON.stringify(data),
  })
    .then(res => {
      return res.status === 403
        ? {
          success: false,
          statusCode: 403,
          message: '',
        }
        : res.json();
    })
    .catch(error => {
      _global.Loading.hide();
      if (globalApp.customLog && globalApp.customLog.enableLog) {
        globalApp.customLog.emitEvent({
          type: 'call_api_response',
          payload: `POST_WIFI_ERROR:: ${url}${JSON.stringify(
            error,
          )}\nTIME_RES:: ${formatTimeNow()}`,
        });
      }
      return error;
    });

  if (globalApp.customLog && globalApp.customLog.enableLog) {
    globalApp.customLog.emitEvent({
      type: 'call_api_response',
      payload: `POST_WIFI_RES:: ${url}${JSON.stringify(
        response,
      )}\nTIME_RES:: ${formatTimeNow()}`,
    });
  }

  return response;
}
export async function _UPLOAD(url, files, token, loading) {
  console.log('UPLOAD', url);
  if (loading) {
    _global.Loading.show();
  }
  if (globalApp.customLog && globalApp.customLog.enableLog) {
    globalApp.customLog.emitEvent({
      type: 'call_api',
      method: 'UPLOAD',
      payload: {
        url,
        token,
        time: formatTimeNow(),
      },
    });
  }
  const formData = new FormData();
  formData.append('UploadForm[files]', { uri: files.url, name: files.name, type: 'image/jpeg' });
  console.log('UPLOAD FILE::', files);

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: ` Bearer ${token}`,
    },
    body: formData,
  })
    .then(res => res.json())
    .catch(error => {
      _global.Loading.hide();
      if (globalApp.customLog && globalApp.customLog.enableLog) {
        globalApp.customLog.emitEvent({
          type: 'call_api_response_image',
          payload: `POST_ERROR:: ${url}${JSON.stringify(
            error,
          )}\nTIME_RES:: ${formatTimeNow()}`,
        });
      }
      return error;
    });

  if (globalApp.customLog && globalApp.customLog.enableLog) {
    globalApp.customLog.emitEvent({
      type: 'call_api_response_image',
      payload: `POST_RES:: ${url}${JSON.stringify(
        response,
      )}\nTIME_RES:: ${formatTimeNow()}`,
    });
  }
  return response;
}
