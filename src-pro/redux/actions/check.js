import * as types from '../types';

export const checkIn = (data) => {
  return {
    type: types.CHECK_IN,
    payload: data,
  };
};

export const checkInWifi = (data) => {
  return {
    type: types.CHECK_IN_WIFI,
    payload: data,
  };
};
export const checkInSuccess = (data) => {
  return {
    type: types.CHECK_IN_SUCCESS,
    payload: data,
  };
};

export const checkOutSuccess = (data) => {
  return {
    type: types.CHECK_OUT_SUCCESS,
    payload: data,
  };
};
export const checkInFailed = () => {
  return {
    type: types.CHECK_IN_FAILED,
  };
};

export const createQR = (data) => {
  return {
    type: types.CREATE_QR,
    payload: data,
  };
};

export const createQRSuccess = (data) => {
  return {
    type: types.CREATE_QR_SUCCESS,
    payload: data,
  };
};

export const createQRFailed = () => {
  return {
    type: types.CREATE_QR_FAILED,
  };
};
//
export const setLateEarly = (data) => {
  return {
    type: types.SET_LATE_EARLY,
    payload: data,
  };
};
export const setLateEarlyFailed = () => {
  return {
    type: types.SET_LATE_EARLY_FAILED,
  };
};
export const setLateEarlySuccess = (data) => {
  return {
    type: types.SET_LATE_EARLY_SUCCESS,
    payload: data,
  };
};

export const listLateEarly = (data) => {
  return {
    type: types.LIST_LATE_EARLY,
    payload: data,
  };
};
export const listLateEarlyFailed = () => {
  return {
    type: types.LIST_LATE_EARLY_FAILED,
  };
};
export const listLateEarlySuccess = (data) => {
  return {
    type: types.LIST_LATE_EARLY_SUCCESS,
    payload: data,
  };
};

export const listManagerLateEarly = (data) => {
  return {
    type: types.LIST_MANAGER_LATE_EARLY,
    payload: data,
  };
};
export const listManagerLateEarlyFailed = () => {
  return {
    type: types.LIST_MANAGER_LATE_EARLY_FAILED,
  };
};
export const listManagerLateEarlySuccess = (data) => {
  return {
    type: types.LIST_MANAGER_LATE_EARLY_SUCCESS,
    payload: data,
  };
};

export const approveLateEarly = (data) => {
  return {
    type: types.APPROVE_LATE_EARLY,
    payload: data,
  };
};
export const approveLateEarlyFailed = () => {
  return {
    type: types.APPROVE_LATE_EARLY_FAILED,
  };
};
export const approveLateEarlySuccess = (data) => {
  return {
    type: types.APPROVE_LATE_EARLY_SUCCESS,
    payload: data,
  };
};

export const updateLateEarly = (data) => {
  return {
    type: types.UPDATE_LATE_EARLY,
    payload: data,
  };
};
export const updateLateEarlyFailed = () => {
  return {
    type: types.UPDATE_LATE_EARLY_FAILED,
  };
};
export const updateLateEarlySuccess = (data) => {
  return {
    type: types.UPDATE_LATE_EARLY_SUCCESS,
    payload: data,
  };
};

export const deleteLateEarly = (data) => {
  return {
    type: types.DELETE_LATE_EARLY,
    payload: data,
  };
};
export const deleteLateEarlyFailed = () => {
  return {
    type: types.DELETE_LATE_EARLY_FAILED,
  };
};
export const deleteLateEarlySuccess = (data) => {
  return {
    type: types.DELETE_LATE_EARLY_SUCCESS,
    payload: data,
  };
};
//
export const takeLeave = (data) => {
  return {
    type: types.TAKE_LEAVE,
    payload: data,
  };
};
export const takeLeaveFailed = () => {
  return {
    type: types.TAKE_LEAVE_FAILED,
  };
};
export const takeLeaveSuccess = (data) => {
  return {
    type: types.TAKE_LEAVE_SUCCESS,
    payload: data,
  };
};

export const overTime = (data) => {
  return {
    type: types.OVER_TIME,
    payload: data,
  };
};
export const overTimeFailed = () => {
  return {
    type: types.OVER_TIME_FAILED,
  };
};
export const overTimeSuccess = (data) => {
  return {
    type: types.OVER_TIME_SUCCESS,
    payload: data,
  };
};

export const switchTo = () => {
  return {
    type: types.SWITCH_TO_CHECKIN,
  };
};

export const resetCheck = () => {
  return {
    type: types.RESET_CHECK,
  };
};
export const changeToIn = () => {
  return {
    type: types.CHANGETO_CHECKIN,
  };
};
export const changeToOut = () => {
  return {
    type: types.CHANGETO_CHECKOUT,
  };
};

export const listTakeLeave = (data) => {
  return {
    type: types.GET_LIST_TAKE_LEAVE,
    payload: data,
  };
};
export const listTakeLeaveSuccess = (data) => {
  return {
    type: types.GET_LIST_TAKE_LEAVE_SUCCESS,
    payload: data,
  };
};

export const listTakeLeaveFailed = (data) => {
  return {
    type: types.GET_LIST_TAKE_LEAVE_FAILED,
    payload: data,
  };
};
export const listAdminTakeLeave = (data) => {
  return {
    type: types.GET_LIST_ADMIN_TAKE_LEAVE,
    payload: data,
  };
};
export const listAdminTakeLeaveSuccess = (data) => {
  return {
    type: types.GET_LIST_ADMIN_TAKE_LEAVE_SUCCESS,
    payload: data,
  };
};

export const listAdminTakeLeaveFailed = (data) => {
  return {
    type: types.GET_LIST_ADMIN_TAKE_LEAVE_FAILED,
    payload: data,
  };
};

export const confirmDenyTakeLeave = (data) => {
  return {
    type: types.CONFIRM_DENY_TAKE_LEAVE,
    payload: data,
  };
};
export const confirmDenyTakeLeaveSuccess = (data) => {
  return {
    type: types.CONFIRM_DENY_TAKE_LEAVE_SUCCESS,
    payload: data,
  };
};

export const confirmDenyTakeLeaveFailed = (data) => {
  return {
    type: types.CONFIRM_DENY_TAKE_LEAVE_FAILED,
    payload: data,
  };
};
export const removeList = () => {
  return {
    type: types.REMOVE_LIST,
  };
};
