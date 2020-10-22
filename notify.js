// import React, {PureComponent, useEffect} from 'react';
// import {Linking} from 'react-native';
// import {connect} from 'react-redux';
// import OneSignal from 'react-native-onesignal';

// function Notify()  {
//   const onIds = (device) => {
//     console.log('Device info: ', device);
//   };
//   OneSignal.setLogLevel(6, 0);
//   OneSignal.init('26be080e-5b50-4fb5-b375-0271163c8548', {
//     kOSSettingsKeyAutoPrompt: true,
//     kOSSettingsKeyInAppLaunchURL: false,
//     kOSSettingsKeyInFocusDisplayOption: 2,
//   });
//   OneSignal.inFocusDisplaying(2);
//   OneSignal.promptForPushNotificationsWithUserResponse(myiOSPromptCallback);

//   OneSignal.addEventListener('received', onReceived);
//   OneSignal.addEventListener('opened', onOpened);
//   OneSignal.addEventListener('ids', onIds);
//   useEffect(() => {
//     OneSignal.removeEventListener('received', onReceived);
//     OneSignal.removeEventListener('opened', onOpened);
//     // OneSignal.removeEventListener('ids', onIds);
//   });
//   function myiOSPromptCallback(permission) {
//     // do something with permission value
//   }
//   const onReceived = (notification) => {
//     console.log('Notification received: ', notification);
//   };
//   const onOpened = (openResult) => {
//     console.log('Message: ', openResult.notification.payload.body);
//     console.log('Data: ', openResult.notification.payload.additionalData);
//     console.log('isActive: ', openResult.notification.isAppInFocus);
//     console.log('openResult: ', openResult);
//   };
//   return null;
// };
// const mapDispatchToProps = {
//     // addUserIdDevice,
//     // notificationReadNotifi
// };

// const mapStateToProps = (state) => {
//     return {
//         // notificationDevice: state.config.notificationDevice,
//         // notify: state.config.notify
//     };
// };
// export default connect(mapStateToProps, mapDispatchToProps)(Notify);
