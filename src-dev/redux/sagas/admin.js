import {takeLatest, put, select, delay} from 'redux-saga/effects';
import * as types from '../types';
import {URL_STAGING} from '../../../utlis/connection/url';
import {_POST, _GET} from '../../../utlis/connection/api';
import {
  getListRolesSuccess,
  getListRolesFailed,
  addStaffSuccess,
  addStaffFailed,
} from '../actions/admin';
import {_global} from '../../../utlis/global/global';
import langs from '../../../common/language';
import {Colors} from '../../../utlis';

const URL_LIST_ROLE = `${URL_STAGING.LOCAL_HOST}${URL_STAGING.LIST_ROLES}`;
const URL_ADD_STAFF = `${URL_STAGING.LOCAL_HOST}${URL_STAGING.ADD_USER}`;

function* sagaAddStaff(action) {
  try {
    const data = {
      name: action.payload.name,
      email: action.payload.email,
      password: action.payload.password,
      roleId: action.payload.roleId,
    };
    console.log('---role', action.payload.roleId);

    const token = action.payload.token;
    const response = yield _POST(URL_ADD_STAFF, data, token);
    console.log('=>>>', response);
    console.log('---role', action.payload.roleId);
    if (response.success && response.statusCode === 200) {
      yield put(addStaffSuccess());
      _global.Alert.alert({
        title: langs.notify,
        message: response.message,
        leftButton: {text: langs.alert.ok},
      });
    } else {
      yield put(addStaffFailed());
      _global.Alert.alert({
        title: langs.notify,
        message: response.message,
        leftButton: {text: langs.alert.ok},
      });
    }
  } catch (error) {
    console.log(error);
    _global.Alert.alert({
      title: langs.notify,
      message: langs.errorNetwork,
      leftButton: {text: langs.alert.ok},
    });
  }
}

export function* watchAddStaff() {
  yield takeLatest(types.ADD_STAFF, sagaAddStaff);
}

function* sagaGetListRoles(action) {
  try {
    const token = action.payload;
    const response = yield _GET(URL_LIST_ROLE, token);
    console.log('get list role', response);
    if (response.success && response.statusCode === 200) {
      yield put(getListRolesSuccess(response));
    } else {
      yield put(getListRolesFailed());
    }
  } catch (error) {
    console.log(error);
  }
}

export function* watchGetListRoles() {
  yield takeLatest(types.GET_LIST_ROLES, sagaGetListRoles);
}
