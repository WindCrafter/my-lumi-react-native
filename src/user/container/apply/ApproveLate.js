import {connect} from 'react-redux';
import ApproveLate from '../../screen/apply/ApproveLate';
import {listManagerLateEarly} from '../../../redux/actions/check';

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {
  listManagerLateEarly,
};

export default connect(mapStateToProps, mapDispatchToProps)(ApproveLate);
