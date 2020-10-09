import React, { Component } from 'react';
import { connect } from 'react-redux';
import ApplyOT from '../../screen/apply/applyOT';
import { overTime } from '../../../redux/actions/check';

const mapStateToProps = (state) => ({
    userId: state.authen.userProfile.userId,
    token: state.authen.token,
});

const mapDispatchToProps = {
    overTime
};

export default connect(mapStateToProps, mapDispatchToProps)(ApplyOT);
