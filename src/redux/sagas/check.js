import { takeLatest, put, select, delay } from 'redux-saga/effects';
import * as types from '../types';
import { URL } from '../../../utlis/connection/url';
import { _POST, _GET } from '../../../utlis/connection/api';
import { checkInSuccess, checkInFailed } from '../actions/check';


const URL_CHECK_IN = `${URL.LOCAL_HOST}${URL.ADD_USER}`;

function* sagaCheckIn(action) {
  try {
    const data = {
    };
    const token = action.payload.token;
    const response = yield _POST(URL_ADD_STAFF, data, token);
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
