/**
 * Created by phongdt on Fri Feb 07 2020
 * Copyright (c) 2020 phongdt@lumi.biz
 */

import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {Linking, UIManager, LayoutAnimation} from 'react-native';
import moment from 'moment';
import {autoLogin, getDeviceId} from './redux/actions/authen';
import {resetCheck} from './redux/actions/check';
import Navigator from './navigator';
import {_global} from '../utlis/global/global';
import LoadInital from './admin/screen/loadInitial';
import {Loading, Alert} from './component';
import DeviceInfo from 'react-native-device-info';
import Notify from '../notify';
import SplashScreen from 'react-native-smart-splash-screen';
import Version from './component/Version';

UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);

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
  } = props;
  const [loading, setLoading] = useState(true);

  let titleVersion = `${DeviceInfo.getVersion()}`;

  useEffect(() => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);

    if (
      moment(dateCheckIn).format('DD/MM/YYYY') !== moment().format('DD/MM/YYYY')
    ) {
      resetCheck();
    }

    setTimeout(async function changeLoading() {
      token ? (autoLoginStatus ? autoLogin() : null) : null;
      setLoading(false);
    }, 450);
    SplashScreen.close({
      animationType: SplashScreen.animationType.scale,
      duration: 850,
      delay: 0,
    });
  }, [token, autoLoginStatus, autoLogin, deviceId, getDeviceId, dateCheckIn]);

  console.log('Titleversion', titleVersion);

  const handleOpenURL = () => {};

  useEffect(() => {
    Linking.getInitialURL().then((url) => handleOpenURL({url}));
    Linking.addEventListener('url', handleOpenURL);

    () => {
      Linking.removeEventListener('url', this.handleOpenURL);
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
      <Loading
        loadingRef
        ref={(ref) => {
          _global.Loading = ref;
        }}
      />
      <Alert
        ref={(ref) => {
          _global.Alert = ref;
        }}
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
