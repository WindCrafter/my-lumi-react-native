import { connect } from 'react-redux';
import HistoryBreak from '../../screen/apply/HistoryBreak';
import { listTakeLeave} from '../../../redux/actions/check'
const mapStateToProps = (state) => ({
token: state.authen.token,
historyTakeLeave : state.check.historyTakeLeave
});

const mapDispatchToProps = {
    listTakeLeave
};

export default connect(mapStateToProps, mapDispatchToProps)(HistoryBreak);