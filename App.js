import React, {useEffect} from 'react';
import {PersistGate} from 'redux-persist/es/integration/react';
import {Provider} from 'react-redux';
import codePush from 'react-native-code-push';
import {store, persistor} from './src/redux/store/store';
import AppNavigator from './app-navigator';
console.disableYellowBox = true;
import {setFont} from './utlis/index';
import {ChangeState} from './src/redux/actions/codepush';
import { LogBox } from 'react-native';


setFont('Quicksand-Regular');
const App = () => {
  const CodePushState = {
    status: codePush.SyncStatus.CHECKING_FOR_UPDATE,
    progress: 0,
  };
  const codePushStatusDidChange = (status) => {
    CodePushState.status = status;
    ChangeState(CodePushState);
  };
  const codePushDownloadDidProgress = (progress) => {
    CodePushState.progress =
      progress &&
      progress.receivedBytes &&
      progress.totalBytes &&
      progress.totalBytes !== 0
        ? Math.floor((progress.receivedBytes * 100) / progress.totalBytes)
        : 0;
    console.log(progress);
    ChangeState(CodePushState);
  };
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
    codePush.notifyAppReady();
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
    return function cleanup() {
      codePushStatusDidChange();
      codePushDownloadDidProgress();
    };
  });
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AppNavigator />
      </PersistGate>
    </Provider>
  );
};
export default codePush({
  checkFrequency: codePush.CheckFrequency.ON_APP_RESUME,
  installMode: codePush.InstallMode.ON_NEXT_RESTART,
})(App);
