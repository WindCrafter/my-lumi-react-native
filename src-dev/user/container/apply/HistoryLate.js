import {connect} from 'react-redux';
import HistoryLate from '../../screen/apply/HistoryLate';
import {listLateEarly, removeList} from '../../../redux/actions/check';
import {setStatusUserLate} from '../../../redux/actions/user';

const mapStateToProps = (state) => ({
  token: state.authen.token,
  dataLateEarly: state.check.dataLateEarly,
  refreshing: state.check.refreshing,
  status_user_late: state.user.status_user_late,
});

const mapDispatchToProps = {
  listLateEarly,
  removeList,
  setStatusUserLate,
};

export default connect(mapStateToProps, mapDispatchToProps)(HistoryLate);
