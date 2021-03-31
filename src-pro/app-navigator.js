/**
 * Created by phongdt on Fri Feb 07 2020
 * Copyright (c) 2020 phongdt@lumi.biz
 */

import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { Linking, UIManager, LayoutAnimation, AppState } from 'react-native';
import moment from 'moment';
import DeviceInfo from 'react-native-device-info';
import SplashScreen from 'react-native-smart-splash-screen';
import { autoLogin, getDeviceId } from './redux/actions/authen';
import { resetCheck } from './redux/actions/check';
import { getWorkdayToday } from './redux/actions/user';
import Navigator from './navigator';
import LoadInital from './admin/screen/loadInitial';
import Notify from './notify';
import Version from './component/Version';

UIManager.setLayoutAnimationEnabledExperimental
  && UIManager.setLayoutAnimationEnabledExperimental(true);

const AppNavigator = (props) => {
  const {
    token,
    autoLoginStatus,
    autoLogin,
    getDeviceId,
    deviceId,
    dateCheckIn,
    codepush,
    resetCheck,
    getWorkdayToday,
  } = props;
  const [loading, setLoading] = useState(true);
  const appState = useRef(AppState.currentState);

  const titleVersion = `${DeviceInfo.getVersion()}`;

  useEffect(() => {
    AppState.addEventListener('change', _handleAppStateChange);

    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);

    if (
      moment(dateCheckIn).format('DD/MM/YYYY') !== moment().format('DD/MM/YYYY')
    ) {
      resetCheck();
    }

    setTimeout(async () => {
      token ? (autoLoginStatus ? autoLogin() : null) : null;
      setLoading(false);
    }, 450);
    SplashScreen.close({
      animationType: SplashScreen.animationType.scale,
      duration: 850,
      delay: 0,
    });
    return () => {
      AppState.removeEventListener('change', _handleAppStateChange);
    };
  }, [token, autoLoginStatus, autoLogin, deviceId, getDeviceId, dateCheckIn]);

  console.log('Titleversion', titleVersion);
  const _handleAppStateChange = (nextAppState) => {
    if (token && nextAppState === 'active') {
      getWorkdayToday({ token, date: moment().format('DD/MM/YYYY') });
      console.log('call api here');
    }
    console.log('AppState currrent', nextAppState);
  };
  const handleOpenURL = () => {};

  useEffect(() => {
    Linking.getInitialURL().then((url) => handleOpenURL({ url }));
    Linking.addEventListener('url', handleOpenURL);

    () => {
      Linking.removeEventListener('url', handleOpenURL);
    };
  }, []);

  if (loading) {
    return <LoadInital />;
  }

  return (
    <>
      <Navigator
        loginSuccess={props.loginSuccess}
        changePass={props.changePass}
        role={props.role}
      />
      {/* {codepush.progress !== 0 && <Version />} */}
      <Notify />
    </>
  );
};

const mapDispatchToProps = {
  autoLogin,
  getDeviceId,
  resetCheck,
  getWorkdayToday,
};

const mapStateToProps = (state) => {
  return {
    loginSuccess: state.authen.loginSuccess,
    changePass: state.authen.changePass,
    token: state.authen.token,
    role: state.authen.role,
    autoLoginStatus: state.authen.autoLoginStatus,
    dateCheckIn: state.check.dateCheckIn,
    codepush: state.codepush,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AppNavigator);
