import { connect } from 'react-redux';
import ApproveBreak from '../../screen/apply/ApproveBreak';
import {
  listAdminTakeLeave,
  confirmDenyTakeLeave,
} from '../../../redux/actions/check';
import { setStatusAdBreak } from '../../../redux/actions/user';

const mapStateToProps = (state) => ({
  token: state.authen.token,
  historyAdminTakeLeave: state.check.historyAdminTakeLeave,
  status_ad_break: state.user.status_ad_break,
});

const mapDispatchToProps = {
  listAdminTakeLeave,
  confirmDenyTakeLeave,
  setStatusAdBreak,
};

export default connect(mapStateToProps, mapDispatchToProps)(ApproveBreak);
