import {connect} from 'react-redux';
import HistoryLate from '../../screen/apply/HistoryLate';
import {listLateEarly} from '../../../redux/actions/check';

const mapStateToProps = (state) => ({
  token: state.authen.token,
});

const mapDispatchToProps = {
  listLateEarly,
};

export default connect(mapStateToProps, mapDispatchToProps)(HistoryLate);
