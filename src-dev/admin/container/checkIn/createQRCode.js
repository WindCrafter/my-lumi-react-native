import React, { Component } from 'react';
import { connect } from 'react-redux';
import createQRCode from '../../screen/checkIn/createQRCode';
import { createQR } from '../../../redux/actions/check';

const mapStateToProps = (state) => ({
  token: state.authen.token,
  source: state.check.source,
});

const mapDispatchToProps = {
  createQR,
};

export default connect(mapStateToProps, mapDispatchToProps)(createQRCode);
