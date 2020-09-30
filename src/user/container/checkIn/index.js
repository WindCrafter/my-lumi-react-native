import React, {Component} from 'react';
import {connect} from 'react-redux';
import CheckInComponent from '../../screen/checkIn';
import {checkIn} from '../../../redux/actions/check';
import {checkInWifi} from '../../../redux/actions/check';

const mapStateToProps = (state) => ({
  deviceId: state.authen.deviceId,
  token: state.authen.token,
  currentUser: state.user.currentUser,

});

const mapDispatchToProps = {
  checkIn,
  checkInWifi,
};

export default connect(mapStateToProps, mapDispatchToProps)(CheckInComponent);
