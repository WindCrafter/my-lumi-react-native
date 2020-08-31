import * as types from '../types';

const initialState = {
  checked: false,
  source: '',
  dateCheckIn: '',
  timeCheckIn: '',
  dateCheckOut: '',
  timeCheckOut: '',
};

export default function check(state = initialState, action) {
  switch (action.type) {
    case types.CHECK_IN_SUCCESS:
      return {
        ...state,
        dateCheckIn:
          action.payload.type === 'in'
            ? action.payload.date
            : state.dateCheckIn,
        timeCheckIn:
          action.payload.type === 'in'
            ? action.payload.time
            : state.timeCheckIn,
        dateCheckOut:
          action.payload.type === 'out'
            ? action.payload.date
            : state.dateCheckOut,
        timeCheckOut:
          action.payload.type === 'out'
            ? action.payload.time
            : state.timeCheckOut,
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
