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
