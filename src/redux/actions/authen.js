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
