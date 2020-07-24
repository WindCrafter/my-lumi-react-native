import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import LoginComponent from '../../screen/login';


const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(LoginComponent);
