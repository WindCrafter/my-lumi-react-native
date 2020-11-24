import React, {Component} from 'react';
import {connect} from 'react-redux';
import HomeComponent from '../../screen/home';
import { getListNotifys } from '../../../redux/actions/user';

const mapStateToProps = (state) => ({
  nameUser: state.authen.userProfile.name,
  emailUser: state.authen.userProfile.email,
  timeIn: state.check.timeCheckIn,
  timeOut: state.check.timeCheckOut,
  token: state.authen.token,
});

const mapDispatchToProps = {
  getListNotifys,
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeComponent);
