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
  registerSuccess,
  registerFailed,
  getProfileSuccess,
  getProfileFailed,
  getProfile,
} from '../actions/authen';
import {URL} from '../../../utlis/connection/url';
import {_GET, _POST} from '../../../utlis/connection/api';
import {_global} from '../../../utlis/global/global';
import langs from '../../../common/language';
import {Colors} from '../../../utlis';
import * as CustomNavigation from '../../navigator/CustomNavigation';
import {removeUserIdDevice} from '../actions/user';
const URL_LOGIN = `${URL.LOCAL_HOST}${URL.LOGIN}`;
const URL_CHANGE_PASS = `${URL.LOCAL_HOST}${URL.CHANGE_PASS}`;
const URL_UPDATE_PROFILE = `${URL.LOCAL_HOST}${URL.UPDATE_PROFILE}`;
const URL_SET_STATUS_OVERTIME = `${URL.LOCAL_HOST}${URL.SET_STATUS_OVERTIME}`;
const URL_SET_STATUS_BREAK = `${URL.LOCAL_HOST}${URL.SET_STATUS_BREAK}`;
const URL_SET_STATUS_LATE_EARLY = `${URL.LOCAL_HOST}${URL.SET_STATUS_LATE_EARLY}`;
const URL_REGISTER = `${URL.LOCAL_HOST}${URL.REGISTER}`;
const URL_GET_PROFILE = `${URL.LOCAL_HOST}${URL.GET_PROFILE}`;
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
          token: response.data.access_token,
          data: response.data,
          refresh_token: response.data.refresh_token,
          user_id: response.data.user_id,
        }),
      );
      _global.Loading.hide();
      yield put(getProfile({access_token: response.data.access_token}));
    } else {
      yield put(loginFailed());
      _global.Alert.alert({
        title: langs.notify,
        message: response.message,
        leftButton: {text: langs.alert.ok},
      });
      _global.Loading.hide();
    }
  } catch (error) {
    console.log(error);
    _global.Alert.alert({
      title: langs.notify,
      message: langs.errorNetwork,
      leftButton: {text: langs.alert.ok},
    });
    _global.Loading.hide();
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
        leftButton: {text: langs.alert.ok},
      });
      _global.Loading.hide();
    } else {
      yield put(changePassFailed());
      _global.Loading.hide();
    }
  } catch (error) {
    console.log(error);
    _global.Alert.alert({
      title: langs.notify,
      message: langs.errorNetwork,
      leftButton: {text: langs.alert.ok},
    });
    _global.Loading.hide();
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
    console.log('nhan thong bao');

    yield OneSignal.setSubscription(true);
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
      _global.Loading.hide();
    } else {
      yield put(setStatusOTFailed());
      console.log('THAT BAI');
      _global.Loading.hide();
    }
  } catch (error) {
    console.log(error);
    _global.Loading.hide();
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
      _global.Loading.hide();
    } else {
      yield put(setStatusBreakFailed());
      console.log('THAT BAI');
      _global.Loading.hide();
    }
  } catch (error) {
    console.log(error);
    _global.Loading.hide();
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
      _global.Loading.hide();
    } else {
      yield put(setStatusLateEarlyFailed());
      console.log('THAT BAI');
      _global.Loading.hide();
    }
  } catch (error) {
    console.log(error);
    _global.Loading.hide();
  }
}

export function* watchSetStatusLateEarly() {
  yield takeLatest(types.SET_STATUS_LATE_EARLY, sagaSetStatusLateEarly);
}

function* sagaRegisterAction(action) {
  try {
    const data = {
      email: action.payload.email,
      password: action.payload.password,
      confirm_password: action.payload.confirm_password,
      code_staff: action.payload.code_staff,
    };
    const response = yield _POST(URL_REGISTER, data);
    console.log('=>>>>>', response);
    if (response.success && response.statusCode === 200) {
      yield put(registerSuccess());
      _global.Alert.alert({
        title: langs.notify,
        message: 'Đăng ký thành công. Vui lòng quay lại để đăng nhập',
        leftButton: {
          text: langs.alert.ok,
          onPress: () => CustomNavigation.navigate('Login'),
        },
      });
      _global.Loading.hide();
    } else {
      yield put(registerFailed());
      _global.Alert.alert({
        title: langs.notify,
        message: response.message,
        leftButton: {text: langs.alert.ok},
      });
      _global.Loading.hide();
    }
  } catch (error) {
    console.log(error);
    _global.Alert.alert({
      title: langs.notify,
      message: langs.errorNetwork,
      leftButton: {text: langs.alert.ok},
    });
    _global.Loading.hide();
  }
}

export function* watchRegisterAction() {
  yield takeLatest(types.REGISTER, sagaRegisterAction);
}

function* sagaGetProfile(action) {
  try {
    const token = action.payload.access_token;
    const response = yield _GET(URL_GET_PROFILE, token);
    console.log('=>>>>>', response);
    if (response.success && response.statusCode === 200) {
      yield put(getProfileSuccess(response));
      _global.Loading.hide();
    } else {
      yield put(getProfileFailed());
      _global.Alert.alert({
        title: langs.notify,
        message: 'Lấy thông tin user thất bại',
        leftButton: {text: langs.alert.ok},
      });
      _global.Loading.hide();
    }
  } catch (error) {
    console.log(error);
    _global.Alert.alert({
      title: langs.notify,
      message: langs.errorNetwork,
      leftButton: {text: langs.alert.ok},
    });
    _global.Loading.hide();
  }
}

export function* watchgetProfile() {
  yield takeLatest(types.GET_PROFILE, sagaGetProfile);
}
