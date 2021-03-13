import { takeLatest, put, select, delay } from 'redux-saga/effects';
import * as types from '../types';
import { URL } from '../../../utlis/connection/url';
import { _POST, _GET, _POST_WIFI } from '../../../utlis/connection/api';
import {
  checkInSuccess,
  checkInFailed,
  createQRSuccess,
  createQRFailed,
  setLateEarlyFailed,
  setLateEarlySuccess,
  takeLeaveSuccess,
  takeLeaveFailed,
  overTimeSuccess,
  overTimeFailed,
  checkOutSuccess,
  checkInWifi,
  listLateEarlySuccess,
  listLateEarlyFailed,
  listManagerLateEarlySuccess,
  listManagerLateEarlyFailed,
  approveLateEarlySuccess,
  approveLateEarlyFailed,
  updateLateEarlySuccess,
  updateLateEarlyFailed,
  deleteLateEarlySuccess,
  deleteLateEarlyFailed,
  listTakeLeaveSuccess,
  listTakeLeaveFailed,
  listAdminTakeLeaveFailed,
  listAdminTakeLeaveSuccess,
  confirmDenyTakeLeaveSuccess,
  confirmDenyTakeLeaveFailed,
  listManagerCheckSuccess,
  listManagerCheckFailed,
  approveCheckSuccess,
  approveCheckFailed,
  updateTakeLeaveSuccess,
  updateTakeLeaveFailed,
  deleteTakeLeaveFailed,
  deleteTakeLeaveSuccess,
  updateOverTimeSuccess,
  updateOverTimeFailed,
  checkInCode,
  checkInRequestSuccess,
  checkOutRequestSuccess,
} from '../actions/check';
import { store } from '../store/store.js';
import { getSummary } from '../actions/authen';
import { _global } from '../../../utlis/global/global';
import { Colors } from '../../../utlis';
import langs from '../../../common/language';
import * as CustomNavigation from '../../navigator/CustomNavigation';

const URL_CHECK_IN = `${URL.LOCAL_HOST}${URL.CHECK_IN}`;
const URL_CREATE_QR = `${URL.LOCAL_HOST}${URL.CREATE_QR}`;
const URL_CHECK_IN_WIFI = `${URL.LOCAL_HOST}${URL.CHECK_IN_WIFI}`;
const URL_CHECK_OUT_WIFI = `${URL.LOCAL_HOST}${URL.CHECK_OUT_WIFI}`;
const URL_CHECK_IN_REQUEST = `${URL.LOCAL_HOST}${URL.CHECK_IN_REQUEST}`;

/// ///////////////////////////////////////////////////////////////////////////////////////
const URL_LATE_EARLY = `${URL.LOCAL_HOST}${URL.LATE_EARLY}`;
const URL_LIST_LATE_EARLY = (STATUS, DATE, PAGE, PAGE_SIZE) => {
  if (DATE) {
    return `${URL.LOCAL_HOST}${URL.LIST_LATE_EARLY}?status=${STATUS}&date=${DATE}&page=${PAGE}&page_size=${PAGE_SIZE}`;
  }
  return `${URL.LOCAL_HOST}${URL.LIST_LATE_EARLY}?status=${STATUS}&page=${PAGE}&page_size=${PAGE_SIZE}`;
};
const URL_LIST_MANAGER_LATE_EARLY = (STATUS, DATE, PAGE, PAGE_SIZE) => {
  if (DATE) {
    return `${URL.LOCAL_HOST}${URL.LIST_MANAGER_LATE_EARLY}?status=${STATUS}&date=${DATE}&page=${PAGE}&page_size=${PAGE_SIZE}`;
  }
  return `${URL.LOCAL_HOST}${URL.LIST_MANAGER_LATE_EARLY}?status=${STATUS}&page=${PAGE}&page_size=${PAGE_SIZE}`;
};
const URL_APPROVE_LATE_EARLY = `${URL.LOCAL_HOST}${URL.APPROVE_LATE_EARLY}`;
const URL_UPDATE_LATE_EARLY = `${URL.LOCAL_HOST}${URL.UPDATE_LATE_EARLY}`;
const URL_DELETE_LATE_EARLY = `${URL.LOCAL_HOST}${URL.DELETE_LATE_EARLY}`;
/// //////////////////////////////////////////////////////////////////////////////////////
const URL_TAKE_LEAVE = `${URL.LOCAL_HOST}${URL.TAKE_LEAVE}`;
const URL_UPDATE_TAKE_LEAVE = `${URL.LOCAL_HOST}${URL.UPDATE_TAKE_LEAVE}`;
const URL_DELETE_TAKE_LEAVE = `${URL.LOCAL_HOST}${URL.DELETE_TAKE_LEAVE}`;
/// //////////////////////////////////////////////////////////////////////////////////////
const URL_OVERTIME = `${URL.LOCAL_HOST}${URL.OVERTIME}`;
const URL_UPDATE_OVERTIME = `${URL.LOCAL_HOST}${URL.UPDATE_OT}`;

/// //////////////////////////////////////////////////////////////////////////////////////

const URL_CONFIRM_DENY_TAKE_LEAVE = `${URL.LOCAL_HOST}${URL.CONFIRM_DENY_TAKE_LEAVE}`;
const LIST_URL_TAKE_LEAVE = (STATUS, PAGE, DATE) => {
  if (!DATE) {
    return `${URL.LOCAL_HOST}${URL.GET_LIST_TAKE_LEAVE}?status=${STATUS}&page=${PAGE}&page_size=10`;
  }
  return `${URL.LOCAL_HOST}${URL.GET_LIST_TAKE_LEAVE}?status=${STATUS}&page=${PAGE}&page_size=10&date=${DATE}`;
};
const LIST_URL_ADMIN_TAKE_LEAVE = (STATUS, PAGE, DATE) => {
  if (!DATE) {
    return `${URL.LOCAL_HOST}${URL.GET_LIST_ADMIN_TAKE_LEAVE}?status=${STATUS}&page=${PAGE}&page_size=10`;
  }
  return `${URL.LOCAL_HOST}${URL.GET_LIST_ADMIN_TAKE_LEAVE}?status=${STATUS}&page=${PAGE}&page_size=10&date=${DATE}`;
};
/// ///////////////////////////////////////////////////////////////////////////////////////
function* sagaCheckIn(action) {
  try {
    const data = {
      typeCheck: action.payload.typeCheck,
      type: action.payload.type,
      codeString: action.payload.codeString,
      deviceId: action.payload.deviceId,
    };

    const token = action.payload.token;
    const response = yield _POST(URL_CHECK_IN, data, token);
    console.log('CHECK=>>>', response);
    console.log('CHECK=>>>', token);
    console.log('CHECK=>>>', data);

    if (response.success && response.statusCode === 200) {
      yield put(checkInSuccess(response.data));
      yield put(getSummary(token));

      _global.Alert.alert({
        title: langs.alert.checkinSuccess,
        message: response.message,
        leftButton: { text: langs.alert.ok },
      });
      _global.Loading.hide();
    } else {
      _global.Alert.alert({
        title: langs.alert.notify,
        message: response.message,
        leftButton: { text: langs.alert.ok },
      });
      _global.Loading.hide();
    }
  } catch (error) {
    yield put(checkInFailed());
    console.log(error);
    _global.Alert.alert({
      title: langs.alert.notify,
      message: 'Lỗi mạng',
    });
    _global.Loading.hide();
  }
}

function* sagaCheckInWifi(action) {
  try {
    const data = { ...action.payload };
    delete data.type;
    delete data.token;
    const token = action.payload.token;

    const response = yield _POST_WIFI(
      action.payload.type === 'in' ? URL_CHECK_IN_WIFI : URL_CHECK_OUT_WIFI,
      data,
      token,
    );
    console.log('-------> response: ', response);
    if (
      response.success
      && response.statusCode === 200
      && action.payload.type === 'in'
    ) {
      yield put(checkInSuccess(response.data));
      yield put(getSummary(token));
      _global.Alert.alert({
        title: langs.alert.checkinSuccess,
        message: response.message,
        leftButton: { text: langs.alert.ok },
      });
      _global.Loading.hide();
    } else if (
      response.success
      && response.statusCode === 200
      && action.payload.type === 'out'
    ) {
      yield put(checkOutSuccess(response.data));
      yield put(getSummary(token));
      _global.Alert.alert({
        title: langs.alert.checkoutSuccess,
        message: response.message,
        leftButton: { text: langs.alert.ok },
      });
      _global.Loading.hide();
    } else if (
      !response.success
      && response.statusCode === 403
      && action.payload.type === 'in'
    ) {
      _global.Alert.alert({
        title: langs.alert.notify,
        message: langs.errorLocationCheckin,
        leftButton: {
          text: langs.tryAgain,
          onPress: () => store.dispatch(checkInWifi(action.payload)),
        },
        middleButton: {
          text: langs.remote,
          onPress: () => store.dispatch(checkInCode(action.payload)),
        },
        rightButton: {
          text: 'Thoát',
        },
      });
      _global.Loading.hide();
    } else if (
      !response.success
      && response.statusCode === 403
      && action.payload.type === 'out'
    ) {
      _global.Alert.alert({
        title: langs.alert.notify,
        message: langs.errorLocationCheckout,
        leftButton: {
          text: langs.tryAgain,
          onPress: () => store.dispatch(checkInWifi(action.payload)),
        },
        middleButton: {
          text: langs.remote,
          onPress: () => store.dispatch(checkInCode(action.payload)),
        },
        rightButton: {
          text: 'Thoát',
        },
      });
      _global.Loading.hide();
    } else if (response.statusCode >= 500) {
      _global.Alert.alert({
        title: langs.alert.notify,
        message: response.message,
        leftButton: { text: langs.alert.ok },
      });
      _global.Loading.hide();
    } else {
      _global.Alert.alert({
        title: langs.alert.notify,
        message: langs.alert.cantCheck,
        leftButton: {
          text: langs.tryAgain,
          onPress: () => store.dispatch(checkInCode(action.payload)),
        },
        middleButton: {
          text: langs.remote,
          onPress: () => store.dispatch(checkInCode(action.payload)),
        },
        rightButton: {
          text: 'Thoát',
        },
      });
      _global.Loading.hide();
    }
  } catch (error) {
    console.log('error', error);
    _global.Alert.alert({
      title: langs.alert.notify,
      message: 'Lỗi mạng',
      leftButton: { text: langs.alert.ok },
      // rightButton: {text: langs.alert.ok},
    });
    _global.Loading.hide();
  }
}

export function* watchCheckIn() {
  yield takeLatest(types.CHECK_IN, sagaCheckIn);
}
export function* watchCheckInWifi() {
  yield takeLatest(types.CHECK_IN_WIFI, sagaCheckInWifi);
}
function* sagaCreateQR(action) {
  try {
    const data = {
      date: action.payload.day,
    };
    const token = action.payload.token;
    const response = yield _POST(URL_CREATE_QR, data, token);
    console.log('Create QR=>>>', response);
    if (response.success && response.statusCode === 200) {
      yield put(createQRSuccess(response.data.qrDataUrl));
      _global.Loading.hide();
    } else {
      yield put(createQRFailed());
      _global.Alert.alert({
        title: langs.alert.notify,
        message: response.message,
        leftButton: { text: langs.alert.ok },
      });
      _global.Loading.hide();
    }
  } catch (error) {
    console.log(error);
    _global.Alert.alert({
      title: langs.alert.notify,
      message: 'Lỗi mạng',
      leftButton: { text: langs.alert.ok },
    });
    _global.Loading.hide();
  }
}

export function* watchCreateQR() {
  yield takeLatest(types.CREATE_QR, sagaCreateQR);
}
function* sagaSetLateEarly(action) {
  try {
    const data = {
      date: action.payload.date,
      type: action.payload.type,
      time: action.payload.time,
      content: action.payload.content,
      status: action.payload.status,
    };
    const token = action.payload.token;
    const response = yield _POST(URL_LATE_EARLY, data, token);
    console.log('lATE EARLY TEST=>>>', response);
    if (response.success && response.statusCode === 200) {
      yield put(setLateEarlySuccess(response.data));
      _global.Alert.alert({
        title: langs.alert.applydone,
        message: langs.alert.waitConfirm,
        leftButton: {
          text: langs.alert.ok,
          onPress: () => CustomNavigation.goBack(),
        },
      });
      _global.Loading.hide();
    } else {
      yield put(setLateEarlyFailed());
      _global.Alert.alert({
        title: langs.alert.notify,
        message: 'Xin nghỉ ngoài giờ quy định.',
        leftButton: { text: langs.alert.ok },
      });
      _global.Loading.hide();
    }
  } catch (error) {
    console.log(error);
    _global.Alert.alert({
      title: langs.alert.notify,
      message: 'Lỗi mạng',
      leftButton: { text: langs.alert.ok },
    });
    _global.Loading.hide();
  }
}

export function* watchSetLateEarly() {
  yield takeLatest(types.SET_LATE_EARLY, sagaSetLateEarly);
}

function* sagaTakeLeave(action) {
  try {
    const data = {
      date: action.payload.date,
      type: action.payload.type,
      content: action.payload.content,
      morning: action.payload.morning,
      month: action.payload.month,
    };
    const token = action.payload.token;
    const response = yield _POST(URL_TAKE_LEAVE, data, token);
    console.log('take leave=>>>', response);
    if (response.success && response.statusCode === 200) {
      yield put(takeLeaveSuccess(response.data));
      _global.Alert.alert({
        title: langs.alert.applydone,
        message: langs.alert.waitConfirm,
        leftButton: {
          text: langs.alert.ok,
          onPress: () => CustomNavigation.goBack(),
        },
      });
      _global.Loading.hide();
    } else {
      yield put(takeLeaveFailed());
      _global.Alert.alert({
        title: langs.alert.notify,
        message: response.message,
        leftButton: { text: langs.alert.ok },
      });
      _global.Loading.hide();
    }
  } catch (error) {
    console.log(error);
    _global.Alert.alert({
      title: langs.alert.notify,
      message: 'Lỗi mạng',
      leftButton: { text: langs.alert.ok },
    });
    _global.Loading.hide();
  }
}

export function* watchTakeLeave() {
  yield takeLatest(types.TAKE_LEAVE, sagaTakeLeave);
}
function* sagaUpdateTakeLeave(action) {
  try {
    const data = {
      _id: action.payload._id,
      date: action.payload.date,
      type: action.payload.type,
      content: action.payload.content,
      morning: action.payload.morning,
      // month: action.payload.month,
    };
    const token = action.payload.token;
    const response = yield _POST(URL_UPDATE_TAKE_LEAVE, data, token);
    console.log('take leave=>>>', response);
    if (response.success && response.statusCode === 200) {
      yield put(updateTakeLeaveSuccess(response.data));
      _global.Alert.alert({
        title: langs.alert.notify,
        message: langs.alert.waitConfirm,
        leftButton: {
          text: langs.alert.ok,
          onPress: () => CustomNavigation.goBack(),
        },
      });
      _global.Loading.hide();
    } else {
      yield put(updateTakeLeaveFailed());
      _global.Alert.alert({
        title: langs.alert.notify,
        message: response.message,
        leftButton: { text: langs.alert.ok },
      });
      _global.Loading.hide();
    }
  } catch (error) {
    console.log(error);
    _global.Alert.alert({
      title: langs.alert.notify,
      message: 'Lỗi mạng',
      leftButton: { text: langs.alert.ok },
    });
    _global.Loading.hide();
  }
}

export function* watchUpdateTakeLeave() {
  yield takeLatest(types.UPDATE_TAKE_LEAVE, sagaUpdateTakeLeave);
}
function* sagaUpdateOverTime(action) {
  try {
    const data = {
      id: action.payload.id,
      start: action.payload.start,
      start_date: action.payload.start_date,
      content: action.payload.content,
      data: action.payload.data,
      total_time: action.payload.total_time,

      // month: action.payload.month,
    };
    console.log('overtime', data);
    const token = action.payload.token;
    const response = yield _POST(URL_UPDATE_OVERTIME, data, token);
    console.log('take leave=>>>', response);
    if (response.success && response.statusCode === 200) {
      yield put(updateOverTimeSuccess(response.data));
      _global.Alert.alert({
        title: langs.alert.notify,
        message: langs.alert.waitConfirm,
        leftButton: {
          text: langs.alert.ok,
          onPress: () => CustomNavigation.goBack(),
        },
      });
      _global.Loading.hide();
    } else {
      yield put(updateOverTimeFailed());
      _global.Alert.alert({
        title: langs.alert.notify,
        message: response.message,
        leftButton: { text: langs.alert.ok },
      });
      _global.Loading.hide();
    }
  } catch (error) {
    console.log(error);
    _global.Alert.alert({
      title: langs.alert.notify,
      message: 'Lỗi mạng',
      leftButton: { text: langs.alert.ok },
    });
    _global.Loading.hide();
  }
}

export function* watchUpdateOvertime() {
  yield takeLatest(types.UPDATE_OVER_TIME, sagaUpdateOverTime);
}

function* sagaDeleteTakeLeave(action) {
  try {
    const data = {
      _id: action.payload._id,

      // month: action.payload.month,
    };
    const token = action.payload.token;
    const response = yield _POST(URL_DELETE_TAKE_LEAVE, data, token);
    console.log('take leave=>>>', response);
    console.log('take leave=>>>', token);
    console.log('take leave=>>>', data);

    if (response.success && response.statusCode === 200) {
      yield put(deleteTakeLeaveSuccess(response.data));
      _global.Alert.alert({
        title: langs.alert.applydone,
        message: langs.alert.waitConfirm,
        leftButton: {
          text: langs.alert.ok,

        },
      });
      _global.Loading.hide();
    } else {
      yield put(deleteTakeLeaveFailed());
      _global.Alert.alert({
        title: langs.alert.notify,
        message: response.message,
        leftButton: { text: langs.alert.ok },
      });
      _global.Loading.hide();
    }
  } catch (error) {
    console.log(error);
    _global.Alert.alert({
      title: langs.alert.notify,
      message: 'Lỗi mạng',
      leftButton: { text: langs.alert.ok },
    });
    _global.Loading.hide();
  }
}

export function* watchSagaDeleteTakeLeave() {
  yield takeLatest(types.DELETE_TAKE_LEAVE, sagaDeleteTakeLeave);
}
function* sagaOverTime(action) {
  try {
    const data = {
      ...action.payload,
    };
    delete data.token;
    const token = action.payload.token;
    const response = yield _POST(URL_OVERTIME, data, token);
    // const response = {
    //   success: true,
    //   statusCode: 200,
    // };
    console.log('over time=>>>', response);
    if (response.success && response.statusCode === 200) {
      yield put(overTimeSuccess(response.data));
      _global.Alert.alert({
        title: langs.alert.applyOTdone,
        message: langs.alert.waitConfirm,
        leftButton: {
          text: langs.alert.ok,
          onPress: () => CustomNavigation.goBack(),
        },
      });
      _global.Loading.hide();
    } else {
      yield put(overTimeFailed());
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
    _global.Alert.alert({
      title: langs.alert.notify,
      message: 'Lỗi mạng',
      leftButton: { text: langs.alert.ok },
    });
    _global.Loading.hide();
  }
}

export function* watchOverTime() {
  yield takeLatest(types.OVER_TIME, sagaOverTime);
}

function* sagaListLateEarly(action) {
  try {
    const token = action.payload.token;
    const status = action.payload.status;
    const date = action.payload.date;
    const page_size = action.payload.page_size;
    const page = action.payload.page;
    const reload = action.payload.reload;
    const loading = !!action.payload.loading;
    const response = yield _GET(
      URL_LIST_LATE_EARLY(status, date, page, page_size),
      token,
      loading,
    );
    console.log('=.......', response);
    if (response.success && response.statusCode === 200) {
      const DATA = {
        reload,
        data: response.data,
      };
      yield put(listLateEarlySuccess(DATA));
      _global.Loading.hide();
    } else {
      yield put(listLateEarlyFailed());
      _global.Alert.alert({
        title: langs.alert.notify,
        message: response.message,
        leftButton: { text: langs.alert.ok },
      });
      _global.Loading.hide();
    }
  } catch (error) {
    console.log(error);
    _global.Alert.alert({
      title: langs.alert.notify,
      message: 'Lỗi mạng',
      leftButton: { text: langs.alert.ok },
    });
    _global.Loading.hide();
  }
}

export function* watchListLateEarly() {
  yield takeLatest(types.LIST_LATE_EARLY, sagaListLateEarly);
}

function* sagaListManagerLateEarly(action) {
  try {
    const token = action.payload.token;
    const status = action.payload.status;
    const date = action.payload.date;
    const page_size = action.payload.page_size;
    const page = action.payload.page;
    const reload = action.payload.reload;
    const loading = !!action.payload.loading;
    const response = yield _GET(
      URL_LIST_MANAGER_LATE_EARLY(status, date, page, page_size),
      token,
      loading,
    );
    console.log(URL_LIST_MANAGER_LATE_EARLY);
    if (response.success && response.statusCode === 200) {
      const DATA = {
        reload,
        data: response.data,
      };
      yield put(listManagerLateEarlySuccess(DATA));
      _global.Loading.hide();
    } else {
      yield put(listManagerLateEarlyFailed());
      _global.Alert.alert({
        title: langs.alert.notify,
        message: response.message,
        leftButton: { text: langs.alert.ok },
      });
      _global.Loading.hide();
    }
  } catch (error) {
    console.log(error);
    _global.Alert.alert({
      title: langs.alert.notify,
      message: 'Lỗi mạng',
      leftButton: { text: langs.alert.ok },
    });
    _global.Loading.hide();
  }
}

export function* watchListManagerLateEarly() {
  yield takeLatest(types.LIST_MANAGER_LATE_EARLY, sagaListManagerLateEarly);
}

function* sagaApproveLateEarly(action) {
  try {
    const data = {
      id: action.payload._id,
      status: action.payload.status,
    };
    const token = action.payload.token;
    const response = yield _POST(URL_APPROVE_LATE_EARLY, data, token);
    console.log('>>>>>>', response);
    if (response.success && response.statusCode === 200) {
      yield put(approveLateEarlySuccess(response.data));
      _global.Loading.hide();
    } else {
      yield put(approveLateEarlyFailed());
      _global.Alert.alert({
        title: langs.alert.notify,
        message: response.message,
        leftButton: { text: langs.alert.ok },
      });
      _global.Loading.hide();
    }
  } catch (error) {
    console.log(error);
    _global.Alert.alert({
      title: langs.alert.notify,
      message: 'Lỗi mạng',
      leftButton: { text: langs.alert.ok },
    });
    _global.Loading.hide();
  }
}

export function* watchApproveLateEarly() {
  yield takeLatest(types.APPROVE_LATE_EARLY, sagaApproveLateEarly);
}

function* sagaUpdateLateEarly(action) {
  try {
    const data = {
      id: action.payload.id,
      date: action.payload.date,
      type: action.payload.type,
      content: action.payload.content,
      time: action.payload.time,
      status: action.payload.status,
    };
    const token = action.payload.token;
    const response = yield _POST(URL_UPDATE_LATE_EARLY, data, token);
    console.log(response);
    if (response.success && response.statusCode === 200) {
      yield put(updateLateEarlySuccess(response.data));
      _global.Alert.alert({
        title: langs.alert.notify,
        message: langs.alert.waitConfirm,
        leftButton: {
          text: langs.alert.ok,
          onPress: () => CustomNavigation.goBack(),
        },
      });
      _global.Loading.hide();
    } else {
      yield put(updateLateEarlyFailed());
      _global.Alert.alert({
        title: langs.alert.notify,
        message: response.message,
        leftButton: { text: langs.alert.ok },
      });
      _global.Loading.hide();
    }
  } catch (error) {
    console.log(error);
    _global.Alert.alert({
      title: langs.alert.notify,
      message: 'Lỗi mạng',
      leftButton: { text: langs.alert.ok },
    });
    _global.Loading.hide();
  }
}

export function* watchUpdateLateEarly() {
  yield takeLatest(types.UPDATE_LATE_EARLY, sagaUpdateLateEarly);
}

function* sagaDeleteLateEarly(action) {
  try {
    const data = {};
    const token = action.payload.token;
    const response = yield _POST(URL_DELETE_LATE_EARLY, data, token);
    if (response.success && response.statusCode === 200) {
      yield put(deleteLateEarlySuccess(response.data));
      _global.Alert.alert({
        leftButton: {
          text: langs.alert.ok,
        },
      });
      _global.Loading.hide();
    } else {
      yield put(deleteLateEarlyFailed());
      _global.Alert.alert({
        title: langs.alert.notify,
        message: response.message,
        leftButton: { text: langs.alert.ok },
      });
      _global.Loading.hide();
    }
  } catch (error) {
    console.log(error);
    _global.Alert.alert({
      title: langs.alert.notify,
      message: 'Lỗi mạng',
      leftButton: { text: langs.alert.ok },
    });
    _global.Loading.hide();
  }
}

export function* watchDeleteLateEarly() {
  yield takeLatest(types.DELETE_LATE_EARLY, sagaDeleteLateEarly);
}
function* sagaGetListTakeLeave(action) {
  try {
    console.log(action);
    const token = action.payload.token;
    const response = yield _GET(
      LIST_URL_TAKE_LEAVE(
        action.payload.status,
        action.payload.page,
        action.payload.date,
      ),
      token,
    );
    console.log(response);
    if (response.success && response.statusCode === 200) {
      yield put(listTakeLeaveSuccess(response.data));
      _global.Loading.hide();
    } else {
      yield put(listTakeLeaveFailed());
      _global.Loading.hide();
    }
  } catch (error) {
    console.log(error);
    _global.Loading.hide();
  }
}

export function* watchGetListTakeLeave() {
  yield takeLatest(types.GET_LIST_TAKE_LEAVE, sagaGetListTakeLeave);
}

function* sagaGetListAdminTakeLeave(action) {
  try {
    console.log(action);
    const token = action.payload.token;
    const response = yield _GET(
      LIST_URL_ADMIN_TAKE_LEAVE(
        action.payload.status,
        action.payload.page,
        action.payload.date,
      ),
      token,
    );
    console.log(response);
    if (response.success && response.statusCode === 200) {
      yield put(listAdminTakeLeaveSuccess(response.data));
      _global.Loading.hide();
    } else {
      yield put(listAdminTakeLeaveFailed());
      _global.Loading.hide();
    }
  } catch (error) {
    console.log(error);
  }
}

export function* watchGetListAdminTakeLeave() {
  yield takeLatest(types.GET_LIST_ADMIN_TAKE_LEAVE, sagaGetListAdminTakeLeave);
}
function* sagaConfirmDenyTakeLeave(action) {
  try {
    const data = {
      _id: action.payload._id,
      status: action.payload.status,
    };
    const token = action.payload.token;
    const response = yield _POST(URL_CONFIRM_DENY_TAKE_LEAVE, data, token);
    console.log('CONFIRM DENY TAKE LEAVE', response);
    if (response.success && response.statusCode === 200) {
      yield put(confirmDenyTakeLeaveSuccess(response.data));
      _global.Loading.hide();
    } else {
      yield put(confirmDenyTakeLeaveSuccess());
      _global.Alert.alert({
        title: langs.alert.notify,
        message: response.message,
        messageColor: Colors.danger,
        leftButton: { text: langs.alert.ok },
      });
      _global.Loading.hide();
    }
  } catch (error) {
    console.log(error);
    _global.Alert.alert({
      title: langs.alert.notify,
      message: 'Lỗi mạng',
      messageColor: Colors.danger,

      leftButton: { text: langs.alert.ok },
    });
    _global.Loading.hide();
  }
}

export function* watchConfirmDenyTakeLeave() {
  yield takeLatest(types.CONFIRM_DENY_TAKE_LEAVE, sagaConfirmDenyTakeLeave);
}

function* sagaCheckInCode(action) {
  try {
    const data = {
      type: action.payload.type === 'in' ? 1 : 2,
      time: action.payload.time,
      date: action.payload.date
    };
    const token = action.payload.token;
    console.log('savsgha', data);
    const response = yield _POST(
      URL_CHECK_IN_REQUEST,
      data,
      token,
    );
    console.log(response);
    if (
      response.success
      && response.statusCode === 200
      && action.payload.type === 'in'
    ) {
      yield put(checkInRequestSuccess(response.data));
      yield put(getSummary(token));

      _global.Alert.alert({
        title: langs.alert.checkinSuccess,
        message: response.message,
        leftButton: { text: langs.alert.ok },
      });
      _global.Loading.hide();
    } else if (
      response.success
      && response.statusCode === 200
      && action.payload.type === 'out'
    ) {
      yield put(checkOutRequestSuccess(response.data));
      yield put(getSummary(token));

      _global.Alert.alert({
        title: langs.alert.checkoutSuccess,
        message: response.message,
        leftButton: { text: langs.alert.ok },
      });
      _global.Loading.hide();
    } else if (!response.success && response.statusCode === 400) {
      yield put(checkInFailed());
      _global.Alert.alert({
        title: langs.alert.notify,
        message: langs.alert.cantCheck,
        leftButton: {
          text: langs.tryAgain,
          onPress: () => store.dispatch(checkInWifi(data)),
        },
        middleButton: {
          text: langs.remote,
          onPress: () => store.dispatch(checkInCode(action.payload)),
        },
        rightButton: {
          text: 'Thoát',
        },
      });
      _global.Loading.hide();
    } else {
      _global.Alert.alert({
        title: langs.alert.notify,
        message: response.message,
        leftButton: {
          text: langs.alert.ok,
          // onPress : onLongPress
        },
      });
      _global.Loading.hide();
    }
  } catch (error) {
    console.log(error);
    _global.Alert.alert({
      title: langs.alert.notify,
      message: 'Lỗi mạng',
      leftButton: { text: langs.alert.ok },
      // rightButton: {text: langs.alert.ok},
    });
    _global.Loading.hide();
  }
}

export function* watchCheckInCode() {
  yield takeLatest(types.CHECK_IN_CODE, sagaCheckInCode);
}

/// Duyet cham cong tu xa
function* sagaListManagerCheck(action) {
  try {
    const token = action.payload.token;
    const status = action.payload.status;
    const date = action.payload.date;
    const page_size = action.payload.page_size;
    const page = action.payload.page;
    const reload = action.payload.reload;
    const loading = !!action.payload.loading;
    const response = yield _GET(
      URL_LIST_MANAGER_LATE_EARLY(status, date, page, page_size),
      token,
      loading,
    );
    if (response.success && response.statusCode === 200) {
      const DATA = {
        reload,
        data: response.data,
      };
      yield put(listManagerCheckSuccess(DATA));
      _global.Loading.hide();
    } else {
      yield put(listManagerCheckFailed());
      _global.Alert.alert({
        title: langs.alert.notify,
        message: response.message,
        leftButton: { text: langs.alert.ok },
      });
      _global.Loading.hide();
    }
  } catch (error) {
    console.log(error);
    _global.Alert.alert({
      title: langs.alert.notify,
      message: 'Lỗi mạng',
      leftButton: { text: langs.alert.ok },
    });
    _global.Loading.hide();
  }
}

export function* watchListManagerCheck() {
  yield takeLatest(types.LIST_MANAGER_CHECK, sagaListManagerCheck);
}

function* sagaApproveCheck(action) {
  try {
    const data = {
      id: action.payload._id,
      status: action.payload.status,
    };
    const token = action.payload.token;
    const response = yield _POST(URL_APPROVE_LATE_EARLY, data, token);
    console.log('>>>>>>', response);
    if (response.success && response.statusCode === 200) {
      yield put(approveCheckSuccess(response.data));
      _global.Loading.hide();
    } else {
      yield put(approveCheckFailed());
      _global.Alert.alert({
        title: langs.alert.notify,
        message: response.message,
        leftButton: { text: langs.alert.ok },
      });
      _global.Loading.hide();
    }
  } catch (error) {
    console.log(error);
    _global.Alert.alert({
      title: langs.alert.notify,
      message: 'Lỗi mạng',
      leftButton: { text: langs.alert.ok },
    });
    _global.Loading.hide();
  }
}

export function* watchApproveCheck() {
  yield takeLatest(types.APPROVE_CHECK, sagaApproveCheck);
}
