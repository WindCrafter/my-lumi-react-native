import moment from 'moment';
import * as types from '../types';

const initialState = {
  checked: false,
  source: '',
  dateCheckIn: '',
  timeCheckIn: '--:--',
  timeCheckOut: '--:--',
  type: 'in',
  listTakeLeave: '',
  historyAdminTakeLeave: '',
  dataLateEarly: {},
  dataManagerLateEarly: {},
  dataManagerCheck: {},
  refreshing: false,
};

export default function check(state = initialState, action) {
  switch (action.type) {
    case types.LIST_LATE_EARLY:
      return {
        ...state,
        refreshing: !!action.payload.refreshing,
      };
    case types.LIST_LATE_EARLY_SUCCESS:
      return {
        ...state,
        dataLateEarly: action.payload.reload
          ? action.payload.data
          : [...state.dataLateEarly, ...action.payload.data],
        refreshing: false,
      };
    case types.LIST_MANAGER_LATE_EARLY:
      return {
        ...state,
        refreshing: !!action.payload.refreshing,
      };
    case types.LIST_MANAGER_LATE_EARLY_SUCCESS:
      return {
        ...state,
        dataManagerLateEarly: action.payload.reload
          ? action.payload.data
          : [...state.dataManagerLateEarly, ...action.payload.data],
        refreshing: false,
      };
    case types.APPROVE_LATE_EARLY_SUCCESS:
      return {
        ...state,
        dataManagerLateEarly: state.dataManagerLateEarly.map((item) => {
          return item.id === action.payload.id
            ? { ...item, status: action.payload.status }
            : item;
        }),
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
        dataLateEarly: {},
        dataManagerLateEarly: {},
        dataManagerCheck: {},
      };

      /// Duyet Cham cong tu xa
    case types.LIST_MANAGER_CHECK:
      return {
        ...state,
        refreshing: !!action.payload.refreshing,
      };
    case types.LIST_MANAGER_CHECK_SUCCESS:
      return {
        ...state,
        dataManagerCheck: action.payload.reload
          ? action.payload.data
          : [...state.dataManagerCheck, ...action.payload.data],
        refreshing: false,
      };
    case types.APPROVE_CHECK_SUCCESS:
      return {
        ...state,
        dataManagerCheck: state.dataManagerCheck.map((item) => {
          return item.id === action.payload.id
            ? { ...item, status: action.payload.status }
            : item;
        }),
      };
    default:
      return state;
  }
}
