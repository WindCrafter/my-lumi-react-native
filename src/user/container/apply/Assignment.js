import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
  addAssign,
  kickAssign,
  getListAssign,
} from '../../../redux/actions/user';
import Assignment from '../../screen/apply/Assignment';

const mapStateToProps = (state) => ({
  userId: state.authen.userProfile.userId,
  token: state.authen.token,
  assign: state.user.assign,
  listAssign: state.user.listAssign,
});

const mapDispatchToProps = {
  addAssign,
  kickAssign,
  getListAssign,
};

export default connect(mapStateToProps, mapDispatchToProps)(Assignment);
