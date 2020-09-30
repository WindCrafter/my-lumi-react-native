import * as types from '../types';

const initialState = {
    authenticated: false,
    isLogin: false,
    currentUser: {},
    loginSuccess: false,
    token: '',
    changePass: false,
    autoLoginStatus: false,
};

export default function user(state = initialState, action) {
    switch (action.type) {
        case types.GET_LIST_USERS_SUCCESS:
            return {
                ...state,
                currentUser: action.payload,
            };
        default:
            return state;
    }
}
