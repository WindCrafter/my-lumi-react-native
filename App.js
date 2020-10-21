import React, {useEffect} from 'react';
import {PersistGate} from 'redux-persist/es/integration/react';
import {Provider} from 'react-redux';
import OneSignal from 'react-native-onesignal';
import {store, persistor} from './src/redux/store/store';
import AppNavigator from './app-navigator';
console.disableYellowBox = true;

export default App = () => {
  OneSignal.setLogLevel(6, 0);
  OneSignal.init('26be080e-5b50-4fb5-b375-0271163c8548', {
    kOSSettingsKeyAutoPrompt: true,
    kOSSettingsKeyInAppLaunchURL: false,
    kOSSettingsKeyInFocusDisplayOption: 2,
  });
  OneSignal.inFocusDisplaying(2);
  OneSignal.promptForPushNotificationsWithUserResponse(myiOSPromptCallback);

  OneSignal.addEventListener('received', onReceived);
  OneSignal.addEventListener('opened', onOpened);
  OneSignal.addEventListener('ids', onIds);
  useEffect(() => {
    OneSignal.removeEventListener('received', onReceived);
    OneSignal.removeEventListener('opened', onOpened);
    OneSignal.removeEventListener('ids', onIds);
  });
  function myiOSPromptCallback(permission) {
    // do something with permission value
  }
  const onReceived = (notification) => {
    console.log('Notification received: ', notification);
  };
  const onOpened = (openResult) => {
    console.log('Message: ', openResult.notification.payload.body);
    console.log('Data: ', openResult.notification.payload.additionalData);
    console.log('isActive: ', openResult.notification.isAppInFocus);
    console.log('openResult: ', openResult);
  };
  const onIds=(device) => {
    console.log('Device info: ', device);
  }
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AppNavigator />
      </PersistGate>
    </Provider>
  );
};
