import { connect } from 'react-redux';
import ApplyBreak from '../../screen/apply/applyBreak';
import { takeLeave } from '../../../redux/actions/check';
import {
  setStatusUserBreak,
  setDateUserBreak,
} from '../../../redux/actions/user';

const mapStateToProps = (state) => ({
  token: state.authen.token,
  status_user_break: state.user.status_user_break,
  date_user_break: state.user.date_user_break,
});

const mapDispatchToProps = {
  takeLeave,
  setStatusUserBreak,
  setDateUserBreak,

};

export default connect(mapStateToProps, mapDispatchToProps)(ApplyBreak);
