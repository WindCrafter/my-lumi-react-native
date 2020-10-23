import {takeLatest, put, select, delay} from 'redux-saga/effects';
import * as types from '../types';
import {URL} from '../../../utlis/connection/url';
import {_POST, _GET} from '../../../utlis/connection/api';
import {_global} from '../../../utlis/global/global';
import {
  updateProfileSuccess,
  updateProfileFailed,
  getListUsersSuccess,
  getListUsersFailed,
  removeUserIdDeviceSuccess,
  removeUserIdDeviceFailed,
  addUserIdDeviceSuccess,
  addUserIdDeviceFailed,
} from '../actions/user';
import {Colors} from '../../../utlis';

const URL_UPDATE_PROFILE = `${URL.LOCAL_HOST}${URL.UPDATE_PROFILE}`;
const URL_LIST_USERS = `${URL.LOCAL_HOST}${URL.LIST_USERS}`;
const URL_ADD_USERID_DEVICE = `${URL.LOCAL_HOST}${URL.ADD_USERID_DEVICE}`;
function* sagaUpdateProfile(action) {
  try {
    const data = {
      name: action.payload.name,
      phoneNumber: action.payload.phoneNumber,
      advance: action.payload.advance,
      birthday: action.payload.birthday,
    };
    const token = action.payload.token;
    const response = yield _POST(URL_UPDATE_PROFILE, data, token);
    console.log(response);
    if (response.success && response.statusCode === 200) {
      yield put(updateProfileSuccess(response.data));
      _global.Alert.alert({
        title: 'TestNotify',
        message: response.message,
        messageColor: Colors.background,
        leftButton: {text: 'OK'},
      });
    } else {
      yield put(updateProfileFailed());
      _global.Alert.alert({
        title: 'TestNotify',
        message: 'Lỗi mạng',
        messageColor: Colors.danger,
        leftButton: {text: 'OK'},
      });
    }
  } catch (error) {
    console.log(error);
  }
}

export function* watchUpdateProfile() {
  yield takeLatest(types.UPDATE_PROFILE, sagaUpdateProfile);
}
function* sagaGetListUsers(action) {
  try {
    console.log(action);
    const token = action.payload;
    const response = yield _GET(URL_LIST_USERS, token);
    console.log(response);
    if (response.success && response.statusCode === 200) {
      yield put(getListUsersSuccess(response.data));
     
    } else {
      yield put(getListUsersFailed());
      yield put(getListUsersSuccess(response.data));
      
    }
  } catch (error) {
    console.log(error);
  }
}

export function* watchGetListUsers() {
  yield takeLatest(types.GET_LIST_USERS, sagaGetListUsers);
}

function* sagaAddUserIdDevice(action) {
  try {
    console.log(action);
    const data = {
      deviceId: action.payload.deviceId,
    };
    const token = action.payload;
    const response = yield _POST(URL_ADD_USERID_DEVICE, data, token);
    console.log(response);
    if (response.success && response.statusCode === 200) {
      yield put(addUserIdDeviceSuccess(response.data));
      _global.Alert.alert({
        title: 'TestNotify',
        message: response.message,
        messageColor: Colors.background,
        leftButton: { text: 'OK' },
      });
    } else {
      yield put(addUserIdDeviceFailed());
      _global.Alert.alert({
        title: 'TestNotify',
        message: response.message,
        messageColor: Colors.background,
        leftButton: { text: 'OK' },
      });
    }
  } catch (error) {
    console.log(error);
  }
}

export function* watchAddUserIdDevice() {
  yield takeLatest(types.ADD_USER_ID_DEVICE, sagaAddUserIdDevice);
}
