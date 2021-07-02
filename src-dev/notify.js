import React, { PureComponent, useEffect } from 'react';
import { Linking } from 'react-native';
import { connect } from 'react-redux';
import OneSignal from 'react-native-onesignal';
import { getOneSignalID } from './redux/actions/authen';
import { URL } from '../utlis/connection/url';
import { _POST } from '../utlis/connection/api';

const Schema = 'lumihr://';

function Notify(props) {
  const { token, oneSignalID, getOneSignalId, user_id } = props;
  const onIds = device => {
    if (oneSignalID != device.userId) {
      getOneSignalId(device.userId);
    }
    console.log('-----------device ID', device.userId);
  };
  const onReceived = notification => {
    console.log('Notification received: ', notification);
    console.log('URL notify now:', url);
  };
  const url = `${URL.NOTIFICATION_READ}`;
  const onOpened = (openResult, device) => {
    // console.log('Message: ', openResult.notification.payload.body);
    // console.log('Data: ', openResult.notification.payload.additionalData.type);
    // console.log('isActive: ', openResult.notification.isAppInFocus);
    // console.log('openResult: ', openResult);
    let Url = `${Schema}UserStack`;
    const type = openResult.notification.payload.additionalData.type;
    const approved = openResult.notification.payload.additionalData.approved;
    type !== 99
      && type !== 60
      && type !== 61
      && _POST(
        url,
        {
          id: openResult.notification.payload.additionalData.notification_ids
            && openResult.notification.payload.additionalData.notification_ids[
              user_id
            ],
        },
        token,
        false,
      );
    setTimeout(() => {
      console.log('openURL succcess--->', openResult);
      if (
        openResult.notification.payload
        && openResult.notification.payload.additionalData
        && type
      ) {
        if (type == 1) {
          if (approved == 1) {
            Url = `${Schema}UserStack/ApproveAll?page=2`;
          } else if (approved == 2) {
            Url = `${Schema}UserStack/listOT`;
          }
        }
        if (type == 2) {
          if (approved == 1) {
            Url = `${Schema}UserStack/ApproveAll?page=0`;
          } else if (approved == 2) {
            Url = `${Schema}UserStack/HistoryBreak`;
          }
        }
        if (type == 3) {
          if (approved == 1) {
            Url = `${Schema}UserStack/ApproveAll?page=1`;
          } else if (approved == 2) {
            Url = `${Schema}UserStack/HistoryLate`;
          }
        }
        if (type == 4) {
          if (approved == 2) {
            Url = `${Schema}UserStack/ApproveAll?page=4`;
          } else if (approved == 1) {
            Url = `${Schema}UserStack/Notify`;
          }
        }
        if (type == 5) {
          if (approved == 2) {
            Url = `${Schema}UserStack/ApproveAll?page=4`;
          } else if (approved == 1) {
            Url = `${Schema}UserStack/Notify`;
          }
        }
        if (type == 6) {
          Url = `${Schema}UserStack/History`;
        }
        if (type == 7) {
          Url = `${Schema}UserStack/History`;
        }
        if (type == 8) {
          Url = `${Schema}UserStack/Notify`;
        }
        if (type == 9) {
          Url = `${Schema}UserStack/KPI`;
        }
        if (type == 10) {
          Url = `${Schema}UserStack/Notify`;
        }
        if (type == 11) {
          Url = `${Schema}UserStack/ApproveAll?page=3`;
        }
        if (type == 12) {
          Url = `${Schema}UserStack/HistoryWFH`;
        }
        if (type == 27) {
          Url = `${Schema}UserStack/DetailEventByNotify?id=${openResult.notification.payload.additionalData.eventId}`;
        }
        if (type == 99) {
          Url = `${Schema}UserStack/TabbarUser/BookSchedule`;
        }
        if (type == 98) {
          Url = `${Schema}UserStack/TabbarUser/Home`;
        }
        if (type == 50) {
          Url = `${Schema}UserStack/listOT`;
        }
        if (type == 51) {
          Url = `${Schema}UserStack/HistoryBreak`;
        }
        if (type == 52) {
          Url = `${Schema}UserStack/HistoryLate`;
        }
        if (type == 53) {
          Url = `${Schema}UserStack/History`;
        }
        if (type == 54) {
          Url = `${Schema}UserStack/History`;
        }
        if (type == 56) {
          Url = `${Schema}UserStack/Notify`;
        }
        if (type == 57) {
          Url = `${Schema}UserStack/HistoryWFH`;
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
        .then(res => {})
        .catch(error => {
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
  getOneSignalId: getOneSignalID,
  // notificationReadNotifi
};

const mapStateToProps = state => {
  return {
    // notificationDevice: state.config.notificationDevice,
    // notify: state.config.notify
    token: state.authen.token,
    oneSignalID: state.authen.oneSignalID,
    user_id: state.authen.user_id,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Notify);
