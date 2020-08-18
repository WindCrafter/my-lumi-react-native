/**
 * Created by nghinv on Fri Feb 07 2020
 * Copyright (c) 2020 nghinv@lumi.biz
 */

import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { StatusBar, Image, UIManager, LayoutAnimation } from 'react-native';
import { autoLogin } from './src/redux/actions/authen';
import Navigator from './src/navigator';
import LoadInital from './src/admin/screen/loadInitial';

UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);

const AppNavigator = (props) => {
  const { token, autoLoginStatus, autoLogin } = props;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
    setTimeout(async function changeLoading() {
      token ? (autoLoginStatus ? autoLogin() : null) : null;
      setLoading(false);
    }, 2000);
  }, [token, autoLoginStatus]);

  if (loading) {
    return <LoadInital />;
  }

  return (
    <>
      <Navigator
        loginSuccess={props.loginSuccess}
        changePass={props.changePass}
      />
    </>
  );
};

const mapDispatchToProps = {
  autoLogin,
};

const mapStateToProps = (state) => {
  return {
    loginSuccess: state.authen.loginSuccess,
    changePass: state.authen.changePass,
    token: state.authen.token,
    autoLoginStatus: state.authen.autoLoginStatus,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AppNavigator);
