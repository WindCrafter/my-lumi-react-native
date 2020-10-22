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
    default:
      return state;
  }
}
