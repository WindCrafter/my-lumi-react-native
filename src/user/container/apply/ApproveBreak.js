import {connect} from 'react-redux';
import ApproveBreak from '../../screen/apply/ApproveBreak';
import {listAdminTakeLeave} from '../../../redux/actions/check';

const mapStateToProps = (state) => ({
  token: state.authen.token,
  historyAdminTakeLeave: state.check.historyAdminTakeLeave,
});

const mapDispatchToProps = {
  listAdminTakeLeave,
};

export default connect(mapStateToProps, mapDispatchToProps)(ApproveBreak);
