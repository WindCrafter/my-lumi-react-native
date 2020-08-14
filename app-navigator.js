/**
 * Created by nghinv on Fri Feb 07 2020
 * Copyright (c) 2020 nghinv@lumi.biz
 */

import React from 'react';
import { connect } from 'react-redux';
import { StatusBar } from 'react-native';
import Navigator from './src/navigator';

const AppNavigator = (props) => {
  return (
    <>
      <Navigator
        loginSuccess={props.loginSuccess}
        changePass={props.changePass}
      />
    </>
  );
};

const mapDispatchToProps = {};

const mapStateToProps = (state) => {
  return {
    loginSuccess: state.authen.loginSuccess,
    changePass: state.authen.changePass,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AppNavigator);
