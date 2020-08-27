// Imports: Dependencies
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';

// Imports: Reducers
import authen from './authen';
import AsyncStorage from '@react-native-community/async-storage';
import admin from './admin';
import check from './check';
// Redux: Root Reducer
const authPersistConfig = {
  key: 'authen',
  storage: AsyncStorage,
  whitelist: [
    'token',
    'autoLoginStatus',
    'changePass',
    'deviceId',
    'role',
    'currentUser',
    'nameUser',
    'phoneNumber',
    'emailUser',
  ],
};

const rootReducer = combineReducers({
  authen: persistReducer(authPersistConfig, authen),
  admin: admin,
  check: check,
});

// Exports
export default rootReducer;
