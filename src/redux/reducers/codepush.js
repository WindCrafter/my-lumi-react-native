import * as types from '../types';
const initialState = {
  status: -1,
  progress: 0,
};

export default function (state = initialState, action) {
  if (action.type === types.LOG_OUT) {
    return initialState;
  }

  if (action.type === types.CHANGE_STATE) {
    return action.payload;
  }

  return state;
}
