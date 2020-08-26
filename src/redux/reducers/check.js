import * as types from '../types';

const initialState = {
  checked: false,
};

export default function check(state = initialState, action) {
  switch (action.type) {
    case types.CHECK_IN_SUCCESS:
      return {
        ...state,
      };
    default:
      return state;
  }
}
