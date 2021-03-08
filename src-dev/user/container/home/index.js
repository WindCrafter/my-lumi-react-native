import React, { Component } from 'react';
import { connect } from 'react-redux';
import HomeComponent from '../../screen/home';
import {
  getListNotifys,
  getWorkdayToday,
  getUnreadNotify,
} from '../../../redux/actions/user';
import { getSummary } from '../../../redux/actions/authen';

const mapStateToProps = (state) => ({
  nameUser: state.authen.fullname,
  emailUser: state.authen.email,
  timeIn: state.check.timeCheckIn,
  timeOut: state.check.timeCheckOut,
  token: state.authen.token,
  summary: state.authen.summary,
  role: state.authen.role,
  unreadNotify: state.user.unreadNotify,
});

const mapDispatchToProps = {
  getListNotifys,
  getSummary,
  getWorkdayToday,
  getUnreadNotify,
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeComponent);
