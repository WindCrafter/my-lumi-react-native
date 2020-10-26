import React, {Component} from 'react';
import {connect} from 'react-redux';
import Account from '../../screen/account';
import {logOut} from '../../../redux/actions/authen';
import {getListUsers} from '../../../redux/actions'
const mapStateToProps = (state) => ({
  nameUser: state.authen.userProfile.name,
  emailUser: state.authen.userProfile.email,
  token: state.authen.token,
  currentUser: state.user.currentUser,
});

const mapDispatchToProps = {
  logOut,
  getListUsers
};

export default connect(mapStateToProps, mapDispatchToProps)(Account);
