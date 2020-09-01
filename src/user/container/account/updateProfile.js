import React, { Component } from 'react';
import { connect } from 'react-redux';
import { logOut } from '../../../redux/actions/authen';
import { updateProfile } from '../../../redux/actions/user';
import UpdateProfile from '../../screen/account/updateProfile';

const mapStateToProps = (state) => ({
  nameUser: state.authen.nameUser,
  emailUser: state.authen.emailUser,
  phoneNumber: state.authen.phoneNumber,
  token: state.authen.token,
  advance: state.authen.advance,
  birthdayUser: state.authen.birthday,
});

const mapDispatchToProps = {
  logOut,
  updateProfile,
};

export default connect(mapStateToProps, mapDispatchToProps)(UpdateProfile);
