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
  oneSignalID: '',
  refresh_token: '',
  fullname: '',
  phone_number: '',
  birthday: '',
  email: '',
  avatar: '',
  address: '',
  team_id: '',
  staff_type: '',
  summary: {},
};

export default function authen(state = initialState, action) {
  switch (action.type) {
    case types.LOGIN_SUCCESS:
      return {
        ...state,
        loginSuccess: true,
        token: action.payload.token,
        refresh_token: action.payload.refresh_token,
        user_id: action.payload.user_id,
      };
    case types.GET_PROFILE_SUCCESS:
      // "id": 18,
      //   "code_staff": "ductx",
      //   "fullname": "Nguyễn Văn A",
      //   "phone_number": null,
      //   "birthday": "21/11/2020",
      //   "email": "ductx@lumi.biz",
      //   "avatar": "https://avatar.com.vn/image.png",
      //   "address": "Văn Quán, Hà Đông",
      //   "team_id": null,
      //   "staff_type": null,
      //   "role": "
      return {
        ...state,
        fullname: action.payload.data.fullname,
        phone_number: action.payload.data.phone_number,
        birthday: action.payload.data.birthday,
        email: action.payload.data.email,
        avatar: action.payload.data.avatar,
        address: action.payload.data.address,
        team_id: action.payload.data.team_id,
        staff_type: action.payload.data.staff_type,
        role: action.payload.data.role,
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
        fullname: action.payload.fullname,
        phone_number: action.payload.phone_number,
        birthday: action.payload.birthday,
        email: action.payload.email,
        avatar: action.payload.avatar,
        address: action.payload.address,
        team_id: action.payload.team_id,
        staff_type: action.payload.staff_type,
        role: action.payload.role,
      };
    case types.GET_ONE_SIGNAL_ID:
      return {
        ...state,
        oneSignalID: action.payload,
      };
    case types.GET_SUMMARY_SUCCESS:
      return {
        ...state,
        summary: action.payload.data,
      };
    default:
      return state;
  }
}
