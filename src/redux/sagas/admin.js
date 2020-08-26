import { takeLatest, put, select, delay } from 'redux-saga/effects';
import * as types from '../types';
import { URL } from '../../../utlis/connection/url';
import { _POST, _GET } from '../../../utlis/connection/api';
import {
  getListRolesSuccess,
  getListRolesFailed,
  addStaffSuccess,
  addStaffFailed,
} from '../actions/admin';

const URL_LIST_ROLE = `${URL.LOCAL_HOST}${URL.LIST_ROLES}`;
const URL_ADD_STAFF = `${URL.LOCAL_HOST}${URL.ADD_USER}`;

function* sagaAddStaff(action) {
  try {
    const data = {
      name: action.payload.name,
      email: action.payload.email,
      password: action.payload.password,
      roleId: action.payload.roleId,
    };
    const token = action.payload.token;
    const response = yield _POST(URL_ADD_STAFF, data, token);
    if (response.success && response.statusCode === 200) {
      yield put(addStaffSuccess());
    } else {
      yield put(addStaffFailed());
    }
  } catch (error) {
    console.log(error);
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
