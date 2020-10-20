import React, {Component} from 'react';
import {connect} from 'react-redux';
import Event from '../../screen/Event';
import {kickMember, clearMember} from '../../../redux/actions/user';

const mapStateToProps = (state) => ({
  memberPicked: state.user.memberPicked,
});

const mapDispatchToProps = {
  kickMember,
  clearMember,
};

export default connect(mapStateToProps, mapDispatchToProps)(Event);
