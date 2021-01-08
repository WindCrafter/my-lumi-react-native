import {connect} from 'react-redux';
import Account from '../../screen/account';
import {logOut} from '../../../redux/actions/authen';
import {
  // getListTeams,
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
  codepush: state.codepush,
});

const mapDispatchToProps = {
  kickAssign,
  logOut,
  // getListTeams,
  resetCheck,
  changeDemoMode,
};

export default connect(mapStateToProps, mapDispatchToProps)(Account);
