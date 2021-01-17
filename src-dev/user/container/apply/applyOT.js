import { connect } from 'react-redux';
import ApplyOT from '../../screen/apply/applyOT';
import { overTime } from '../../../redux/actions/check';
import { getHoliday, setStatusUserOT, setDateUserOT } from '../../../redux/actions/user';

const mapStateToProps = (state) => ({
  userId: state.authen.userId,
  token: state.authen.token,
  assign: state.user.assign,
  holiday: state.user.holiday,
  status_user_ot: state.user.status_user_ot,
  date_user_ot: state.user.date_user_ot,
});

const mapDispatchToProps = {
  overTime,
  getHoliday,
  setStatusUserOT,
  setDateUserOT,
};

export default connect(mapStateToProps, mapDispatchToProps)(ApplyOT);
