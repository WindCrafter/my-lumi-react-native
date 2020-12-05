import {connect} from 'react-redux';
import ApplyOT from '../../screen/apply/applyOT';
import {overTime} from '../../../redux/actions/check';

const mapStateToProps = (state) => ({
  userId: state.authen.userId,
  token: state.authen.token,
  assign: state.user.assign,
});

const mapDispatchToProps = {
  overTime,
};

export default connect(mapStateToProps, mapDispatchToProps)(ApplyOT);
