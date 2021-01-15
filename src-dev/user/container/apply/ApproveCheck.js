import {connect} from 'react-redux';
import {
  listManagerCheck,
  removeList,
  approveCheck,
} from '../../../redux/actions/check';
import ApproveCheck from '../../screen/apply/ApproveCheck';

const mapStateToProps = (state) => ({
//   token: state.authen.token,
//   dataManagerCheck: state.check.dataManagerCheck,
//   refreshing: state.check.refreshing,
});

const mapDispatchToProps = {
  listManagerCheck,
  approveCheck,
  removeList,
};

export default connect(mapStateToProps, mapDispatchToProps)(ApproveCheck);
