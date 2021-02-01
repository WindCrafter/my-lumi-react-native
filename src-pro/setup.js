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
console.disableYellowBox = true;

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
})(App);
