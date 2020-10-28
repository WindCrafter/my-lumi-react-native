// Imports: Dependencies
import {combineReducers} from 'redux';
import {persistReducer} from 'redux-persist';

// Imports: Reducers
import authen from './authen';
import AsyncStorage from '@react-native-community/async-storage';
import admin from './admin';
import check from './check';
import user from './user';

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
    'userProfile',
    'roleInfo',
    'oneSignalID',
  ],
};

const checkPersist = {
  key: 'check',
  storage: AsyncStorage,
  whitelist: [
    'dateCheckIn',
    'timeCheckIn',
    'dateCheckOut',
    'timeCheckOut',
    'type',
  ],
};

const userPersist = {
  key: 'user',
  storage: AsyncStorage,
  whitelist: ['assign'],
};

const rootReducer = combineReducers({
  authen: persistReducer(authPersistConfig, authen),
  admin: admin,
  check: persistReducer(checkPersist, check),
  user: persistReducer(userPersist, user),
});

// Exports
export default rootReducer;
