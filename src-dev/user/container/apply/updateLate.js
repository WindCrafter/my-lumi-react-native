import {connect} from 'react-redux';
import UpdateLate from '../../screen/apply/updateLate';
import {setLateEarly,updateLateEarly} from '../../../redux/actions/check';
const mapStateToProps = (state) => ({
  userId: state.authen.userId,
  token: state.authen.token,
  assign: state.user.assign,
});

const mapDispatchToProps = {
  setLateEarly,
  updateLateEarly,
};

export default connect(mapStateToProps, mapDispatchToProps)(UpdateLate);
