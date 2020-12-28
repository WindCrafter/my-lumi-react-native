import React, {Component} from 'react';
import {connect} from 'react-redux';
import verify from '../../screen/notify/type/verify/index';
import {
  setStatusBreak,
  setStatusLateEarly,
  setStatusOT,
} from '../../../redux/actions/authen';
const mapStateToProps = (state) => ({
  token: state.authen.token,
});

const mapDispatchToProps = {
  setStatusBreak,
  setStatusLateEarly,
  setStatusOT,
};

export default connect(mapStateToProps, mapDispatchToProps)(verify);
