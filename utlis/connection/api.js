import { _global } from '../global/global';
import { globalApp } from '../../logs/logs';
import { formatTimeNow } from '../../logs/helpers';

const URL_SEVER_API = window.typeServer == 'product'
  ? 'https://api.lumier.lumi.com.vn'
  : 'https://staging-api.lumier.lumi.com.vn';
export async function _POST(url, data, token, loading = true) {
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
        typeSever: window.typeServer,
      },
    });
  }
  const URL = `${URL_SEVER_API}${url}`;
  console.log('___POST: ', URL, data, token);

  console.log('URL', URL);
  const response = await fetch(URL, {
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
          payload: `POST_ERROR:: ${URL}${JSON.stringify(
            error,
          )}\nTIME_RES:: ${formatTimeNow()}`,
        });
      }
      return error;
    });

  if (globalApp.customLog && globalApp.customLog.enableLog) {
    globalApp.customLog.emitEvent({
      type: 'call_api_response',
      payload: `POST_RES:: ${URL}${JSON.stringify(
        response,
      )}\nTIME_RES:: ${formatTimeNow()}`,
    });
  }

  return response;
}

export function _PUT(url, data, token) {
  const URL = `${URL_SEVER_API}${url}`;

  const response = fetch(URL, {
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
        typeSever: window.typeServer,
      },
    });
  }
  const URL = `${URL_SEVER_API}${url}`;
  console.log('___GET', URL);

  const response = await fetch(URL, {
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
          payload: `POST_ERROR:: ${URL}${JSON.stringify(
            error,
          )}\nTIME_RES:: ${formatTimeNow()}`,
        });
      }
      return error;
    });

  if (globalApp.customLog && globalApp.customLog.enableLog) {
    globalApp.customLog.emitEvent({
      type: 'call_api_response',
      payload: `POST_RES:: ${URL}${JSON.stringify(
        response,
      )}\nTIME_RES:: ${formatTimeNow()}`,
    });
  }
  return response;
}

export async function _POST_WIFI(url, data, token, loading = true) {
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
  const URL = `${URL_SEVER_API}${url}`;
  console.log('____POST_WIFI: ', URL, data, token);

  const response = await fetch(URL, {
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
          payload: `POST_WIFI_ERROR:: ${URL}${JSON.stringify(
            error,
          )}\nTIME_RES:: ${formatTimeNow()}`,
        });
      }
      return error;
    });

  if (globalApp.customLog && globalApp.customLog.enableLog) {
    globalApp.customLog.emitEvent({
      type: 'call_api_response',
      payload: `POST_WIFI_RES:: ${URL}${JSON.stringify(
        response,
      )}\nTIME_RES:: ${formatTimeNow()}`,
    });
  }

  return response;
}
export async function _UPLOAD(url, files, token, loading) {
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
  // eslint-disable-next-line no-undef
  const formData = new FormData();
  formData.append('UploadForm[files]', {
    uri: files.url,
    name: files.name,
    type: 'image/jpeg',
  });
  formData.append('type', files.type);

  console.log('UPLOAD FILE::', files);
  const URL = `${URL_SEVER_API}${url}`;
  console.log('UPLOAD', URL);

  const response = await fetch(URL, {
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
          payload: `POST_ERROR:: ${URL}${JSON.stringify(
            error,
          )}\nTIME_RES:: ${formatTimeNow()}`,
        });
      }
      return error;
    });

  if (globalApp.customLog && globalApp.customLog.enableLog) {
    globalApp.customLog.emitEvent({
      type: 'call_api_response_image',
      payload: `POST_RES:: ${URL}${JSON.stringify(
        response,
      )}\nTIME_RES:: ${formatTimeNow()}`,
    });
  }
  return response;
}
