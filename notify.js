import React, {PureComponent, useEffect} from 'react';
import {Linking} from 'react-native';
import {connect} from 'react-redux';
import OneSignal from 'react-native-onesignal';
import {addUserIdDevice} from './src/redux/actions/user.js';
const Schema = 'lumihr://';

function Notify(props) {
  const {token, addUserIdDevice, deviceIds} = props;
  const onIds = (device) => {
    console.log('Device info: ', device.userId);
    const data = {
      deviceId: device.userId,
      token: token,
    };
    console.log(data);
    if (!(deviceIds.indexOf(device.userId) > -1)) {
      addUserIdDevice(data);
      console.log('Da them thiet bi');
    }
    console.log('-----------device', deviceIds);
    console.log('-----------device ID', device.userId);
  };
  const onReceived = (notification) => {
    console.log('Notification received: ', notification);
  };
  const onOpened = (openResult, device) => {
    console.log('Message: ', openResult.notification.payload.body);
    console.log('Data: ', openResult.notification.payload.additionalData);
    console.log('isActive: ', openResult.notification.isAppInFocus);
    console.log('openResult: ', openResult);
    setTimeout(() => {
      console.log('openURL succcess--->');

      Linking.openURL(`${Schema}UserStack/TabbarUser/TestNotify`)
        .then((res) => {})
        .catch((error) => {
          console.log('openURL error--->', error);
        });
    }, 650);
  };
  function myiOSPromptCallback(permission) {
    // do something with permission value
  }
  OneSignal.init('26be080e-5b50-4fb5-b375-0271163c8548', {
    kOSSettingsKeyAutoPrompt: true,
    kOSSettingsKeyInAppLaunchURL: false,
  });
  OneSignal.addEventListener('received', onReceived);
  OneSignal.addEventListener('opened', onOpened);
  OneSignal.addEventListener('ids', onIds);

  OneSignal.setLogLevel(6, 0);

  OneSignal.inFocusDisplaying(2);
  OneSignal.promptForPushNotificationsWithUserResponse(myiOSPromptCallback);

  useEffect(() => {
    // const onIds = (device) => {
    //   console.log('Device info: ', device.userId);
    //   const data = {
    //     deviceId: device.userId,
    //     token: token,
    //   };
    //   console.log(token);
    //   addUserIdDevice(data);
    // };
    return function cleanup() {
      OneSignal.removeEventListener('received', onReceived);
      OneSignal.removeEventListener('opened', onOpened);
      OneSignal.removeEventListener('ids', onIds);
    };
  });
  return null;
}
const mapDispatchToProps = {
  addUserIdDevice,
  // notificationReadNotifi
};

const mapStateToProps = (state) => {
  return {
    // notificationDevice: state.config.notificationDevice,
    // notify: state.config.notify
    token: state.authen.token,
    deviceIds: state.authen.userProfile.deviceIds,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Notify);
