import * as types from '../types';

export const checkIn = (data) => {
  return {
    type: types.CHECK_IN,
    payload: data,
  };
};

export const checkInWifi = (data) => {
  return {
    type: types.CHECK_IN_WIFI,
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

export const createQR = (data) => {
  return {
    type: types.CREATE_QR,
    payload: data,
  };
};

export const createQRSuccess = (data) => {
  return {
    type: types.CREATE_QR_SUCCESS,
    payload: data,
  };
};

export const createQRFailed = () => {
  return {
    type: types.CREATE_QR_FAILED,
  };
};
