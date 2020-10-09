/**
 * Created by nghinv on Thu May 31 2018
 * Copyright (c) 2018 nghinv
 */

import * as types from '../types';

const initialState = {
  authenticated: false,
  isLogin: false,
  currentUser: {},
  loginSuccess: false,
  token: '',
  changePass: false,
  autoLoginStatus: false,
  role: 'admin',
  deviceId: '',
  userProfile: {},
  remember: false,
  roleInfo: [],
};

export default function authen(state = initialState, action) {
  switch (action.type) {
    case types.LOGIN_SUCCESS:
      return {
        ...state,
        loginSuccess: true,
        changePass: action.payload.changePass,
        // changePass: true,

        token: action.payload.token,
        role: action.payload.data.roles[0].roleType === 1 ? 'admin' : 'user',
        userProfile: action.payload.data.userProfile,
        roleInfo: action.payload.data.roles,
      };
    case types.CHANGE_PASS_SUCCESS:
      return {
        ...state,
        changePass: false,
      };
    case types.AUTO_LOGIN:
      return {
        ...state,
        loginSuccess: true,
      };
    case types.CHANGE_AUTO_LOGIN:
      return {
        ...state,
        autoLoginStatus: action.payload,
      };
    case types.LOG_OUT:
      return {
        ...state,
        loginSuccess: false,
        token: '',
      };
    case types.GET_DEVICE_ID:
      return {
        ...state,
        deviceId: action.payload,
      };
    case types.UPDATE_PROFILE_SUCCESS:
      return {
        ...state,
        userProfile: action.payload,
      };
    default:
      return state;
  }
}
