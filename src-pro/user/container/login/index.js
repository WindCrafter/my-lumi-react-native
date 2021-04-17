import { connect } from 'react-redux';
import {
  loginAction,
  changeAutoLogin,
  loginSuccess,
} from '../../../redux/actions/authen';
import LoginComponent from '../../screen/login';
import { addUserIdDevice } from '../../../redux/actions/user';

const mapStateToProps = state => ({
  token: state.authen.token,
  autoLoginStatus: state.authen.autoLoginStatus,
  loginSuccess: state.authen.loginSuccess,
  oneSignalID: state.authen.oneSignalID,
});

const mapDispatchToProps = {
  loginAction,
  changeAutoLogin,
  addUserIdDevice,
  loginSuccess,
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginComponent);
