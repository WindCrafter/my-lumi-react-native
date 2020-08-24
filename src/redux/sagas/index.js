/* eslint-disable prettier/prettier */
import { all, fork } from 'redux-saga/effects';
import * as authen from './authen';
import * as admin from './admin';

export function* rootSaga() {
  yield all([
    ...Object.values(authen),
    ...Object.values(admin),
  ].map(fork));
}
