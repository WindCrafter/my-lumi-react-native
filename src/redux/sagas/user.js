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
  getListTeamsSuccess,
  getListTeamsFailed,
  getListAssignSuccess,
  getListAssignFailed,
  getListNotifysFailed,
  getListNotifysSuccess,
  getListCheckSuccess,
  getListCheckFailed,
  clearMember,
} from '../actions/user';
// import OneSignal from 'react-native-onesignal';
import * as CustomNavigation from '../../navigator/CustomNavigation';
import {Colors} from '../../../utlis';
import langs from '../../../common/language';

const URL_UPDATE_PROFILE = `${URL.LOCAL_HOST}${URL.UPDATE_PROFILE}`;
const URL_LIST_USERS = `${URL.LOCAL_HOST}${URL.LIST_USERS}`;
const URL_ADD_USERID_DEVICE = `${URL.LOCAL_HOST}${URL.ADD_USERID_DEVICE}`;
const URL_REMOVE_USERID_DEVICE = `${URL.LOCAL_HOST}${URL.REMOVE_USERID_DEVICE}`;
const URL_ASSIGN = `${URL.LOCAL_HOST}${URL.GET_LIST_ASSIGN}`;
const URL_TEAMS = `${URL.LOCAL_HOST}${URL.GET_LIST_TEAMS}`;
const URL_BOOK_ROOM = `${URL.LOCAL_HOST}${URL.BOOK_ROOM}`;
const URL_NOTIFY = (e) => {
  return `${URL.LOCAL_HOST}${URL.GET_LIST_NOTIFY}${e}`;
};
const URL_LIST_CHECK = (e) => {
  return `${URL.LOCAL_HOST}${URL.GET_LIST_CHECK}${e}`;
};
const notificationDeviceSelect = (state) => state.user.notificationDevice;
function* sagaUpdateProfile(action) {
  try {
    const data = {
      fullname: action.payload.fullname,
      phone_number: action.payload.phone_number,
      address: action.payload.address,
      birthday: action.payload.birthday,
      identity_number:action.payload.identity_number,
      bank:action.payload.bank,
    };
    const token = action.payload.token;
    const response = yield _POST(URL_UPDATE_PROFILE, data, token);
    console.log(response);
    if (response.success && response.statusCode === 200) {
      yield put(updateProfileSuccess(response.data));
      _global.Alert.alert({
        title: langs.alert.notify,
        message: langs.alert.updateProfileSuccess,
        leftButton: {
          text: langs.alert.ok,
          onPress: () => CustomNavigation.goBack(),
        },
      });
      _global.Loading.hide();
    } else {
      yield put(updateProfileFailed());
      _global.Alert.alert({
        title: langs.alert.notify,
        message: langs.alert.updateProfileFailed,
        leftButton: {
          text: langs.alert.ok,
          onPress: () => CustomNavigation.goBack(),
        },
      });
      _global.Loading.hide();
    }
  } catch (error) {
    console.log(error);
    _global.Loading.hide();
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
    const notificationDevice = yield select(notificationDeviceSelect);
    console.log('testnotify', notificationDevice);
    console.log(action);
    console.log('notificationDevice.dedeviceId', notificationDevice.dedeviceId);
    console.log('notificationDevice', notificationDevice);

    const data = {
      deviceId: action.payload.deviceId,
    };
    const token = action.payload.token;
    const response = yield _POST(URL_ADD_USERID_DEVICE, data, token);
    console.log('response', response);
    if (response.success && response.statusCode === 200) {
      yield put(addUserIdDeviceSuccess(data));
      console.log('thanh cong');
      _global.Loading.hide();
    } else {
      yield put(addUserIdDeviceFailed());
      console.log('THAT BAI');
      _global.Loading.hide();
    }
  } catch (error) {
    console.log(error);
    _global.Loading.hide();
  }
}

export function* watchAddUserIdDevice() {
  yield takeLatest(types.ADD_USER_ID_DEVICE, sagaAddUserIdDevice);
}

function* sagaRemoveUserIdDevice(action) {
  try {
    console.log(action);
    let userId;
    OneSignal.getPermissionSubscriptionState((status) => {
      (userId = status.userId), console.log(1);
    });
    console.log(userId);
    const data = {
      deviceId: action.payload.deviceId,
    };
    const token = action.payload.token;
    const response = yield _POST(URL_REMOVE_USERID_DEVICE, data, token);
    console.log('data------', data);
    console.log(response);
    if (response.success && response.statusCode === 200) {
      yield put(removeUserIdDeviceSuccess(response.data));
      _global.Loading.hide();
    } else {
      yield put(removeUserIdDeviceFailed());
      _global.Alert.alert({
        title: langs.alert.notify,
        message: response.message,
        leftButton: {text: langs.alert.ok},
      });
      _global.Loading.hide();
    }
  } catch (error) {
    console.log(error);
    _global.Loading.hide();
  }
}

export function* watchRemoveUserIdDevice() {
  yield takeLatest(types.REMOVE_USER_ID_DEVICE, sagaRemoveUserIdDevice);
}

function* sagaGetListTeams(action) {
  try {
    console.log(action);
    const token = action.payload;
    const response = yield _GET(URL_TEAMS, token);
    console.log(response);
    if (response.success && response.statusCode === 200) {
      yield put(getListTeamsSuccess(response.data));
    } else {
      yield put(getListTeamsFailed());
    }
  } catch (error) {
    console.log(error);
  }
}

export function* watchGetListTeams() {
  yield takeLatest(types.GET_LIST_TEAMS, sagaGetListTeams);
}

function* sagaGetListAssign(action) {
  try {
    console.log(action);
    const token = action.payload;
    const response = yield _GET(URL_ASSIGN, token);
    console.log(response);
    if (response.success && response.statusCode === 200) {
      yield put(getListAssignSuccess(response.data));
    } else {
      yield put(getListAssignFailed());
    }
  } catch (error) {
    console.log(error);
  }
}

export function* watchGetListAssign() {
  yield takeLatest(types.GET_LIST_ASSIGN, sagaGetListAssign);
}
function* sagaGetListNotifys(action) {
  try {
    console.log(action);
    const token = action.payload.token;
    const page = 1;
    const response = yield _GET(URL_NOTIFY(page), token);
    console.log(response);
    if (response.success && response.statusCode === 200) {
      yield put(getListNotifysSuccess(response.data));
    } else {
      yield put(getListNotifysFailed());
    }
  } catch (error) {
    console.log(error);
  }
}

export function* watchGetListNotifys() {
  yield takeLatest(types.GET_LIST_NOTIFYS, sagaGetListNotifys);
}

function* sagaGetListCheck(action) {
  try {
    console.log(action);
    const token = action.payload.token;
    const response = yield _GET(URL_LIST_CHECK(action.payload.page), token);
    console.log(response);
    if (response.success && response.statusCode === 200) {
      yield put(getListCheckSuccess(response.data));
      _global.Loading.hide();
    } else {
      yield put(getListCheckFailed());
      _global.Loading.hide();
    }
  } catch (error) {
    console.log(error);
    _global.Loading.hide();
  }
}

export function* watchGetListCheck() {
  yield takeLatest(types.GET_LIST_CHECK, sagaGetListCheck);
}

function* sagaBookRoom(action) {
  try {
    console.log(action);
    const token = action.payload;
    const data = {
      title: action.payload.title,
      loop: action.payload.loop,
      timeEnd: action.payload.timeEnd,
      timeStart: action.payload.timeStart,
      location: action.payload.location,
      description: action.payload.description,
      member: action.payload.member,
    };
    const response = yield _POST(URL_BOOK_ROOM, data, token);
    console.log(response);
    if (response.success && response.statusCode === 200) {
      yield put(clearMember());
      _global.Alert.alert({
        title: langs.alert.notify,
        message: 'Tạo lịch họp thành công',
        leftButton: {
          text: langs.alert.ok,
          onPress: () => CustomNavigation.goBack(),
        },
      });
    } else {
      _global.Alert.alert({
        title: langs.alert.notify,
        message: response.message,
        leftButton: {
          text: langs.alert.ok,
          onPress: () => CustomNavigation.goBack(),
        },
      });
    }
  } catch (error) {
    console.log(error);
  }
}

export function* watchBookRoom() {
  yield takeLatest(types.BOOK_ROOM, sagaBookRoom);
}
