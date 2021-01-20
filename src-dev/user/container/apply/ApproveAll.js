import { connect } from 'react-redux';
import ApproveAll from '../../screen/apply/ApproveAll';
import {
  listManagerLateEarly,
  approveLateEarly,
  listManagerCheck,
  approveCheck,
  removeList,
} from '../../../redux/actions/check';
import {
  setDateAdBreak, setDateAdLate, setDateAdOT, setStatusAdBreak, setStatusAdLate, setStatusAdOT
} from '../../../redux/actions/user';

const mapStateToProps = (state) => ({
  token: state.authen.token,
  dataManager: state.check.dataManagerLateEarly,
  dataManagerCheck: state.check.dataManagerCheck,
  refreshing: state.check.refreshing,
  status_ad_break: state.user.status_ad_break,
  status_ad_late: state.user.status_ad_late,
  status_ad_ot: state.user.status_ad_ot,
  date_ad_break: state.date_ad_break,
  date_ad_ot: state.user.date_ad_ot,
  date_ad_late: state.user.date_ad_late,
  role: state.authen.role,
});

const mapDispatchToProps = {
  listManagerLateEarly,
  removeList,
  approveLateEarly,
  listManagerCheck,
  approveCheck,
  setDateAdBreak,
  setDateAdLate,
  setDateAdOT,
  setStatusAdBreak,
  setStatusAdLate,
  setStatusAdOT,
};

export default connect(mapStateToProps, mapDispatchToProps)(ApproveAll);
