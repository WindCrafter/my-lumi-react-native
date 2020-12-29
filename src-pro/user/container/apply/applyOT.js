import {connect} from 'react-redux';
import ApplyOT from '../../screen/apply/applyOT';
import {overTime} from '../../../redux/actions/check';
import {getHoliday} from '../../../redux/actions/user';

const mapStateToProps = (state) => ({
  userId: state.authen.userId,
  token: state.authen.token,
  assign: state.user.assign,
  holiday: state.user.holiday,
});

const mapDispatchToProps = {
  overTime,
  getHoliday,
};

export default connect(mapStateToProps, mapDispatchToProps)(ApplyOT);
