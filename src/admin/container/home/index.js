import React, { Component } from 'react';
import { connect } from 'react-redux';
import HomeComponent from '../../screen/home';

const mapStateToProps = (state) => ({
  nameUser: state.authen.nameUser,
  emailUser: state.authen.emailUser,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(HomeComponent);
