import { takeLatest, put, select, delay } from 'redux-saga/effects';
import * as types from '../types';
import { URL } from '../../../utlis/connection/url';
import { _POST, _GET } from '../../../utlis/connection/api';
import { checkInSuccess, checkInFailed, createQRSuccess, createQRFailed } from '../actions/check';
import { _global } from '../../../utlis/global/global';
import { Colors } from '../../../utlis';


const URL_CHECK_IN = `${URL.LOCAL_HOST}${URL.CHECK_IN}`;
const URL_CREATE_QR = `${URL.LOCAL_HOST}${URL.CREATE_QR}`;
const URL_CHECK_IN_WIFI = `${URL.LOCAL_HOST}${URL.CHECK_IN_WIFI}`;

function* sagaCheckIn(action) {
  try {
    const data = {
      time: action.payload.time,
      type: action.payload.type,
      codeString: action.payload.codeString,
      deviceId: action.payload.deviceId,
    };
    const token = action.payload.token;
    const response = yield _POST(URL_CHECK_IN, data, token);
    console.log('CHECK=>>>', response);
    console.log('CHECK=>>>', token);
    console.log('CHECK=>>>', data);

    if (response.success && response.statusCode === 200) {
      yield put(checkInSuccess(response.data));
      _global.Alert.alert({
        title: 'Thông báo',
        message: 'Chấm công thành công',
        messageColor: Colors.background,
        leftButton: { text: 'OK' },
      });
    } else {
      yield put(checkInFailed());
      _global.Alert.alert({
        title: 'Thông báo',
        message: response.message,
        messageColor: Colors.danger,
        leftButton: { text: 'OK' },
      });
    }
  } catch (error) {
    console.log(error);
    _global.Alert.alert({
      title: 'Thông báo',
      message: 'Lỗi mạng',
      messageColor: Colors.danger,
      leftButton: { text: 'OK' },
    });
  }
}

function* sagaCheckInWifi(action) {
  console.log('action', action);
  try {
    const data = {
      ssid: action.payload.ssid,
      type: action.payload.type,
      bssid: action.payload.bssid,
      deviceId: action.payload.deviceId,
    };
    const token = action.payload.token;
    console.log('-------->',token);
    const response = yield _POST(URL_CHECK_IN_WIFI, data, token);
    console.log('CHECK=>>>', response);
    if (response.success && response.statusCode === 200) {
      yield put(checkInSuccess(response.data));
      _global.Alert.alert({
        title: 'Thông báo',
        message: 'Chấm công thành công',
        messageColor: Colors.background,
        leftButton: { text: 'OK' },
      });
    } else {
      yield put(checkInFailed());
      _global.Alert.alert({
        title: 'Thông báo',
        message: response.message,
        messageColor: Colors.danger,
        leftButton: { text: 'OK' },
      });
    }
  } catch (error) {
    console.log(error);
    _global.Alert.alert({
      title: 'Thông báo',
      message: 'Lỗi mạng',
      messageColor: Colors.danger,
      leftButton: { text: 'OK' },
    });
  }
}

export function* watchCheckIn() {
  yield takeLatest(types.CHECK_IN, sagaCheckIn);
}
export function* watchCheckInWifi() {
  yield takeLatest(types.CHECK_IN_WIFI, sagaCheckInWifi);
}
function* sagaCreateQR(action) {
  try {
    const data = {
      date: action.payload.day,
    };
    const token = action.payload.token;
    const response = yield _POST(URL_CREATE_QR, data, token);
    console.log('Create QR=>>>', response);
    if (response.success && response.statusCode === 200) {
      yield put(createQRSuccess(response.data.qrDataUrl));
    } else {
      yield put(createQRFailed());
      _global.Alert.alert({
        title: 'Thông báo',
        message: response.message,
        messageColor: Colors.background,
        leftButton: { text: 'OK' },
      });
    }
  } catch (error) {
    console.log(error);
    _global.Alert.alert({
      title: 'Thông báo',
      message: 'Lỗi mạng',
      leftButton: { text: 'OK' },
    });
  }
}

export function* watchCreateQR() {
  yield takeLatest(types.CREATE_QR, sagaCreateQR);
}
