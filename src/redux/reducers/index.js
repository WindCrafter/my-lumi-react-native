// Imports: Dependencies
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';

// Imports: Reducers
import authen from './authen';
import AsyncStorage from '@react-native-community/async-storage';
import admin from './admin';
// Redux: Root Reducer
const authPersistConfig = {
  key: 'authen',
  storage: AsyncStorage,
  whitelist: ['token', 'autoLoginStatus', 'changePass'],
};

const rootReducer = combineReducers({
  authen: persistReducer(authPersistConfig, authen),
  admin: admin,
});

// Exports
export default rootReducer;