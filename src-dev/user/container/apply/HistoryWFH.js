import { connect } from 'react-redux';
import HistoryWFH from '../../screen/apply/HistoryWFH';

const mapStateToProps = (state) => ({
  token: state.authen.token,
});

const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(HistoryWFH);
