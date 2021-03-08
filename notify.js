import React, { PureComponent, useEffect } from 'react';
import { Linking } from 'react-native';
import { connect } from 'react-redux';
import OneSignal from 'react-native-onesignal';
import { getOneSignalID } from './src-pro/redux/actions/authen';
import { getOneSignalID as getOneSignalIDserverDev } from './src-dev/redux/actions/authen';

const Schema = 'lumihr://';

function Notify(props) {
  const {
    token,
    oneSignalID,
    getOneSignalId,
  } = props;
  const onIds = (device) => {
    !oneSignalID && getOneSignalId(device.userId);
    console.log('-----------device', oneSignalID);
    console.log('-----------device ID', device.userId);
  };
  const onReceived = (notification) => {
    console.log('Notification received: ', notification);
  };
  const onOpened = (openResult, device) => {
    // console.log('Message: ', openResult.notification.payload.body);
    // console.log('Data: ', openResult.notification.payload.additionalData.type);
    // console.log('isActive: ', openResult.notification.isAppInFocus);
    // console.log('openResult: ', openResult);
    let Url = `${Schema}UserStack`;
    setTimeout(() => {
      console.log('openURL succcess--->', openResult);
      if (openResult.notification.payload
        && openResult.notification.payload.additionalData
        && openResult.notification.payload.additionalData.type
      ) {
        if (openResult.notification.payload.additionalData.type == 1) {
          if (openResult.notification.payload.additionalData.approved == 1) {
            Url = `${Schema}UserStack/ApproveAll?page=2`;
          } else if (
            openResult.notification.payload.additionalData.approved == 2
          ) {
            Url = `${Schema}UserStack/listOT`;
          }
        }

        if (openResult.notification.payload.additionalData.type == 2) {
          if (openResult.notification.payload.additionalData.approved == 1) {
            Url = `${Schema}UserStack/ApproveAll?page=0`;
          } else if (
            openResult.notification.payload.additionalData.approved == 2
          ) {
            Url = `${Schema}UserStack/HistoryBreak`;
          }
        }

        if (openResult.notification.payload.additionalData.type == 3) {
          if (openResult.notification.payload.additionalData.approved == 1) {
            Url = `${Schema}UserStack/ApproveAll?page=1`;
          } else if (
            openResult.notification.payload.additionalData.approved == 2
          ) {
            Url = `${Schema}UserStack/HistoryLate`;
          }
        }
        if (openResult.notification.payload.additionalData.type == 4) {
          if (openResult.notification.payload.additionalData.approved == 2) {
            Url = `${Schema}UserStack/ApproveAll?page=3`;
          } else if (
            openResult.notification.payload.additionalData.approved == 1
          ) {
            Url = `${Schema}UserStack/Notify`;
          }
        }
        if (openResult.notification.payload.additionalData.type == 5) {
          if (openResult.notification.payload.additionalData.approved == 2) {
            Url = `${Schema}UserStack/ApproveAll?page=3`;
          } else if (
            openResult.notification.payload.additionalData.approved == 1
          ) {
            Url = `${Schema}UserStack/Notify`;
          }
        }
        if (openResult.notification.payload.additionalData.type == 6) {
          Url = `${Schema}UserStack/History`;
        }
        if (openResult.notification.payload.additionalData.type == 7) {
          Url = `${Schema}UserStack/History`;
        }
        if (openResult.notification.payload.additionalData.type == 8) {
          Url = `${Schema}UserStack`;
        }
        if (openResult.notification.payload.additionalData.type == 9) {
          Url = `${Schema}UserStack/KPI`;
        }
        if (openResult.notification.payload.additionalData.type == 10) {
          Url = `${Schema}UserStack`;
        }
        if (openResult.notification.payload.additionalData.type == 50) {
          Url = `${Schema}UserStack/listOT`;
        }
        if (openResult.notification.payload.additionalData.type == 51) {
          Url = `${Schema}UserStack/HistoryBreak`;
        }
        if (openResult.notification.payload.additionalData.type == 52) {
          Url = `${Schema}UserStack/HistoryLate`;
        }
        if (openResult.notification.payload.additionalData.type == 99) {
          Url = `${Schema}UserStack/TabbarUser/BookSchedule`;
        }
      }

      // switch (openResult.notification.payload.additionalData.type) {
      //   case 1:
      //   case '1':
      //     Url = `${Schema}UserStack/listOT`;
      //     break;
      //   case 2:
      //   case '2':
      //     Url = `${Schema}UserStack/HistoryBreak`;
      //     break;
      //   case 3:
      //   case '3':
      //     Url = `${Schema}UserStack/HistoryLate`;
      //     break;
      //   case 4:
      //   case '4':
      //     Url = `${Schema}UserStack/ApproveOT`;
      //     break;
      //   case 5:
      //   case '5':
      //     Url = `${Schema}UserStack/ApproveBreak`;
      //     break;
      //   case 6:
      //   case '6':
      //     Url = `${Schema}UserStack/ApproveLate`;
      //     break;
      //   // case 1:
      //   //   Url = `${Schema}UserStack/TabbarUser/AllNotify`;
      //   //   break;
      //   // case 1:
      //   //   Url = `${Schema}UserStack/TabbarUser/AllNotify`;
      //   //   break;
      //   default:
      //     Url = `${Schema}UserStack/TabbarUser/Home`;

      //     break;
      // }
      console.log('Url', Url);
      Linking.openURL(Url)
        .then((res) => {})
        .catch((error) => {
          console.log('openURL error--->', error);
        });
    }, 250);
  };
  function myiOSPromptCallback(permission) {}
  OneSignal.init('26be080e-5b50-4fb5-b375-0271163c8548', {
    kOSSettingsKeyAutoPrompt: true,
    kOSSettingsKeyInAppLaunchURL: false,
  });

  OneSignal.setLogLevel(6, 0);
  OneSignal.inFocusDisplaying(2);
  OneSignal.promptForPushNotificationsWithUserResponse(myiOSPromptCallback);

  useEffect(() => {
    OneSignal.addEventListener('received', onReceived);
    OneSignal.addEventListener('opened', onOpened);
    OneSignal.addEventListener('ids', onIds);
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
  // addUserIdDevice,
  getOneSignalId:
    window.typeServer === 'product' ? getOneSignalID : getOneSignalIDserverDev,
  // notificationReadNotifi
};

const mapStateToProps = (state) => {
  return {
    // notificationDevice: state.config.notificationDevice,
    // notify: state.config.notify
    token: state.authen.token,
    oneSignalID: state.authen.oneSignalID,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Notify);
