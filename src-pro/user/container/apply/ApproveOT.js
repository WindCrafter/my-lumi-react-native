import {connect} from 'react-redux';
import ApproveOT from '../../screen/apply/ApproveOT';

const mapStateToProps = (state) => ({
  userId: state.authen.userId,
  token: state.authen.token,
  assign: state.user.assign,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ApproveOT);
