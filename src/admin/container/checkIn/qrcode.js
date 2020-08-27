import React, { Component } from 'react';
import { connect } from 'react-redux';
import QRCode from '../../screen/checkIn/qrCode';
import { checkIn } from '../../../redux/actions/check';

const mapStateToProps = (state) => ({
  deviceId: state.authen.deviceId,
  token: state.authen.token,
});

const mapDispatchToProps = {
  checkIn,
};
export default connect(mapStateToProps, mapDispatchToProps)(QRCode);
