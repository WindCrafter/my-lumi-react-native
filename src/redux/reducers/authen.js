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
  nameUser: '',
  emailUser: '',
  phoneNumber: '',
  advance: {},
};

export default function authen(state = initialState, action) {
  switch (action.type) {
    case types.LOGIN_SUCCESS:
      return {
        ...state,
        currentUser: { ...(action.payload || {}) },
        loginSuccess: true,
        changePass: action.payload.changePass,
        token: state.autoLoginStatus ? action.payload.token : null,
        role:
          action.payload.data.userProfile.roleId ===
            action.payload.data.roles[0].roleId
            ? 'admin'
            : 'user',
        nameUser: action.payload.data.userProfile.name,
        emailUser: action.payload.data.userProfile.email,
        phoneNumber: action.payload.data.userProfile.phoneNumber,
        advance: action.payload.data.userProfile.advance,
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
        nameUser: action.payload.name,
        emailUser: action.payload.email,
        phoneNumber: action.payload.phoneNumber,
        advance: action.payload.advance,
        
      };
    default:
      return state;
  }
}
