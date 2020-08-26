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
  deviceId: '',
  roleIdUser: {},
  roleIdAdmin: {},
};

export default function admin(state = initialState, action) {
  switch (action.type) {
    case types.ADD_STAFF:
      return {
        ...state,
      };
    case types.GET_LIST_ROLES_SUCCESS:
      const resAdmin = action.payload.data.filter((e) => e.name === 'ADMIN');
      const resUser = action.payload.data.filter((e) => e.name === 'USER');
      return {
        ...state,
        roleIdAdmin: resAdmin[0].roleId,
        roleIdUser: resUser[0].roleId,
      };
    case types.GET_DEVICE_ID:
      return {
        ...state,
        deviceId: action.payload.data,
      };
    default:
      return state;
  }
}
