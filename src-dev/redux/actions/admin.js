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

export const getListRoles = (data) => {
  return {
    type: types.GET_LIST_ROLES,
    payload: data,
  };
};

export const getListRolesSuccess = (data) => {
  return {
    type: types.GET_LIST_ROLES_SUCCESS,
    payload: data,
  };
};

export const getListRolesFailed = () => {
  return {
    type: types.GET_LIST_ROLES_FAILED,
  };
};

