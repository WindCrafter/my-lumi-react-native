import React, {Component} from 'react';
import {connect} from 'react-redux';
import ApplyLate from '../../screen/apply/applyLate';
import {setLateEarly} from '../../../redux/actions/check';
const mapStateToProps = (state) => ({
  userId: state.authen.userProfile.userId,
    token: state.authen.token,

});

const mapDispatchToProps = {
  setLateEarly,
};

export default connect(mapStateToProps, mapDispatchToProps)(ApplyLate);
