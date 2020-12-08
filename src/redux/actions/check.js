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
