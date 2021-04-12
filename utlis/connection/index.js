import React, { Component } from 'react';
import { _POST, _GET } from './api';
import { URL, URL_STAGING } from './url';

const URL_LOGIN = `${URL.LOCAL_HOST}${URL.LOGIN}`;
const URL_CHANGE_PASS = `${URL.LOCAL_HOST}${URL.CHANGE_PASS}`;
const URL_CHECK_IN = `${URL.LOCAL_HOST}${URL.CHECK_IN}`;
const URL_CHECK_IN_WIFI = `${URL.LOCAL_HOST}${URL.CHECK_IN_WIFI}`;

const URL_UPDATE_PROFILE = `${URL.LOCAL_HOST}${URL.UPDATE_PROFILE}`;
const URL_LATE_EARLY = `${URL.LOCAL_HOST}${URL.LATE_EARLY}`;
const URL_TAKE_LEAVE = `${URL.LOCAL_HOST}${URL.TAKE_LEAVE}`;
const URL_OVERTIME = `${URL.LOCAL_HOST}${URL.OVERTIME}`;
const URL_ASSIGN = `${URL.LOCAL_HOST}${URL.GET_LIST_ASSIGN}`;
const URL_TEAMS = `${URL.LOCAL_HOST}${URL.GET_LIST_TEAMS}`;

export class Connection extends Component {
  changePass(data, token) {
    return _POST(URL_CHANGE_PASS, data, token);
  }

  loginAction(data) {
    return _POST(URL_LOGIN, data);
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

  setLateEarly(data, token) {
    return _POST(URL_LATE_EARLY, data, token);
  }

  takeLeave(data, token) {
    return _POST(URL_TAKE_LEAVE, data, token);
  }

  overTime(data, token) {
    return _POST(URL_OVERTIME, data, token);
  }

  listTeams(token) {
    return _POST(URL_TEAMS, token);
  }

  listAssign(token) {
    return _POST(URL_ASSIGN, token);
  }
}

export default new Connection();
