import {takeLatest, put, select, delay} from 'redux-saga/effects';
import * as types from '../types';
import {URL} from '../../../utlis/connection/url';
import {_POST, _GET} from '../../../utlis/connection/api';
import {
  checkInSuccess,
  checkInFailed,
  createQRSuccess,
  createQRFailed,
  setLateEarlyFailed,
  setLateEarlySuccess,
  takeLeaveSuccess,
  takeLeaveFailed,
  overTimeSuccess,
  overTimeFailed,
} from '../actions/check';
import {_global} from '../../../utlis/global/global';
import {Colors} from '../../../utlis';

const URL_CHECK_IN = `${URL.LOCAL_HOST}${URL.CHECK_IN}`;
const URL_CREATE_QR = `${URL.LOCAL_HOST}${URL.CREATE_QR}`;
const URL_CHECK_IN_WIFI = `${URL.LOCAL_HOST}${URL.CHECK_IN_WIFI}`;
const URL_LATE_EARLY = `${URL.LOCAL_HOST}${URL.LATE_EARLY}`;
const URL_TAKE_LEAVE = `${URL.LOCAL_HOST}${URL.TAKE_LEAVE}`;
const URL_OVERTIME = `${URL.LOCAL_HOST}${URL.OVERTIME}`;

function* sagaCheckIn(action) {
  try {
    const data = {
      typeCheck: action.payload.typeCheck,
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
        title: 'YEAH! CHECK-IN THÀNH CÔNG',
        message: 'Hãy có ngày làm việc tuyệt vời ông Mặt Trời nhé.',
        messageColor: Colors.background,
      });
      setTimeout(() => _global.Alert.close(), 1200);

    } else {
      yield put(checkInFailed());
      _global.Alert.alert({
        title: 'Thông báo',
        message: response.message,
        messageColor: Colors.danger,
      });
      setTimeout(() => _global.Alert.close(), 1200);

    }
  } catch (error) {
    console.log(error);
    _global.Alert.alert({
      title: 'LỖI MẠNG',
      message: 'Vui lòng kiểm tra lại kết nối mạng.',
      messageColor: Colors.danger,
    });
    setTimeout(() => _global.Alert.close(), 1200);

  }
}

function* sagaCheckInWifi(action) {
  console.log('action', action);
  const alert = () => {};
  try {
    const data = {
      ssid: action.payload.ssid,
      type: action.payload.type,
      bssid: action.payload.bssid,
      deviceId: action.payload.deviceId,
    };

    const token = action.payload.token;
    console.log('-------->', token);
    const response = yield _POST(URL_CHECK_IN_WIFI, data, token);
    console.log('CHECK=>>>', response);
    console.log('CHECK=>>>', action.payload.type);

    if (
      response.success &&
      response.statusCode === 200 &&
      action.payload.type === 'in'
    ) {
      yield put(checkInSuccess(response.data));
      _global.Alert.alert({
        title: 'YEAH! CHECK-IN THÀNH CÔNG',
        message: 'Chấm công thành công',
        messageColor: Colors.background,
      });
      setTimeout(() => _global.Alert.close(), 1200);

    } else if (
      response.success &&
      response.statusCode === 200 &&
      action.payload.type === 'out'
    ) {
      yield put(checkInSuccess(response.data));
      _global.Alert.alert({
        title: 'YEAH! CHECK-OUT THÀNH CÔNG',
        message: 'Hãy dành nhiều thời gian hơn cho bản thân và gia đình nhé',
        messageColor: Colors.background,
      });
      setTimeout(() => _global.Alert.close(), 1200);

    } else {
      yield put(checkInFailed());
      _global.Alert.alert({
        title: 'Thông báo',
        message: response.message,
        messageColor: Colors.danger,
        
      });
      setTimeout(() => _global.Alert.close(), 1200);
    }
  } catch (error) {
    console.log(error);
    _global.Alert.alert({
      title: 'LỖI MẠNG',
      message: 'Vui lòng kiểm tra lại kết nối mạng.',
      messageColor: Colors.danger,
      
    });
    setTimeout(() => _global.Alert.close(), 1200);

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
        messageColor: Colors.danger,
       
      });
      setTimeout(() => _global.Alert.close(), 1200);

    }
  } catch (error) {
    console.log(error);
    _global.Alert.alert({
      title: 'LỖI MẠNG',
      message: 'Vui lòng kiểm tra lại kết nối mạng.',
      messageColor: Colors.danger,

      
    });
    setTimeout(() => _global.Alert.close(), 1200);

  }
}

export function* watchCreateQR() {
  yield takeLatest(types.CREATE_QR, sagaCreateQR);
}
function* sagaSetLateEarly(action) {
  try {
    const data = {
      date: action.payload.date,
      type: action.payload.type,
      userId: action.payload.userId,
      time: action.payload.time,
    };
    const token = action.payload.token;
    const response = yield _POST(URL_LATE_EARLY, data, token);
    console.log('lATE EARLY TEST=>>>', response);
    if (response.success && response.statusCode === 200) {
      yield put(setLateEarlySuccess(response.data));
      _global.Alert.alert({
        title: 'Đơn của bạn đã được gửi đi',
        message: 'Vui lòng đợi trong khi duyệt.',
        messageColor: Colors.background,
        
      });
      setTimeout(() => _global.Alert.close(), 1200);

    } else {
      yield put(setLateEarlyFailed());
      _global.Alert.alert({
        title: 'Thông báo',
        message: response.message,
        messageColor: Colors.background,
      });
      setTimeout(() => _global.Alert.close(), 1200);

    }
  } catch (error) {
    console.log(error);
    _global.Alert.alert({
      title: 'LỖI MẠNG',
      message: 'Vui lòng kiểm tra lại kết nối mạng.',
      messageColor: Colors.danger,
    });
    setTimeout(() => _global.Alert.close(), 1200);

  }
}

export function* watchSetLateEarly() {
  yield takeLatest(types.SET_LATE_EARLY, sagaSetLateEarly);
}

function* sagaTakeLeave(action) {
  try {
    const data = {
      startDate: action.payload.startDate,
      userId: action.payload.userId,
      endDate: action.payload.endDate,
    };
    const token = action.payload.token;
    const response = yield _POST(URL_TAKE_LEAVE, data, token);
    console.log('take leave=>>>', response);
    if (response.success && response.statusCode === 200) {
      yield put(takeLeaveSuccess(response.data));
      _global.Alert.alert({
        title: 'Đơn xin nghỉ đã được gửi đi',
        message: 'Vui lòng đợi trong khi duyệt.',
        messageColor: Colors.background,
      });
      setTimeout(() => _global.Alert.close(), 1200);

    } else {
      yield put(takeLeaveFailed());
      _global.Alert.alert({
        title: 'Thông báo',
        message: response.message,
        messageColor: Colors.background,
        messageColor: Colors.danger,
      });
      setTimeout(() => _global.Alert.close(), 1200);

    }
  } catch (error) {
    console.log(error);
    _global.Alert.alert({
      title: 'LỖI MẠNG',
      message: 'Vui lòng kiểm tra lại kết nối mạng.',
      messageColor: Colors.danger,
    });
    setTimeout(() => _global.Alert.close(), 1200);

  }
}

export function* watchTakeLeave() {
  yield takeLatest(types.TAKE_LEAVE, sagaTakeLeave);
}

function* sagaOverTime(action) {
  try {
    const data = {
      start: action.payload.start,
      userId: action.payload.userId,
      date: action.payload.date,
      time: action.payload.time,
    };
    const token = action.payload.token;
    const response = yield _POST(URL_OVERTIME, data, token);
    console.log('take leave=>>>', response);
    if (response.success && response.statusCode === 200) {
      yield put(overTimeSuccess(response.data));
      _global.Alert.alert({
        title: 'Đơn tăng ca đã được gửi đi',
        message: 'Vui lòng đợi trong khi duyệt.',
        messageColor: Colors.background,
      });
      setTimeout(() => _global.Alert.close(), 1200);

    } else {
      yield put(overTimeFailed());
      _global.Alert.alert({
        title: 'Thông báo',
        message: response.message,
        messageColor: Colors.danger,
      });
      setTimeout(() => _global.Alert.close(), 1200);

    }
  } catch (error) {
    console.log(error);
    _global.Alert.alert({
      title: 'LỖI MẠNG',
      message: 'Vui lòng kiểm tra lại kết nối mạng.',
      messageColor: Colors.danger,
    });
    setTimeout(() => _global.Alert.close(), 1200);

  }
}

export function* watchOverTime() {
  yield takeLatest(types.OVER_TIME, sagaOverTime);
}
