import {connect} from 'react-redux';
import ApproveLate from '../../screen/apply/ApproveLate';
import {
  listManagerLateEarly,
  removeList,
  approveLateEarly,
} from '../../../redux/actions/check';

const mapStateToProps = (state) => ({
  token: state.authen.token,
  dataManager: state.check.dataManagerLateEarly,
  refreshing: state.check.refreshing,
});

const mapDispatchToProps = {
  listManagerLateEarly,
  removeList,
  approveLateEarly,
};

export default connect(mapStateToProps, mapDispatchToProps)(ApproveLate);
