import React, { Component } from 'react';
import { connect } from 'react-redux';
import Account from '../../screen/account';
import { logOut } from '../../../redux/actions/authen';

const mapStateToProps = (state) => ({
  nameUser: state.authen.nameUser,
  emailUser: state.authen.emailUser,
});

const mapDispatchToProps = {
  logOut,
};

export default connect(mapStateToProps, mapDispatchToProps)(Account);
