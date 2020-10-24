import React, {Component} from 'react';
import {connect} from 'react-redux';
import CheckInComponent from '../../screen/checkIn';
import {checkIn} from '../../../redux/actions/check';
import {checkInWifi} from '../../../redux/actions/check';
import {switchTo} from '../../../redux/actions/check';

const mapStateToProps = (state) => ({
  deviceId: state.authen.deviceId,
  token: state.authen.token,
  currentUser: state.user.currentUser,
  type: state.check.type,
});

const mapDispatchToProps = {
  checkIn,
  checkInWifi,
  switchTo,
};

export default connect(mapStateToProps, mapDispatchToProps)(CheckInComponent);
