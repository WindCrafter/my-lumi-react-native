import {connect} from 'react-redux';
import ApplyBreak from '../../screen/apply/applyBreak';
import {takeLeave} from '../../../redux/actions/check';

const mapStateToProps = (state) => ({
  userId: state.authen.userId,
  token: state.authen.token,
  assign: state.user.assign,
});

const mapDispatchToProps = {
  takeLeave,
};

export default connect(mapStateToProps, mapDispatchToProps)(ApplyBreak);
