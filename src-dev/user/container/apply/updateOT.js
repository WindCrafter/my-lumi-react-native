import {connect} from 'react-redux';
import UpdateOT from '../../screen/apply/updateOT';
import {overTime} from '../../../redux/actions/check';
import {getHoliday} from '../../../redux/actions/user';
import {updateOverTime} from '../../../redux/actions/check';

const mapStateToProps = (state) => ({
  userId: state.authen.userId,
  token: state.authen.token,
  assign: state.user.assign,
  holiday: state.user.holiday,
});

const mapDispatchToProps = {
  overTime,
  getHoliday,
  updateOverTime,
};

export default connect(mapStateToProps, mapDispatchToProps)(UpdateOT);