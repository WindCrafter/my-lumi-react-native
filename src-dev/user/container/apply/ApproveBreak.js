import { connect } from 'react-redux';
import ApproveBreak from '../../screen/apply/ApproveBreak';
import {
  listAdminTakeLeave,
  confirmDenyTakeLeave,
} from '../../../redux/actions/check';

const mapStateToProps = (state) => ({
  token: state.authen.token,
  historyAdminTakeLeave: state.check.historyAdminTakeLeave,
  status_ad_break: state.user.status_ad_break,
});

const mapDispatchToProps = {
  listAdminTakeLeave,
  confirmDenyTakeLeave,
};

export default connect(mapStateToProps, mapDispatchToProps)(ApproveBreak);
