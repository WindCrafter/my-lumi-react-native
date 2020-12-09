import {connect} from 'react-redux';
import ApproveLate from '../../screen/apply/ApproveLate';
import {listManagerLateEarly} from '../../../redux/actions/check';

const mapStateToProps = (state) => ({
  token: state.authen.token,
  dataManager: state.check.dataManagerLateEarly,
});

const mapDispatchToProps = {
  listManagerLateEarly,
};

export default connect(mapStateToProps, mapDispatchToProps)(ApproveLate);
