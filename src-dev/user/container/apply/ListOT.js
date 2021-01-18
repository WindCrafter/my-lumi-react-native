import { connect } from 'react-redux';
import ListOT from '../../screen/apply/ListOT';
import {
  getHoliday,
  setStatusUserOT,
  setDateUserOT,
} from '../../../redux/actions/user';

const mapStateToProps = (state) => ({
  userId: state.authen.userId,
  token: state.authen.token,
  assign: state.user.assign,
  status_user_ot: state.user.status_user_ot,
  date_user_ot: state.user.date_user_ot,
});

const mapDispatchToProps = { setStatusUserOT, setDateUserOT };

export default connect(mapStateToProps, mapDispatchToProps)(ListOT);
