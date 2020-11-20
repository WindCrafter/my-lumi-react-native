/**
 * Created by phongdt on Fri Feb 07 2020
 * Copyright (c) 2020 phongdt@lumi.biz
 */

import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {Linking, UIManager, LayoutAnimation} from 'react-native';
import {autoLogin, getDeviceId} from './src/redux/actions/authen';
import {resetCheck} from './src/redux/actions/check';
import Navigator from './src/navigator';
import {_global} from './utlis/global/global';
import LoadInital from './src/admin/screen/loadInitial';
import {Loading, Alert} from './src/component';
import DeviceInfo from 'react-native-device-info';
import Notify from './notify';

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
  } = props;
  const [loading, setLoading] = useState(true);
  let titleVersion = `${DeviceInfo.getVersion()}`;
  useEffect(() => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
    dateCheckIn < new Date() ? resetCheck() : null;
    deviceId === '' ? getDeviceId(`${DeviceInfo.getUniqueId()}`) : null;
    setTimeout(async function changeLoading() {
      token ? (autoLoginStatus ? autoLogin() : null) : null;
      setLoading(false);
    }, 50);
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
    deviceId: state.authen.deviceId,
    dateCheckIn: state.authen.check,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AppNavigator);
