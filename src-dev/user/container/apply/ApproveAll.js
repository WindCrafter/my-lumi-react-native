import { connect } from 'react-redux';
import ApproveAll from '../../screen/apply/ApproveAll';
import {
  listManagerLateEarly,
  approveLateEarly,
  listManagerCheck,
  approveCheck,
  removeList,
} from '../../../redux/actions/check';

const mapStateToProps = (state) => ({
  token: state.authen.token,
  dataManager: state.check.dataManagerLateEarly,
  dataManagerCheck: state.check.dataManagerCheck,
  refreshing: state.check.refreshing,
});

const mapDispatchToProps = {
  listManagerLateEarly,
  removeList,
  approveLateEarly,
  listManagerCheck,
  approveCheck,
};

export default connect(mapStateToProps, mapDispatchToProps)(ApproveAll);
