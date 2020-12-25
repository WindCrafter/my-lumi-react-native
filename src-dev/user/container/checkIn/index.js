import React, {Component} from 'react';
import {connect} from 'react-redux';
import CheckInComponent from '../../screen/checkIn';
import {checkInCode} from '../../../redux/actions/check';
import {switchTo, changeToIn, changeToOut} from '../../../redux/actions/check';

const mapStateToProps = (state) => ({
  deviceId: state.authen.deviceId,
  token: state.authen.token,
  currentUser: state.user.currentUser,
  type: state.check.type,
  demoMode: state.user.demoMode,
});

const mapDispatchToProps = {
  checkInCode,
  switchTo,
  changeToIn,
  changeToOut,
};

export default connect(mapStateToProps, mapDispatchToProps)(CheckInComponent);
