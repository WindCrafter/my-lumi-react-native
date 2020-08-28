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
