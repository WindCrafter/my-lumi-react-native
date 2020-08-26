import * as types from '../types';

export const checkIn = (data) => {
  return {
    type: types.CHECK_IN,
    payload: data,
  };
};

export const checkInSuccess = (data) => {
  return {
    type: types.CHECK_IN_SUCCESS,
    payload: data,
  };
};

export const checkInFailed = () => {
  return {
    type: types.CHECK_IN_FAILED,
  };
};
