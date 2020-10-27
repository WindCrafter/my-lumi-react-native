import React, {Component} from 'react';
import {connect} from 'react-redux';
import PickTeam from '../../screen/Event/PickTeam';
import {addMember, clearMember} from '../../../redux/actions/user';

const mapStateToProps = (state) => ({
  memberPicked: state.user.memberPicked,
});

const mapDispatchToProps = {
  addMember,
  clearMember,
};

export default connect(mapStateToProps, mapDispatchToProps)(PickTeam);
