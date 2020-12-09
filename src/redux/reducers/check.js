import * as types from '../types';
import moment from 'moment';

const initialState = {
  checked: false,
  source: '',
  dateCheckIn: '',
  timeCheckIn: '--:--',
  timeCheckOut: '--:--',
  type: 'in',
  listTakeLeave: '',
  historyAdminTakeLeave: '',
  dataLateEarly: '',
  dataManagerLateEarly: '',
};

export default function check(state = initialState, action) {
  switch (action.type) {
    case types.LIST_LATE_EARLY_SUCCESS:
      return {
        ...state,
        dataLateEarly: Array.isArray(state.dataLateEarly)
          ? [...state.dataLateEarly, ...action.payload]
          : action.payload,
      };
    case types.LIST_MANAGER_LATE_EARLY_SUCCESS:
      return {
        ...state,
        dataManagerLateEarly: Array.isArray(state.dataManagerLateEarly)
          ? [...state.dataManagerLateEarly, ...action.payload]
          : action.payload,
      };
    case types.GET_LIST_TAKE_LEAVE_SUCCESS:
      return {
        ...state,
        historyTakeLeave: action.payload,
      };
    case types.GET_LIST_ADMIN_TAKE_LEAVE_SUCCESS:
      return {
        ...state,
        historyAdminTakeLeave: action.payload,
      };
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
        checked: true,
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
      };
    case types.SWITCH_TO_CHECKIN:
      return {
        ...state,
      };
    case types.CHANGETO_CHECKIN:
      return {
        ...state,
        type: 'in',
      };
    case types.CHANGETO_CHECKOUT:
      return {
        ...state,
        type: 'out',
      };
    case types.RESET_CHECK:
      return {
        ...state,
        dateCheckIn: '',
        timeCheckIn: '--:--',
        timeCheckOut: '--:--',
        type: 'in',
      };
    case types.REMOVE_LIST:
      return {
        ...state,
        dataLateEarly: '',
        dataManagerLateEarly: '',
      };
    default:
      return state;
  }
}
