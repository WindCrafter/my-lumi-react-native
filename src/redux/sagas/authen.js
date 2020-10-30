import {takeLatest, put, select, delay} from 'redux-saga/effects';
import * as types from '../types';
import OneSignal from 'react-native-onesignal';

import {
  loginSuccess,
  loginFailed,
  changePassSuccess,
  changePassFailed,
  updateProfileSuccess,
  updateProfileFailed,
  setStatusBreakFailed,
  setStatusBreakSuccess,
  setStatusLateEarlySuccess,
  setStatusLateEarlyFailed,
  setStatusOTFailed,
  setStatusOTSuccess,
} from '../actions/authen';
import {URL} from '../../../utlis/connection/url';
import {_POST} from '../../../utlis/connection/api';
import {_global} from '../../../utlis/global/global';
import langs from '../../../common/language';
import {Colors} from '../../../utlis';
import {removeUserIdDevice} from '../actions/user';
const URL_LOGIN = `${URL.LOCAL_HOST}${URL.LOGIN}`;
const URL_CHANGE_PASS = `${URL.LOCAL_HOST}${URL.CHANGE_PASS}`;
const URL_UPDATE_PROFILE = `${URL.LOCAL_HOST}${URL.UPDATE_PROFILE}`;
const URL_SET_STATUS_OVERTIME = `${URL.LOCAL_HOST}${URL.SET_STATUS_OVERTIME}`;
const URL_SET_STATUS_BREAK = `${URL.LOCAL_HOST}${URL.SET_STATUS_BREAK}`;
const URL_SET_STATUS_LATE_EARLY = `${URL.LOCAL_HOST}${URL.SET_STATUS_LATE_EARLY}`;
import {addUserIdDevice} from '../actions/user';
function* sagaLoginAction(action) {
  try {
    const data = {
      email: action.payload.email,
      password: action.payload.password,
    };
    const response = yield _POST(URL_LOGIN, data);
    console.log('=>>>>>', response);
    if (response.success && response.statusCode === 200) {
      yield put(
        loginSuccess({
          token: response.data.token,
          changePass: response.data.userProfile.needChangePass,
          data: response.data,
          deviceId: action.payload.oneSignalID,
        }),
        // addUserIdDevice({
        //   token: response.data.token,
        //   devideId: action.payload.oneSignalID,
        // }),
      );
    } else {
      yield put(loginFailed());
      _global.Alert.alert({
        title: langs.notify,
        message: response.message,
        leftButton: {text: 'OK'},
        messageColor: Colors.danger,
      });
    }
  } catch (error) {
    console.log(error);
    _global.Alert.alert({
      title: langs.notify,
      message: langs.errorNetwork,
      leftButton: {text: 'OK'},
      messageColor: Colors.danger,
    });
  }
}

export function* watchLoginAction() {
  yield takeLatest(types.LOGIN_ACTION, sagaLoginAction);
}

function* sagaFirstLogin(action) {
  try {
    const token = action.payload.token;
    const data = {
      password: action.payload.pass,
      confirmPassword: action.payload.confirmPassword,
    };
    const response = yield _POST(URL_CHANGE_PASS, data, token);
    console.log(response);
    if (response.success && response.statusCode === 200) {
      yield put(changePassSuccess());
      _global.Alert.alert({
        title: langs.notify,
        message: response.message,
        messageColor: Colors.background,
        leftButton: {text: 'OK'},
      });
    } else {
      yield put(changePassFailed());
    }
  } catch (error) {
    console.log(error);
    _global.Alert.alert({
      title: langs.notify,
      message: langs.errorNetwork,
      leftButton: {text: 'OK'},
      messageColor: Colors.danger,
    });
  }
}

export function* watchFirstLogin() {
  yield takeLatest(types.CHANGE_PASS, sagaFirstLogin);
}

/**
 * watch login success
 */
function* sagaLoginSuccess(action) {
  try {
    // const notify = yield select(notifySelect);
    // if (notify) {
    console.log('nhan thong bao');

    yield OneSignal.setSubscription(true);
    yield put(
      addUserIdDevice({
        deviceId: action.payload.deviceId,
        token: action.payload.token,
      }),
    );
    // }
  } catch (error) {
    console.log('sagaLoginSuccess:error', error);
  }
}

export function* watchLoginSuccess() {
  yield takeLatest(types.LOGIN_SUCCESS, sagaLoginSuccess);
}
function* sagaSetStatusOT(action) {
  try {
    const data = {
      status: action.payload.status,
      overtimeId: action.payload.overtimeId,
    };
    const token = action.payload.token;
    const response = yield _POST(URL_SET_STATUS_OVERTIME, data, token);
    console.log('response', response);
    if (response.success && response.statusCode === 200) {
      yield put(setStatusOTSuccess(data));
      console.log('thanh cong');
    } else {
      yield put(setStatusOTFailed());
      console.log('THAT BAI');
    }
  } catch (error) {
    console.log(error);
  }
}

export function* watchSetStatusOT() {
  yield takeLatest(types.SET_STATUS_OT, sagaSetStatusOT);
}
function* sagaSetStatusBreak(action) {
  try {
    const data = {
      status: action.payload.status,
      takeLeaveId: action.payload.takeLeaveId,
    };
    const token = action.payload.token;
    const response = yield _POST(URL_SET_STATUS_BREAK, data, token);
    console.log('response', response);
    if (response.success && response.statusCode === 200) {
      yield put(setStatusBreakSuccess(data));
      console.log('thanh cong');
    } else {
      yield put(setStatusBreakFailed());
      console.log('THAT BAI');
    }
  } catch (error) {
    console.log(error);
  }
}

export function* watchSetStatusBreak() {
  yield takeLatest(types.SET_STATUS_BREAK, sagaSetStatusBreak);
}

function* sagaSetStatusLateEarly(action) {
  try {
    const data = {
      status: action.payload.status,
      lateEarlyId: action.payload.lateEarlyId,
    };
    const token = action.payload.token;
    const response = yield _POST(URL_SET_STATUS_LATE_EARLY, data, token);
    console.log('response', response);
    if (response.success && response.statusCode === 200) {
      yield put(setStatusLateEarlySuccess(data));
      console.log('thanh cong');
    } else {
      yield put(setStatusLateEarlyFailed());
      console.log('THAT BAI');
    }
  } catch (error) {
    console.log(error);
  }
}

export function* watchSetStatusLateEarly() {
  yield takeLatest(types.SET_LATE_EARLY, sagaSetStatusLateEarly);
}