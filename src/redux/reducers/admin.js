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
  roleIdUser: {},
  roleIdAdmin: {},
};

export default function admin(state = initialState, action) {
  switch (action.type) {
    case types.ADD_STAFF:
      return {
        ...state,
      };
    default:
      return state;
  }
}
