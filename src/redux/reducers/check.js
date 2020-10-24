import * as types from '../types';
import moment from 'moment';

const initialState = {
  checked: false,
  source: '',
  dateCheckIn: '',
  timeCheckIn: '--:--',
  timeCheckOut: '--:--',
  switchTo: '',
  type: 'in',
};

export default function check(state = initialState, action) {
  switch (action.type) {
    case types.CHECK_IN_SUCCESS:
      return {
        ...state,
        type: 'out',
        dateCheckIn: moment(new Date()),
        timeCheckIn: moment(new Date()).format('HH:mm'),
      };
    case types.CHECK_OUT_SUCCESS:
      return {
        ...state,
        type: 'in',
        timeCheckOut: moment(new Date()).format('HH:mm'),
      };
    case types.CREATE_QR_SUCCESS:
      return {
        ...state,
        source: action.payload,
      };
    case types.CHECK_IN_FAILED:
      return {
        ...state,
        switchTo: true,
      };
    case types.SWITCH_TO_CHECKIN:
      return {
        ...state,
        switchTo: false,
      };
    case types.RESET_CHECK:
      return {
        ...state,
        dateCheckIn: '',
        timeCheckIn: '--:--',
        timeCheckOut: '--:--',
      };
    default:
      return state;
  }
}
