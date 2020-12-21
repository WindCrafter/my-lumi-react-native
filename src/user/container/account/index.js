import {connect} from 'react-redux';
import Account from '../../screen/account';
import {logOut} from '../../../redux/actions/authen';
import {
  getListUsers,
  kickAssign,
  changeDemoMode,
} from '../../../redux/actions/user';
import {resetCheck} from '../../../redux/actions/check';
const mapStateToProps = (state) => ({
  nameUser: state.authen.fullname,
  emailUser: state.authen.email,
  token: state.authen.token,
  currentUser: state.user.currentUser,
  oneSignalID: state.authen.oneSignalID,
  demoMode: state.user.demoMode,
});

const mapDispatchToProps = {
  kickAssign,
  logOut,
  getListUsers,
  // getListTeams,
  resetCheck,
  changeDemoMode,
};

export default connect(mapStateToProps, mapDispatchToProps)(Account);
