import { takeLatest, put, select, delay } from 'redux-saga/effects';
import * as types from '../types';
import { URL } from '../../../utlis/connection/url';
import { _POST, _GET } from '../../../utlis/connection/api';
import { checkInSuccess, checkInFailed, createQRSuccess, createQRFailed } from '../actions/check';


const URL_CHECK_IN = `${URL.LOCAL_HOST}${URL.CHECK_IN}`;
const URL_CREATE_QR = `${URL.LOCAL_HOST}${URL.CREATE_QR}`;

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
    if (response.success && response.statusCode === 200) {
      yield put(checkInSuccess());
    } else {
      yield put(checkInFailed());
    }
  } catch (error) {
    console.log(error);
  }
}

export function* watchAddStaff() {
  yield takeLatest(types.CHECK_IN, sagaCheckIn);
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
    }
  } catch (error) {
    console.log(error);
  }
}

export function* watchCreateQR() {
  yield takeLatest(types.CREATE_QR, sagaCreateQR);
}
