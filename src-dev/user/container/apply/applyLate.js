import {connect} from 'react-redux';
import ApplyLate from '../../screen/apply/applyLate';
import {setLateEarly} from '../../../redux/actions/check';
import {setStatusUserLate} from '../../../redux/actions/user';

const mapStateToProps = (state) => ({
  userId: state.authen.userId,
  token: state.authen.token,
  assign: state.user.assign,
  refreshing: state.check.refreshing,
  status_user_late: state.user.status_user_late,
});

const mapDispatchToProps = {
  setLateEarly,
  setStatusUserLate,
};

export default connect(mapStateToProps, mapDispatchToProps)(ApplyLate);
