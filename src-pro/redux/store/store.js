/* eslint-disable prettier/prettier */
import AsyncStorage from '@react-native-community/async-storage';
import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import { persistStore, persistReducer } from 'redux-persist';
import createSagaMiddleware from 'redux-saga';
import { rootSaga } from '../sagas/index';

import rootReducer from '../reducers/index';

const sagaMiddleware = createSagaMiddleware();

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: [],
  blacklist: [],
};

// const persistAuthen = {
//   key: 'authen',
//   storage: AsyncStorage,
//   whitelist: ['token'],
//   blacklist: [],
// };

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(persistedReducer, applyMiddleware(sagaMiddleware, createLogger()));
sagaMiddleware.run(rootSaga);

const persistor = persistStore(store);

export { store, persistor };
