import {connect} from 'react-redux';
import Account from '../../screen/account';
import {logOut} from '../../../redux/actions/authen';
import {
  // getListUsers,
  // getListTeams,
  kickAssign,
} from '../../../redux/actions/user';
import {resetCheck} from '../../../redux/actions/check';
const mapStateToProps = (state) => ({
  nameUser: state.authen.fullname,
  emailUser: state.authen.email,
  token: state.authen.token,
  currentUser: state.user.currentUser,
  oneSignalID: state.authen.oneSignalID,
});

const mapDispatchToProps = {
  kickAssign,
  logOut,
  // getListUsers,
  // getListTeams,
  resetCheck,
};

export default connect(mapStateToProps, mapDispatchToProps)(Account);
