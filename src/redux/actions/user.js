import * as types from '../types';

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

export const updateProfileFailed = () => {
  return {
    type: types.UPDATE_PROFILE_FAILED,
  };
};
export const getListUsers = (data) => {
  return {
    type: types.GET_LIST_USERS,
    payload: data,
  };
};

export const getListUsersSuccess = (data) => {
  return {
    type: types.GET_LIST_USERS_SUCCESS,
    payload: data,
  };
};

export const getListUsersFailed = () => {
  return {
    type: types.GET_LIST_USERS_FAILED,
  };
};