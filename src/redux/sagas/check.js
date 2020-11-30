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
  checkOutSuccess,
  checkInWifi,
} from '../actions/check';
import {_global} from '../../../utlis/global/global';
import {Colors} from '../../../utlis';
import langs from '../../../common/language';
import * as CustomNavigation from '../../navigator/CustomNavigation';
import {store} from '../store/store.js';

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
        title: langs.alert.checkinSuccess,
        message: langs.alert.wishIn,
        messageColor: Colors.background,
        leftButton: {text: langs.alert.ok},
      });
    } else {
      _global.Alert.alert({
        title: langs.alert.notify,
        message: response.message,
        messageColor: Colors.danger,
        leftButton: {text: langs.alert.ok},
      });
    }
  } catch (error) {
    yield put(checkInFailed());
    console.log(error);
    _global.Alert.alert({
      title: langs.alert.notify,
      message: 'Lỗi mạng',
      messageColor: Colors.danger,
      leftButton: {text: langs.alert.ok},
    });
  }
}

function* sagaCheckInWifi(action) {
  try {
    const data = {
      type: action.payload.type,
      deviceId: action.payload.deviceId,
    };

    const token = action.payload.token;
    // const response = yield _POST(URL_CHECK_IN_WIFI, data, token);
    const response = {
      success: false,
      statusCode: 400,
    };

    if (
      response.success &&
      response.statusCode === 200 &&
      action.payload.type === 'in'
    ) {
      yield put(checkInSuccess(response.data));
      _global.Alert.alert({
        title: langs.alert.checkinSuccess,
        message: langs.alert.wishIn,
        messageColor: Colors.background,
        leftButton: {text: langs.alert.ok},
      });
    } else if (
      response.success &&
      response.statusCode === 200 &&
      action.payload.type === 'out'
    ) {
      yield put(checkOutSuccess(response.data));
      _global.Alert.alert({
        title: langs.alert.checkoutSuccess,
        message: langs.alert.wishOut,
        messageColor: Colors.background,
        leftButton: {text: langs.alert.ok},
      });
    } else {
      if (!response.success && response.statusCode === 400) {
        yield put(checkInFailed());
        _global.Alert.alert({
          title: langs.alert.notify,
          message: langs.alert.cantCheck,
          messageColor: Colors.danger,
          leftButton: {
            text: langs.tryAgain,
            onPress: () => store.dispatch(checkInWifi(data)),
          },
          middleButton: {
            text: langs.code,
            onPress: () => CustomNavigation.navigate('CheckIn'),
          },
          rightButton: {
            text: 'Thoát',
          },
        });
      } else {
        _global.Alert.alert({
          title: langs.alert.notify,
          message: response.message,
          messageColor: Colors.danger,
          leftButton: {
            text: langs.alert.ok,
            // onPress : onLongPress
          },
        });
      }
    }
  } catch (error) {
    console.log(error);
    _global.Alert.alert({
      title: langs.alert.notify,
      message: 'Lỗi mạng',
      messageColor: Colors.danger,
      leftButton: {text: langs.alert.ok},
      rightButton: {text: langs.alert.ok},
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
        title: langs.alert.notify,
        message: response.message,
        messageColor: Colors.danger,
        leftButton: {text: langs.alert.ok},
      });
    }
  } catch (error) {
    console.log(error);
    _global.Alert.alert({
      title: langs.alert.notify,
      message: 'Lỗi mạng',
      messageColor: Colors.danger,

      leftButton: {text: langs.alert.ok},
    });
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
      time: action.payload.time,
      assignTo: action.payload.assignTo,
      advance: action.payload.advance,
      description: action.payload.description,
    };
    const token = action.payload.token;
    const response = yield _POST(URL_LATE_EARLY, data, token);
    console.log('lATE EARLY TEST=>>>', response);
    if (response.success && response.statusCode === 200) {
      yield put(setLateEarlySuccess(response.data));
      _global.Alert.alert({
        title: langs.alert.applydone,
        message: langs.alert.waitConfirm,
        messageColor: Colors.background,
        leftButton: {
          text: langs.alert.ok,
          onPress: () => CustomNavigation.goBack(),
        },
      });
    } else {
      yield put(setLateEarlyFailed());
      _global.Alert.alert({
        title: langs.alert.notify,
        message: response.message,
        messageColor: Colors.background,
        leftButton: {text: langs.alert.ok},
      });
    }
  } catch (error) {
    console.log(error);
    _global.Alert.alert({
      title: langs.alert.notify,
      message: 'Lỗi mạng',
      leftButton: {text: langs.alert.ok},
      messageColor: Colors.danger,
    });
  }
}

export function* watchSetLateEarly() {
  yield takeLatest(types.SET_LATE_EARLY, sagaSetLateEarly);
}

function* sagaTakeLeave(action) {
  try {
    const data = {
      startDate: action.payload.startDate,
      endDate: action.payload.endDate,
      assignTo: action.payload.assignTo,
      advance: action.payload.advance,
      description: action.payload.description,
    };
    const token = action.payload.token;
    const response = yield _POST(URL_TAKE_LEAVE, data, token);
    console.log('take leave=>>>', response);
    if (response.success && response.statusCode === 200) {
      yield put(takeLeaveSuccess(response.data));
      _global.Alert.alert({
        title: langs.alert.applydone,
        message: langs.alert.waitConfirm,
        messageColor: Colors.background,
        leftButton: {
          text: langs.alert.ok,
          onPress: () => CustomNavigation.goBack(),
        },
      });
    } else {
      yield put(takeLeaveFailed());
      _global.Alert.alert({
        title: langs.alert.notify,
        message: response.message,
        messageColor: Colors.background,
        leftButton: {text: langs.alert.ok},
      });
    }
  } catch (error) {
    console.log(error);
    _global.Alert.alert({
      title: langs.alert.notify,
      message: 'Lỗi mạng',
      leftButton: {text: langs.alert.ok},
      messageColor: Colors.danger,
    });
  }
}

export function* watchTakeLeave() {
  yield takeLatest(types.TAKE_LEAVE, sagaTakeLeave);
}

function* sagaOverTime(action) {
  try {
    const data = {
      start: action.payload.start,
      date: action.payload.date,
      time: action.payload.time,
      assignTo: action.payload.assignTo,
      advance: action.payload.advance,
      description: action.payload.description,
    };
    const token = action.payload.token;
    // const response = yield _POST(URL_OVERTIME, data, token);
    const response = {
      success: true,
      statusCode: 200,
    };
    console.log('take leave=>>>', response);
    if (response.success && response.statusCode === 200) {
      yield put(overTimeSuccess(response.data));
      _global.Alert.alert({
        title: langs.alert.applyOTdone,
        message: langs.alert.waitConfirm,
        messageColor: Colors.background,
        leftButton: {
          text: langs.alert.ok,
          onPress: () => CustomNavigation.goBack(),
        },
      });
    } else {
      yield put(overTimeFailed());
      _global.Alert.alert({
        title: langs.alert.notify,
        message: response.message,
        messageColor: Colors.danger,
        leftButton: {
          text: langs.alert.ok,
        },
      });
    }
  } catch (error) {
    console.log(error);
    _global.Alert.alert({
      title: langs.alert.notify,
      message: 'Lỗi mạng',
      leftButton: {text: langs.alert.ok},
      messageColor: Colors.danger,
    });
  }
}

export function* watchOverTime() {
  yield takeLatest(types.OVER_TIME, sagaOverTime);
}
