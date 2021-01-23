import { takeLatest, put, select, delay } from 'redux-saga/effects';
import OneSignal from 'react-native-onesignal';
import * as types from '../types';
import { URL } from '../../../utlis/connection/url';
import { _POST, _GET } from '../../../utlis/connection/api';
import { _global } from '../../../utlis/global/global';
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
  listRoomSuccess,
  getKPISuccess,
  getHolidaySuccess,
  getWorkdayToday,
} from '../actions/user';
import { changeToOut, changeToIn } from '../actions/check';
// import OneSignal from 'react-native-onesignal';
import * as CustomNavigation from '../../navigator/CustomNavigation';
import { Colors } from '../../../utlis';
import langs from '../../../common/language';

const URL_UPDATE_PROFILE = `${URL.LOCAL_HOST}${URL.UPDATE_PROFILE}`;
const URL_LIST_USERS = `${URL.LOCAL_HOST}${URL.LIST_USERS}`;
const URL_ADD_USERID_DEVICE = `${URL.LOCAL_HOST}${URL.ADD_USERID_DEVICE}`;
const URL_REMOVE_USERID_DEVICE = `${URL.LOCAL_HOST}${URL.REMOVE_USERID_DEVICE}`;
const URL_ASSIGN = `${URL.LOCAL_HOST}${URL.GET_LIST_ASSIGN}`;
const URL_TEAMS = `${URL.LOCAL_HOST}${URL.GET_LIST_TEAMS}`;
const URL_BOOK_ROOM = `${URL.LOCAL_HOST}${URL.BOOK_ROOM}`;
const URL_LIST_ROOM = `${URL.LOCAL_HOST}${URL.LIST_ROOM}`;

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
      role: action.payload.role,
      team: action.payload.team,
      fullname: action.payload.fullname,
      phone_number: action.payload.phone_number,
      address: action.payload.address,
      birthday: action.payload.birthday,
      identity_number: action.payload.identity_number,
      bank_name: action.payload.bank_name,
      bank_account: action.payload.bank_account,
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
      (userId = status.userId);
    });
    console.log(userId);
    const data = {
      deviceId: action.payload.deviceId,
    };
    const token = action.payload.token;
    const response = yield _POST(URL_REMOVE_USERID_DEVICE, data, token);
    console.log(response);
    if (response.success && response.statusCode === 200) {
      yield put(removeUserIdDeviceSuccess(response.data));
      _global.Loading.hide();
    } else {
      yield put(removeUserIdDeviceFailed());
      _global.Alert.alert({
        title: langs.alert.notify,
        message: response.message,
        leftButton: { text: langs.alert.ok },
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
    const token = action.payload.token;
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
    const token = action.payload.token;
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
    const token = action.payload.token;
    const data = {
      start_time: action.payload.start_time,
      end_time: action.payload.end_time,
      date: action.payload.date,
      subject: action.payload.subject,
      content: action.payload.content,
      location: action.payload.location,
      member: action.payload.member,
      loop: action.payload.loop,
      member_ids: action.payload.member_ids,
    };
    console.log(data);
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
      _global.Loading.hide();
    } else {
      _global.Alert.alert({
        title: langs.alert.notify,
        message: response.message,
        leftButton: {
          text: langs.alert.ok,
        },
      });
      _global.Loading.hide();
    }
  } catch (error) {
    console.log(error);
    _global.Loading.hide();
  }
}

export function* watchBookRoom() {
  yield takeLatest(types.BOOK_ROOM, sagaBookRoom);
}

function* sagaListRoom(action) {
  try {
    const token = action.payload.token;
    const response = yield _GET(URL_LIST_ROOM, token);
    if (response.success && response.statusCode === 200) {
      yield put(listRoomSuccess(response.data));
      _global.Loading.hide();
    } else {
      _global.Alert.alert({
        title: langs.alert.notify,
        message: response.message,
        leftButton: {
          text: langs.alert.ok,
        },
      });
      _global.Loading.hide();
    }
  } catch (error) {
    _global.Loading.hide();
    console.log(error);
  }
}

export function* watchListRoom() {
  yield takeLatest(types.LIST_ROOM, sagaListRoom);
}

function* sagaGetKpi(action) {
  try {
    const token = action.payload.token;
    const response = yield _GET(`${URL.LOCAL_HOST}${URL.GET_KPI}`, token);
    console.log(response);
    if (response.success && response.statusCode === 200) {
      yield put(getKPISuccess(response.data));
      _global.Loading.hide();
    } else {
      _global.Alert.alert({
        title: langs.alert.notify,
        message: response.message,
        leftButton: {
          text: langs.alert.ok,
        },
      });
      _global.Loading.hide();
    }
  } catch (error) {
    _global.Loading.hide();
    console.log(error);
  }
}

export function* watchGetKpi() {
  yield takeLatest(types.GET_KPI, sagaGetKpi);
}

function* sagaConfirmKpi(action) {
  try {
    console.log(action);
    const token = action.payload.token;
    const data = {
      id: action.payload.id,
      is_confirmed: action.payload.is_confirmed,
    };
    const response = yield _POST(
      `${URL.LOCAL_HOST}${URL.CONFIRM_KPI}`,
      data,
      token,
    );
    console.log(response);
    if (response.success && response.statusCode === 200) {
      _global.Alert.alert({
        title: langs.alert.notify,
        message: 'Phản hồi thành công!',
        leftButton: {
          text: langs.alert.ok,
        },
      });
      _global.Loading.hide();
    } else {
      _global.Alert.alert({
        title: langs.alert.notify,
        message: response.message,
        leftButton: {
          text: langs.alert.ok,
        },
      });
      _global.Loading.hide();
    }
  } catch (error) {
    _global.Loading.hide();
    console.log(error);
  }
}

export function* watchConfirmKpi() {
  yield takeLatest(types.CONFIRM_KPI, sagaConfirmKpi);
}

function* sagaGetHoliday(action) {
  try {
    const token = action.payload.token;
    const response = yield _GET(
      `${URL.LOCAL_HOST}${URL.GET_HOLIDAY}?year=${action.payload.year}`,
      token,
    );
    console.log(response);
    if (response.success && response.statusCode === 200) {
      yield put(getHolidaySuccess(response.data));
      _global.Loading.hide();
    } else {
      _global.Alert.alert({
        title: langs.alert.notify,
        message: 'Lấy danh sách ngày lễ thất bại!',
        leftButton: {
          text: langs.alert.ok,
        },
      });
      _global.Loading.hide();
    }
  } catch (error) {
    _global.Loading.hide();
    console.log(error);
  }
}

export function* watchGetHoliday() {
  yield takeLatest(types.GET_HOLIDAY, sagaGetHoliday);
}

function* sagaGetWorkdayToday(action) {
  try {
    const token = action.payload.token;
    const response = yield _GET(
      `${URL.LOCAL_HOST}${URL.GET_WORKDAY_TODAY}?date=${action.payload.date}`,
      token,
    );
    console.log(response);
    _global.Loading.hide();
    if (response.success && response.statusCode === 200 && response.data && response.data && response.data.check_in) {
      yield put(changeToOut());
    } else if (!response.success && response.statusCode === 200 && response.data.length === 0) {
      yield put(changeToIn());
    }
  } catch (error) {
    _global.Loading.hide();
    console.log(error);
  }
}

export function* watchGetWorkdayToday() {
  yield takeLatest(types.GET_WORKDAY_TODAY, sagaGetWorkdayToday);
}
