/* eslint-disable prettier/prettier */
import { all, fork } from 'redux-saga/effects';
import * as authen from './authen';

export function* rootSaga() {
  yield all([
    ...Object.values(authen),
  ].map(fork));
}
