import { takeLatest, put, select, delay } from 'redux-saga/effects';
import * as types from '../types';
import { URL } from '../../../utlis/connection/url';
import { _POST, _GET } from '../../../utlis/connection/api';
import { _global } from '../../../utlis/global/global';
import { updateProfileSuccess, updateProfileFailed } from '../actions/user';
import { Colors } from '../../../utlis';

const URL_UPDATE_PROFILE = `${URL.LOCAL_HOST}${URL.UPDATE_PROFILE}`;

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
    console.log(response)
    if (response.success && response.statusCode === 200) {
      yield put(updateProfileSuccess(response.data));
      _global.Alert.alert({
        title: 'Thông báo',
        message: response.message,
        messageColor: Colors.background,
        leftButton: { text: 'OK' },
      });
    } else {
      yield put(updateProfileFailed());
      _global.Alert.alert({
        title: 'Thông báo',
        message: 'Lỗi mạng',
        messageColor: Colors.danger,
        leftButton: { text: 'OK' },
      });
    }
  } catch (error) {
    console.log(error);
  }
}

export function* watchUpdateProfile() {
  yield takeLatest(types.UPDATE_PROFILE, sagaUpdateProfile);
}
