import {connect} from 'react-redux';
import HistoryBreak from '../../screen/apply/HistoryBreak';
import {listTakeLeave, deleteTakeLeave} from '../../../redux/actions/check';
import {
  setStatusUserBreak,
  setDateUserBreak,
} from '../../../redux/actions/user';

const mapStateToProps = (state) => ({
  token: state.authen.token,
  historyTakeLeave: state.check.historyTakeLeave,
  status_user_break: state.user.status_user_break,
  date_user_break: state.user.date_user_break,
});

const mapDispatchToProps = {
  listTakeLeave,
  deleteTakeLeave,
  setStatusUserBreak,
  setDateUserBreak,
};

export default connect(mapStateToProps, mapDispatchToProps)(HistoryBreak);
