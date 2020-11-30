import * as types from '../types';

export const loginAction = (data) => {
  return {
    type: types.LOGIN_ACTION,
    payload: data,
  };
};

export const rememberAccount = (isAutologin) => {
  return {
    type: types.REMEMBER_ACCOUNT,
    payload: isAutologin,
  };
};

export const loginSuccess = (data) => {
  return {
    type: types.LOGIN_SUCCESS,
    payload: data,
  };
};

export const loginFailed = () => {
  return {
    type: types.LOGIN_FAILED,
  };
};

export const changePass = (data) => {
  return {
    type: types.CHANGE_PASS,
    payload: data,
  };
};

export const changePassSuccess = () => {
  return {
    type: types.CHANGE_PASS_SUCCESS,
  };
};

export const changePassFailed = () => {
  return {
    type: types.CHANGE_PASS_FAILED,
  };
};

export const updateProfile = (data) => {
  return {
    type: types.UPDATE_PROFILE,
    payload: data,
  };
};

export const updateProfileSuccess = (data) => {
  return {
    type: types.UPDATE_PROFILE_SUCCESS,
    payload: data,
  };
};
export const updateProfileFailed = (data) => {
  return {
    type: types.UPDATE_PROFILE_FAILED,
    payload: data,
  };
};
export const autoLogin = () => {
  return {
    type: types.AUTO_LOGIN,
  };
};

export const changeAutoLogin = (data) => {
  return {
    type: types.CHANGE_AUTO_LOGIN,
    payload: data,
  };
};

export const logOut = () => {
  return {
    type: types.LOG_OUT,
  };
};

export const getDeviceId = (data) => {
  return {
    type: types.GET_DEVICE_ID,
    payload: data,
  };
};

export const getOneSignalID = (data) => {
  return {
    type: types.GET_ONE_SIGNAL_ID,
    payload: data,
  };
};
export const setStatusOT = (data) => {
  return {
    type: types.SET_STATUS_OT,
    payload: data,
  };
};

export const setStatusOTSuccess = (data) => {
  return {
    type: types.SET_STATUS_OT_SUCCESS,
    payload: data,
  };
};

export const setStatusOTFailed = () => {
  return {
    type: types.SET_STATUS_OT_FAILED,
  };
};

export const setStatusBreak = (data) => {
  return {
    type: types.SET_STATUS_BREAK,
    payload: data,
  };
};

export const setStatusBreakSuccess = (data) => {
  return {
    type: types.SET_STATUS_BREAK_SUCCESS,
    payload: data,
  };
};

export const setStatusBreakFailed = () => {
  return {
    type: types.SET_STATUS_BREAK_FAILED,
  };
};
export const setStatusLateEarly = (data) => {
  return {
    type: types.SET_STATUS_LATE_EARLY,
    payload: data,
  };
};

export const setStatusLateEarlySuccess = (data) => {
  return {
    type: types.SET_STATUS_LATE_EARLY_SUCCESS,
    payload: data,
  };
};

export const setStatusLateEarlyFailed = () => {
  return {
    type: types.SET_STATUS_LATE_EARLY_FAILED,
  };
};

export const register = (data) => {
  return {
    type: types.REGISTER,
    payload: data,
  };
};

export const registerSuccess = (data) => {
  return {
    type: types.REGISTER_SUCCESS,
    payload: data,
  };
};

export const registerFailed = () => {
  return {
    type: types.REGISTER_FAILED,
  };
};
export const getProfile = (data) => {
  return {
    type: types.GET_PROFILE,
    payload: data,
  };
};

export const getProfileSuccess = (data) => {
  return {
    type: types.GET_PROFILE_SUCCESS,
    payload: data,
  };
};

export const getProfileFailed = () => {
  return {
    type: types.GET_PROFILE_FAILED,
  };
};

