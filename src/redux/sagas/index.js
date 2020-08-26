/* eslint-disable prettier/prettier */
import { all, fork } from 'redux-saga/effects';
import * as authen from './authen';
import * as admin from './admin';
import * as check from './check';

export function* rootSaga() {
  yield all([
    ...Object.values(authen),
    ...Object.values(admin),
    ...Object.values(check),
  ].map(fork));
}
