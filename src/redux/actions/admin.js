import * as types from '../types';

export const addStaff = (data) => {
  return {
    type: types.ADD_STAFF,
    payload: data,
  };
};

export const addStaffSuccess = (data) => {
  return {
    type: types.ADD_STAFF_SUCCESS,
    payload: data,
  };
};

export const addStaffFailed = () => {
  return {
    type: types.ADD_STAFF_FAILED,
  };
};
