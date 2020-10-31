import React, {Component} from 'react';
import {connect} from 'react-redux';
import Account from '../../screen/account';
import {logOut} from '../../../redux/actions/authen';
import {
  getListUsers,
  getListTeams,
  removeUserIdDevice,
  kickAssign,
} from '../../../redux/actions/user';
import {resetCheck} from '../../../redux/actions/check';
const mapStateToProps = (state) => ({
  nameUser: state.authen.userProfile.name,
  emailUser: state.authen.userProfile.email,
  token: state.authen.token,
  currentUser: state.user.currentUser,
  oneSignalID: state.authen.oneSignalID,
});

const mapDispatchToProps = {
  kickAssign,
  logOut,
  getListUsers,
  getListTeams,
  removeUserIdDevice,
  resetCheck,
};

export default connect(mapStateToProps, mapDispatchToProps)(Account);
