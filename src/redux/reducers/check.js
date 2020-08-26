import * as types from '../types';

const initialState = {
  checked: false,
  source: '',
};

export default function check(state = initialState, action) {
  switch (action.type) {
    case types.CHECK_IN_SUCCESS:
      return {
        ...state,
      };
    case types.CREATE_QR_SUCCESS:
      return {
        ...state,
        source: action.payload,
      };
    default:
      return state;
  }
}
