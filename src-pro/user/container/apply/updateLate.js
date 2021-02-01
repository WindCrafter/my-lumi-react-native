import {connect} from 'react-redux';
import UpdateLate from '../../screen/apply/updateLate';
import {setLateEarly,updateLateEarly} from '../../../redux/actions/check';
const mapStateToProps = (state) => ({
  userId: state.authen.userId,
  token: state.authen.token,
  assign: state.user.assign,
  status_user_late: state.user.status_user_late,
});

const mapDispatchToProps = {
  setLateEarly,
  updateLateEarly,
};

export default connect(mapStateToProps, mapDispatchToProps)(UpdateLate);
