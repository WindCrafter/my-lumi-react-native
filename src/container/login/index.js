import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { loginAction } from '../../redux/actions/authen';
import LoginComponent from '../../screen/login';

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {
  loginAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginComponent);
