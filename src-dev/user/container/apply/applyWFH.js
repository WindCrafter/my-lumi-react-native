import { connect } from 'react-redux';
import { createWorkFromHome } from '../../../redux/actions/check';
import applyWFH from '../../screen/apply/applyWFH';

const mapStateToProps = (state) => ({
  userId: state.authen.userId,
  token: state.authen.token,
  assign: state.user.assign,
  refreshing: state.check.refreshing,
  status_user_late: state.user.status_user_late,
  date_user_late: state.user.date_user_late,
});

const mapDispatchToProps = {
  createWorkFromHome
};

export default connect(mapStateToProps, mapDispatchToProps)(applyWFH);
