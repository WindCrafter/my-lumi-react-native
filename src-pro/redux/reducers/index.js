// Imports: Dependencies
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';

// Imports: Reducers
import AsyncStorage from '@react-native-community/async-storage';
import authen from './authen';
import admin from './admin';
import check from './check';
import user from './user';
import codepush from './codepush';

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
    'userID',
    'fullname',
    'phone_number',
    'birthday',
    'email',
    'avatar',
    'address',
    'team_id',
    'staff_type',
    'team',
    'identity_number',
    'bank_account',
    'bank_name',
    'user_id',
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
  whitelist: ['assign, demoMode'],
};

const rootReducer = combineReducers({
  authen: persistReducer(authPersistConfig, authen),
  admin,
  check: persistReducer(checkPersist, check),
  user: persistReducer(userPersist, user),
  codepush,
});

// Exports
export default rootReducer;
