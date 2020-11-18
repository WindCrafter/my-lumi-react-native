import * as types from '../types';

export function ChangeState(state) {
  return {
    type: types.CHANGE_STATE,
    payload: state,
  };
}
