import React, { Component } from 'react';
import { connect } from 'react-redux';
import Event from '../../screen/Event';
import { kickMember, clearMember, bookRoom } from '../../../redux/actions/user';

const mapStateToProps = (state) => ({
  memberPicked: state.user.memberPicked,
  token: state.authen.token,
});

const mapDispatchToProps = {
  kickMember,
  clearMember,
  bookRoom
};

export default connect(mapStateToProps, mapDispatchToProps)(Event);
