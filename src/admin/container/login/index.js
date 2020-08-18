import { connect } from 'react-redux';
import { loginAction, changeAutoLogin } from '../../../redux/actions/authen';
import LoginComponent from '../../screen/login';

const mapStateToProps = (state) => ({
  token: state.authen.token,
  autoLoginStatus: state.authen.autoLoginStatus,
  loginSuccess: state.authen.loginSuccess,
});

const mapDispatchToProps = {
  loginAction,
  changeAutoLogin,
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginComponent);
