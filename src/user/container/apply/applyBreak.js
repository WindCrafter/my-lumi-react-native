import React, { Component } from 'react';
import { connect } from 'react-redux';
import ApplyBreak from '../../screen/apply/applyBreak';
import { takeLeave } from '../../../redux/actions/check';

const mapStateToProps = (state) => ({
    userId: state.authen.userProfile.userId,
    token: state.authen.token,
});

const mapDispatchToProps = {
    takeLeave,
};

export default connect(mapStateToProps, mapDispatchToProps)(ApplyBreak);
