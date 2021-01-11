import * as types from '../types';

export const updateProfile = (data) => {
  return {
    type: types.UPDATE_PROFILE,
    payload: data,
  };
};

export const updateProfileSuccess = (data) => {
  return {
    type: types.UPDATE_PROFILE_SUCCESS,
    payload: data,
  };
};

export const updateProfileFailed = () => {
  return {
    type: types.UPDATE_PROFILE_FAILED,
  };
};

export const getListUsers = (data) => {
  return {
    type: types.GET_LIST_USERS,
    payload: data,
  };
};

export const getListUsersSuccess = (data) => {
  return {
    type: types.GET_LIST_USERS_SUCCESS,
    payload: data,
  };
};

export const getListUsersFailed = () => {
  return {
    type: types.GET_LIST_USERS_FAILED,
  };
};

export const addMember = (data) => {
  return {
    type: types.ADD_MEMBER,
    payload: data,
  };
};

export const kickMember = (data) => {
  return {
    type: types.KICK_MEMBER,
    payload: data,
  };
};

export const clearMember = (data) => {
  return {
    type: types.CLEAR_MEMBER,
  };
};
export const addUserIdDevice = (data) => {
  return {
    type: types.ADD_USER_ID_DEVICE,
    payload: data,
  };
};
export const addUserIdDeviceSuccess = (data) => {
  return {
    type: types.ADD_USER_ID_DEVICE_SUCCESS,
    payload: data,
  };
};

export const addUserIdDeviceFailed = () => {
  return {
    type: types.ADD_USER_ID_DEVICE_FAILED,
  };
};

export const removeUserIdDevice = (data) => {
  return {
    type: types.REMOVE_USER_ID_DEVICE,
    payload: data,
  };
};

export const removeUserIdDeviceSuccess = (data) => {
  return {
    type: types.REMOVE_USER_ID_DEVICE_SUCCESS,
    payload: data,
  };
};

export const removeUserIdDeviceFailed = () => {
  return {
    type: types.REMOVE_USER_ID_DEVICE_FAILED,
  };
};

export const addAssign = (data) => {
  return {
    type: types.ADD_ASSIGN,
    payload: data,
  };
};

export const kickAssign = (data) => {
  return {
    type: types.KICK_ASSIGN,
    payload: data,
  };
};

export const getListAssign = (data) => {
  return {
    type: types.GET_LIST_ASSIGN,
    payload: data,
  };
};

export const getListAssignSuccess = (data) => {
  return {
    type: types.GET_LIST_ASSIGN_SUCCESS,
    payload: data,
  };
};

export const getListAssignFailed = () => {
  return {
    type: types.GET_LIST_ASSIGN_FAILED,
  };
};

export const getListTeams = (data) => {
  return {
    type: types.GET_LIST_TEAMS,
    payload: data,
  };
};

export const getListTeamsSuccess = (data) => {
  return {
    type: types.GET_LIST_TEAMS_SUCCESS,
    payload: data,
  };
};

export const getListTeamsFailed = () => {
  return {
    type: types.GET_LIST_TEAMS_FAILED,
  };
};
export const getListNotifys = (data) => {
  return {
    type: types.GET_LIST_NOTIFYS,
    payload: data,
  };
};

export const getListNotifysSuccess = (data) => {
  return {
    type: types.GET_LIST_NOTIFYS_SUCCESS,
    payload: data,
  };
};

export const getListNotifysFailed = () => {
  return {
    type: types.GET_LIST_NOTIFYS_FAILED,
  };
};

export const getListCheck = (data) => {
  return {
    type: types.GET_LIST_CHECK,
    payload: data,
  };
};

export const getListCheckSuccess = (data) => {
  return {
    type: types.GET_LIST_CHECK_SUCCESS,
    payload: data,
  };
};

export const getListCheckFailed = () => {
  return {
    type: types.GET_LIST_CHECK_FAILED,
  };
};

export const changeDemoMode = () => {
  return {
    type: types.CHANGE_DEMO_MODE,
  };
};
export const bookRoom = (data) => {
  return {
    type: types.BOOK_ROOM,
    payload: data,
  };
};
export const listRoom = (data) => {
  return {
    type: types.LIST_ROOM,
    payload: data,
  };
};
export const listRoomSuccess = (data) => {
  return {
    type: types.LIST_ROOM_SUCCESS,
    payload: data,
  };
};

export const getKPI = (data) => {
  return {
    type: types.GET_KPI,
    payload: data,
  };
};

export const getKPISuccess = (data) => {
  return {
    type: types.GET_KPI_SUCCESS,
    payload: data,
  };
};

export const confirmKpi = (data) => {
  return {
    type: types.CONFIRM_KPI,
    payload: data,
  };
};

export const getHoliday = (data) => {
  return {
    type: types.GET_HOLIDAY,
    payload: data,
  };
};

export const getHolidaySuccess = (data) => {
  return {
    type: types.GET_HOLIDAY_SUCCESS,
    payload: data,
  };
};

export const getWorkdayToday = (data) => {
  return {
    type: types.GET_WORKDAY_TODAY,
    payload: data,
  };
};

export const setStatusAdLate = (data) => {
  return {
    type: types.SET_STATUS_AD_LATE,
    payload: data,
  };
};
export const setStatusUserLate = (data) => {
  return {
    type: types.SET_STATUS_USER_LATE,
    payload: data,
  };
};
export const setStatusAdBreak = (data) => {
  return {
    type: types.SET_STATUS_AD_BREAK,
    payload: data,
  };
};
export const setStatusUserBreak = (data) => {
  return {
    type: types.SET_STATUS_USER_BREAK,
    payload: data,
  };
};
export const setStatusAdOT = (data) => {
  return {
    type: types.SET_STATUS_AD_OT,
    payload: data,
  };
};
export const setStatusUserOT = (data) => {
  return {
    type: types.SET_STATUS_USER_OT,
    payload: data,
  };
};
