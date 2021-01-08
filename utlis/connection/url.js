export const URL = {
  LOCAL_HOST: 'https://api.lumier.lumi.com.vn',
  // LOCAL_HOST: 'https://6f008bd5aa0a.ngrok.io',

  // LOCAL_HOST: 'http://10.10.0.163:4000/backend',
  // LOCAL_HOST: 'http://10.10.1.14:4000/backend',
  LOGIN: '/site/login',
  REGISTER: '/site/register',
  CHANGE_PASS: '/site/reset-password',
  ADD_USER: '/admin/add-user',
  LIST_ROLES: '/user/list-roles',
  CHECK_IN: '/check-in/qr',
  CREATE_QR: '/admin/qr-code',
  GET_QR: '/admin/qr-code?date=',
  UPDATE_PROFILE: '/site/update-profile',
  CHECK_IN_WIFI: '/work-day/check-in',
  CHECK_OUT_WIFI: '/work-day/check-out',
  CHECK_IN_CODE: '/work-day/check-in-by-code',
  CHECK_OUT_CODE: '/work-day/check-out-by-code',
  LIST_USERS: '/users',

  //
  LATE_EARLY: '/late-early/create',
  LIST_LATE_EARLY: '/late-early/self-list',
  LIST_MANAGER_LATE_EARLY: '/late-early/manager-list',
  APPROVE_LATE_EARLY: '/late-early/approved-canceled',
  UPDATE_LATE_EARLY: '/late-early/update',
  DELETE_LATE_EARLY: '/late-early/delete',
  //

  //
  TAKE_LEAVE: '/take-leave/create',
  LIST_TAKE_LEAVE: '/take-leave/self-list',
  LIST_BY_ID_TAKE_LEAVE: '/take-leave/get-by-id',
  LIST_MANAGER_TAKE_LEAVE: '/take-leave/manager-list',
  APPROVE_TAKE_LEAVE: '/take-leave/approved-canceled',
  UPDATE_TAKE_LEAVE: '/take-leave/update',
  DELETE_TAKE_LEAVE: '/take-leave/delete',
  //

  OVERTIME: '/overtime/create',
  ADD_USERID_DEVICE: '/user/add-device-id',
  REMOVE_USERID_DEVICE: '/user/remove-device-id',
  GET_LIST_TEAMS: '/user/list-teams',
  GET_LIST_ASSIGN: '/user/list-assign',
  GET_LIST_NOTIFY: '/user/list-notify?page=',
  SET_STATUS_OVERTIME: '/user/change-status-overtime',
  SET_STATUS_BREAK: '/user/change-status-take-leave',
  SET_STATUS_LATE_EARLY: '/user/change-status-late-early',
  GET_LIST_CHECK: '/work-day/list',
  GET_PROFILE: '/site/get-profile',
  APPROVE_OVERTIME: '/overtime/approved-canceled',
  //
  GET_LIST_TAKE_LEAVE: '/take-leave/self-list',
  GET_LIST_ADMIN_TAKE_LEAVE: '/take-leave/manager-list',
  CONFIRM_DENY_TAKE_LEAVE: '/take-leave/approved-canceled',
  GET_LIST_OVERTIME: '/overtime/self-list',
  GET_LIST_OVERTIME_MANAGER: '/overtime/manager-list',
  //
  GET_SUMMARY: '/work-day/get-summary',

  //
  BOOK_ROOM: '/meeting/create',
  LIST_ROOM: '/meeting/list',

  GET_KPI: '/kpi/detail',
  CONFIRM_KPI: '/kpi/confirm',

  MEETING_MEMBERS: '/meeting/members',
  GET_NOTIFICATION: '/notification-user/list',
  GET_HOLIDAY: '/holiday/list',
  GET_WORKDAY_TODAY: '/work-day/get-by-date',
};

export const URL_STAGING = {
  // LOCAL_HOST: 'https://api.lumier.lumi.com.vn',
  LOCAL_HOST: 'https://staging-api.lumier.lumi.com.vn',
  // LOCAL_HOST: 'https://6f008bd5aa0a.ngrok.io',
  // LOCAL_HOST: 'http://10.10.0.163:4000/backend',
  // LOCAL_HOST: 'http://10.10.1.14:4000/backend',
  LOGIN: '/site/login',
  REGISTER: '/site/register',
  CHANGE_PASS: '/site/reset-password',
  ADD_USER: '/admin/add-user',
  LIST_ROLES: '/user/list-roles',
  CHECK_IN: '/check-in/qr',
  CREATE_QR: '/admin/qr-code',
  GET_QR: '/admin/qr-code?date=',
  UPDATE_PROFILE: '/site/update-profile',
  CHECK_IN_WIFI: '/work-day/check-in',
  CHECK_OUT_WIFI: '/work-day/check-out',
  CHECK_IN_CODE: '/work-day/check-in-by-code',
  CHECK_OUT_CODE: '/work-day/check-out-by-code',
  LIST_USERS: '/users',

  //
  LATE_EARLY: '/late-early/create',
  LIST_LATE_EARLY: '/late-early/self-list',
  LIST_MANAGER_LATE_EARLY: '/late-early/manager-list',
  APPROVE_LATE_EARLY: '/late-early/approved-canceled',
  UPDATE_LATE_EARLY: '/late-early/update',
  DELETE_LATE_EARLY: '/late-early/delete',
  //

  //
  TAKE_LEAVE: '/take-leave/create',
  LIST_TAKE_LEAVE: '/take-leave/self-list',
  LIST_BY_ID_TAKE_LEAVE: '/take-leave/get-by-id',
  LIST_MANAGER_TAKE_LEAVE: '/take-leave/manager-list',
  APPROVE_TAKE_LEAVE: '/take-leave/approved-canceled',
  UPDATE_TAKE_LEAVE: '/take-leave/update',
  DELETE_TAKE_LEAVE: '/take-leave/delete',
  //

  OVERTIME: '/overtime/create',
  UPDATE_OT: '/overtime/update',
  DELETE_OT: '/overtime/delete',
  ///
  ADD_USERID_DEVICE: '/user/add-device-id',
  REMOVE_USERID_DEVICE: '/user/remove-device-id',
  GET_LIST_TEAMS: '/user/list-teams',
  GET_LIST_ASSIGN: '/user/list-assign',
  GET_LIST_NOTIFY: '/user/list-notify?page=',
  SET_STATUS_OVERTIME: '/user/change-status-overtime',
  SET_STATUS_BREAK: '/user/change-status-take-leave',
  SET_STATUS_LATE_EARLY: '/user/change-status-late-early',
  GET_LIST_CHECK: '/work-day/list',
  GET_PROFILE: '/site/get-profile',
  APPROVE_OVERTIME: '/overtime/approved-canceled',
  //
  GET_LIST_TAKE_LEAVE: '/take-leave/self-list',
  GET_LIST_ADMIN_TAKE_LEAVE: '/take-leave/manager-list',
  CONFIRM_DENY_TAKE_LEAVE: '/take-leave/approved-canceled',
  GET_LIST_OVERTIME: '/overtime/self-list',
  GET_LIST_OVERTIME_MANAGER: '/overtime/manager-list',
  //
  GET_SUMMARY: '/work-day/get-summary',

  //
  BOOK_ROOM: '/meeting/create',
  LIST_ROOM: '/meeting/list',

  GET_KPI: '/kpi/detail',
  CONFIRM_KPI: '/kpi/confirm',

  MEETING_MEMBERS: '/meeting/members',
  GET_NOTIFICATION: '/notification-user/list',
  GET_HOLIDAY: '/holiday/list',
  GET_WORKDAY_TODAY: '/work-day/get-by-date',
};
