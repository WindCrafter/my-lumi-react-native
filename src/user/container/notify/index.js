import React, {Component} from 'react';
import {connect} from 'react-redux';
import Notify from '../../screen/notify';
import {getListNotifys} from '../../../redux/actions/user';
const mapStateToProps = (state) => ({
  token: state.authen.token,
  listNotifys: state.user.listNotifys.notify,
});

const mapDispatchToProps = {
  getListNotifys,
};

export default connect(mapStateToProps, mapDispatchToProps)(Notify);
