import {connect} from 'react-redux';
import allHistory from '../../screen/allHistory';
import {getListCheck} from '../../../redux/actions/user';
const mapStateToProps = (state) => ({
  token: state.authen.token,
  history: state.authen.history,
});

const mapDispatchToProps = {
  getListCheck,
};

export default connect(mapStateToProps, mapDispatchToProps)(allHistory);
