import React, {Component} from 'react';
import {connect} from 'react-redux';
import HomeComponent from '../../screen/home';
import {getListNotifys, getWorkdayToday} from '../../../redux/actions/user';
import {getSummary} from '../../../redux/actions/authen';

const mapStateToProps = (state) => ({
  nameUser: state.authen.fullname,
  emailUser: state.authen.email,
  timeIn: state.check.timeCheckIn,
  timeOut: state.check.timeCheckOut,
  token: state.authen.token,
  summary: state.authen.summary,
});

const mapDispatchToProps = {
  getListNotifys,
  getSummary,
  getWorkdayToday,
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeComponent);
