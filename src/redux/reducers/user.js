import * as types from '../types';

const initialState = {
  authenticated: false,
  isLogin: false,
  currentUser: {},
  loginSuccess: false,
  token: '',
  changePass: false,
  autoLoginStatus: false,
  memberPicked: [],
  notificationDevice: {
    deviceIds: null,
  },
};

export default function user(state = initialState, action) {
  switch (action.type) {
    case types.GET_LIST_USERS_SUCCESS:
      return {
        ...state,
        currentUser: action.payload,
      };
    case types.ADD_MEMBER:
      return {
        ...state,
        memberPicked: [...state.memberPicked, ...action.payload],
      };
    case types.KICK_MEMBER:
      return {
        ...state,
        memberPicked: state.memberPicked.filter(
          (e) => !(e.id === action.payload.id),
        ),
      };
    case types.CLEAR_MEMBER:
      return {
        ...state,
        memberPicked: [],
      };
    case types.ADD_USER_ID_DEVICE:
      return {
        ...state,
        notificationDevice: {
          deviceIds:
            action.payload && action.payload.deviceIds
              ? action.payload.deviceIds
              : state.notificationDevice.deviceIds,
        },
      };
    case types.ADD_USER_ID_DEVICE_SUCCESS:
      return {
        ...state,
        notificationDevice: {
          deviceIds:
            action.payload && action.payload.deviceIds
              ? action.payload.deviceIds
              : state.notificationDevice.deviceIds,
        },
      };
    default:
      return state;
  }
}
