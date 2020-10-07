import React, { Component } from 'react';
import { connect } from 'react-redux';
import HomeComponent from '../../screen/home';

const mapStateToProps = (state) => ({
  nameUser: state.authen.userProfile.name,
  emailUser: state.authen.userProfile.email,
  switchTo: state.check.switchTo,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(HomeComponent);
