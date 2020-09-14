import React, {Component} from 'react';
import {_POST, _GET} from './api';
import {URL} from './url';

const URL_LOGIN = `${URL.LOCAL_HOST}${URL.LOGIN}`;
const URL_CHANGE_PASS = `${URL.LOCAL_HOST}${URL.CHANGE_PASS}`;
const URL_LIST_ROLE = `${URL.LOCAL_HOST}${URL.LIST_ROLES}`;
const URL_ADD_STAFF = `${URL.LOCAL_HOST}${URL.ADD_USER}`;
const URL_CHECK_IN = `${URL.LOCAL_HOST}${URL.CHECK_IN}`;
const URL_CHECK_IN_WIFI = `${URL.LOCAL_HOST}${URL.CHECK_IN_WIFI}`;

const URL_UPDATE_PROFILE = `${URL.LOCAL_HOST}${URL.UPDATE_PROFILE}`;
const URL_GET_QR = `${URL.LOCAL_HOST}${URL.GET_QR}`;

export class Connection extends Component {
  changePass(data, token) {
    return _POST(URL_CHANGE_PASS, data, token);
  }

  loginAction(data) {
    return _POST(URL_LOGIN, data);
  }

  addStaff(data, token) {
    return _POST(URL_ADD_STAFF, data, token);
  }

  getListRoles(token) {
    return _GET(URL_LIST_ROLE, token);
  }

  check(data, token) {
    return _POST(URL_CHECK_IN, data, token);
  }
  checkInWifi(data, token) {
    return _POST(URL_CHECK_IN_WIFI, data, token);
  }
  updateProfile(data, token) {
    return _POST(URL_UPDATE_PROFILE, data, token);
  }
  getQR(date, token) {
    return _GET(`${URL_GET_QR}${date}`, token);
  }
}

export default new Connection();
