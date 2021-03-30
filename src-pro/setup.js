import React, { PureComponent } from 'react';
import { UIManager, LogBox } from 'react-native';
import { PersistGate } from 'redux-persist/es/integration/react';
import { Provider } from 'react-redux';
import codePush from 'react-native-code-push';
import * as Sentry from '@sentry/react-native';
import { store, persistor } from './redux/store/store';
import AppNavigator from './app-navigator';
import { setFont } from '../utlis/index';
import { ChangeState } from './redux/actions/codepush';
import { Loading, Alert } from './component';
import { _global } from '../utlis/global/global';

const DSN_SENTRY = 'https://fc0d9122795948ee93aa4e34e28d776c@o486792.ingest.sentry.io/5544590';
Sentry.init({
  dsn: DSN_SENTRY,
  enableAutoSessionTracking: true,
  // Sessions close after app is 10 seconds in the background.
  sessionTrackingIntervalMillis: 10000,
});
console.disableYellowBox = true;

setFont('Quicksand-Regular');
class App extends PureComponent {
  constructor(props) {
    super(props);

    UIManager.setLayoutAnimationEnabledExperimental
      && UIManager.setLayoutAnimationEnabledExperimental(true);

    this.state = {
      store,
    };

    this.CodePushState = {
      status: codePush.SyncStatus.CHECKING_FOR_UPDATE,
      progress: 0,
    };
  }

  codePushStatusDidChange(status) {
    this.CodePushState = {
      ...this.CodePushState,
      status,
    };

    if (this.state.store) {
      this.state.store.dispatch(ChangeState(this.CodePushState));
    }
  }

  codePushDownloadDidProgress(progress) {
    this.CodePushState = {
      ...this.CodePushState,
      progress:
        progress
        && progress.receivedBytes
        && progress.totalBytes
        && progress.totalBytes != 0
          ? (progress.receivedBytes * 100) / progress.totalBytes
          : 0,
    };

    if (this.state.store) {
      this.state.store.dispatch(ChangeState(this.CodePushState));
    }
  }

  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <AppNavigator />
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
        </PersistGate>
      </Provider>
    );
  }
}
export default codePush({
  checkFrequency: codePush.CheckFrequency.ON_APP_RESUME,
  installMode: codePush.InstallMode.ON_NEXT_RESTART,
})(App);
