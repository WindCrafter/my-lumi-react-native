import {connect} from 'react-redux';
import ApplyLate from '../../screen/apply/applyLate';
import {setLateEarly} from '../../../redux/actions/check';
const mapStateToProps = (state) => ({
  userId: state.authen.userId,
  token: state.authen.token,
  assign: state.user.assign,
});

const mapDispatchToProps = {
  setLateEarly,
};

export default connect(mapStateToProps, mapDispatchToProps)(ApplyLate);
