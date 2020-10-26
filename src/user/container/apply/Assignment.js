import React, {Component} from 'react';
import {connect} from 'react-redux';
import {addAssign, kickAssign} from '../../../redux/actions/user';
import Assignment from '../../screen/apply/Assignment';

const mapStateToProps = (state) => ({
  userId: state.authen.userProfile.userId,
  token: state.authen.token,
  assign: state.user.assign,
});

const mapDispatchToProps = {
  addAssign,
  kickAssign,
};

export default connect(mapStateToProps, mapDispatchToProps)(Assignment);
