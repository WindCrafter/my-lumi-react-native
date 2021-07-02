import React, { Component } from 'react';
import { connect } from 'react-redux';
import { kickMember, clearMember, updateRoom, addMember } from '../../../redux/actions/user';
import UpdateRoom from '../../screen/book/updateRoom';

const mapStateToProps = (state) => ({
  memberPicked: state.user.memberPicked,
  token: state.authen.token,
});

const mapDispatchToProps = {
  kickMember,
  clearMember,
  updateRoom,
  addMember
};

export default connect(mapStateToProps, mapDispatchToProps)(UpdateRoom);
