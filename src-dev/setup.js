import React, {PureComponent} from 'react';
import {UIManager} from 'react-native';
import {PersistGate} from 'redux-persist/es/integration/react';
import {Provider} from 'react-redux';
import codePush from 'react-native-code-push';
import {store, persistor} from './redux/store/store';
import AppNavigator from './app-navigator';
import {setFont} from '../utlis/index';
import {ChangeState} from './redux/actions/codepush';
import {LogBox} from 'react-native';
import * as Sentry from '@sentry/react-native';
console.disableYellowBox = true;
const DSN_SENTRY =
  'https://fc0d9122795948ee93aa4e34e28d776c@o486792.ingest.sentry.io/5544590';
Sentry.init({
  dsn: DSN_SENTRY,
  enableAutoSessionTracking: true,
  // Sessions close after app is 10 seconds in the background.
  sessionTrackingIntervalMillis: 10000,
});
setFont('Quicksand-Regular');

class App extends PureComponent {
  constructor(props) {
    super(props);
    UIManager.setLayoutAnimationEnabledExperimental &&
      UIManager.setLayoutAnimationEnabledExperimental(true);

    this.state = {
      store: store,
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
        progress &&
        progress.receivedBytes &&
        progress.totalBytes &&
        progress.totalBytes != 0
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
        </PersistGate>
      </Provider>
    );
  }
}
export default codePush({
  checkFrequency: codePush.CheckFrequency.ON_APP_RESUME,
  installMode: codePush.InstallMode.ON_NEXT_RESTART,
  updateDialog: {
    title: 'Cập nhật phiên bản mới ',
    mandatoryContinueButtonLabel: 'Tiếp tục',
    mandatoryUpdateMessage:
      'Vui lòng nhấn Tiếp tục để cập nhật phiên bản mới nhất. Ứng dụng sẽ tự động khởi động lại sau khi tải hoàn tất.',
  },
  allowRestart: true,
})(App);
