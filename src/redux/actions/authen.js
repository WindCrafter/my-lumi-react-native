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
