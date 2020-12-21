import React, {Component} from 'react';
import {connect} from 'react-redux';
import KpiComponent from '../../screen/kpi';
import {getKPI, confirmKpi} from '../../../redux/actions/user';

const mapStateToProps = (state) => ({
  token: state.authen.token,
  kpi: state.user.kpi,
});

const mapDispatchToProps = {
  getKPI,
  confirmKpi,
};

export default connect(mapStateToProps, mapDispatchToProps)(KpiComponent);
