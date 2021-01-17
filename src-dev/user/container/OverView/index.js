import {connect} from 'react-redux';
import OverView from '../../screen/OverView/index';
// import {takeLeave} from '../../../redux/actions/check';
// import {
//   setStatusUserBreak,
//   setDateUserBreak,
// } from '../../../redux/actions/user';

const mapStateToProps = (state) => ({
  token: state.authen.token,

});

const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(OverView);
