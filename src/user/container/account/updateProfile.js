import React, { Component } from 'react';
import { connect } from 'react-redux';
import { logOut } from '../../../redux/actions/authen';
import { updateProfile } from '../../../redux/actions/user';
import UpdateProfile from '../../screen/account/updateProfile';

const mapStateToProps = (state) => ({
  nameUser: state.authen.userProfile.name,
  emailUser: state.authen.userProfile.email,
  phoneNumber: state.authen.userProfile.phoneNumber,
  token: state.authen.token,
  advance: state.authen.userProfile.advance,
  birthdayUser: state.authen.userProfile.birthday,
});

const mapDispatchToProps = {
  logOut,
  updateProfile,
};

export default connect(mapStateToProps, mapDispatchToProps)(UpdateProfile);
