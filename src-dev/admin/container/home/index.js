import React, { Component } from 'react';
import { connect } from 'react-redux';
import HomeComponent from '../../screen/home';

const mapStateToProps = (state) => ({
  nameUser: state.authen.fullname,
  emailUser: state.authen.email,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(HomeComponent);
