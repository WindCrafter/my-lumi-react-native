import { all, fork } from 'redux-saga/effects';
import * as authen from './authen';
import * as check from './check';
import * as user from './user';

export function* rootSaga() {
  yield all([
    ...Object.values(authen),
    ...Object.values(check),
    ...Object.values(user),
  ].map(fork));
}
