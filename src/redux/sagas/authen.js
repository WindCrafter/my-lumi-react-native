import { takeLatest, put, select, delay } from 'redux-saga/effects';
import * as types from '../types';
import {
  loginSuccess,
  loginFailed,
  changePassSuccess,
  changePassFailed,
} from '../actions/authen';
import { URL } from '../../../utlis/connection/url';
import { _POST } from '../../../utlis/connection/api';

const URL_LOGIN = `${URL.LOCAL_HOST}${URL.LOGIN}`;
const URL_CHANGE_PASS = `${URL.LOCAL_HOST}${URL.CHANGE_PASS}`;

function* sagaLoginAction(action) {
  try {
    const data = {
      email: action.payload.email,
      password: action.payload.password,
    };
    const response = yield _POST(URL_LOGIN, data);
    if (response.success && response.statusCode === 200) {
      yield put(
        loginSuccess({
          token: response.data.token,
          changePass: response.data.userProfile.needChangePass,
          data,
        }),
      );
    } else {
      yield put(loginFailed());
    }
  } catch (error) {
    console.log(error);
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
    if (response.success && response.statusCode === 200) {
      yield put(changePassSuccess());
    } else {
      yield put(changePassFailed());
    }
  } catch (error) {
    console.log(error);
  }
}

export function* watchFirstLogin() {
  yield takeLatest(types.CHANGE_PASS, sagaFirstLogin);
}
