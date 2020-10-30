import React, {Component} from 'react';
import {connect} from 'react-redux';
import Account from '../../screen/account';
import {logOut} from '../../../redux/actions/authen';
import {getListUsers, getListTeams,removeUserIdDevice} from '../../../redux/actions/user';
const mapStateToProps = (state) => ({
  nameUser: state.authen.userProfile.name,
  emailUser: state.authen.userProfile.email,
  token: state.authen.token,
  currentUser: state.user.currentUser,
  oneSignalID: state.authen.oneSignalID
});

const mapDispatchToProps = {
  logOut,
  getListUsers,
  getListTeams,
  removeUserIdDevice
};

export default connect(mapStateToProps, mapDispatchToProps)(Account);
