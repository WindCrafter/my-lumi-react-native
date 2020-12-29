import React, {Component} from 'react';
import {connect} from 'react-redux';
import Book from '../../screen/book/index';

import {listRoom} from '../../../redux/actions/user';

const mapStateToProps = (state) => ({
  token: state.authen.token,
  listRoomBook: state.user.listRoomBook,
});

const mapDispatchToProps = {
  listRoom,
};

export default connect(mapStateToProps, mapDispatchToProps)(Book);