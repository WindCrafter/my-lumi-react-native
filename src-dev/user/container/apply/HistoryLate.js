import {connect} from 'react-redux';
import HistoryLate from '../../screen/apply/HistoryLate';
import {listLateEarly, removeList} from '../../../redux/actions/check';

const mapStateToProps = (state) => ({
  token: state.authen.token,
  dataLateEarly: state.check.dataLateEarly,
  refreshing: state.check.refreshing,
});

const mapDispatchToProps = {
  listLateEarly,
  removeList,
};

export default connect(mapStateToProps, mapDispatchToProps)(HistoryLate);
