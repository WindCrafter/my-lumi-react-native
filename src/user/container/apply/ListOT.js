import {connect} from 'react-redux';
import ListOT from '../../screen/apply/ListOT';

const mapStateToProps = (state) => ({
  userId: state.authen.userProfile.userId,
  token: state.authen.token,
  assign: state.user.assign,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ListOT);
