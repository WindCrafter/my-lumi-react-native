import { takeLatest, put, select, delay } from 'redux-saga/effects';
import * as types from '../types';
import {
  loginSuccess,
  loginFailed,
  changePassSuccess,
  changePassFailed,
  updateProfileSuccess,
  updateProfileFailed,
} from '../actions/authen';
import { URL } from '../../../utlis/connection/url';
import { _POST } from '../../../utlis/connection/api';
import { _global } from '../../../utlis/global/global';
import langs from '../../../common/language';
import { Colors } from '../../../utlis';

const URL_LOGIN = `${URL.LOCAL_HOST}${URL.LOGIN}`;
const URL_CHANGE_PASS = `${URL.LOCAL_HOST}${URL.CHANGE_PASS}`;
const URL_UPDATE_PROFILE = `${URL.LOCAL_HOST}${URL.UPDATE_PROFILE}`;

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
        }),
      );
    } else {
      yield put(loginFailed());
      _global.Alert.alert({
        title: langs.notify,
        message: response.message,
        leftButton: { text: 'OK' },
        messageColor: Colors.danger,
      });
    }
  } catch (error) {
    console.log(error);
    _global.Alert.alert({
      title: langs.notify,
      message: langs.errorNetwork,
      leftButton: { text: 'OK' },
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
        leftButton: { text: 'OK' },
      });
    
    } else {
      yield put(changePassFailed());
    }
  } catch (error) {
    console.log(error);
    _global.Alert.alert({
      title: langs.notify,
      message: langs.errorNetwork,
      leftButton: { text: 'OK' },
      messageColor: Colors.danger,
    });
  }
}

export function* watchFirstLogin() {
  yield takeLatest(types.CHANGE_PASS, sagaFirstLogin);
}

