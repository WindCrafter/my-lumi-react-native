import {connect} from 'react-redux';
import {logOut} from '../../../redux/actions/authen';
import {updateProfile} from '../../../redux/actions/user';
import UpdateProfile from '../../screen/account/updateProfile';

const mapStateToProps = (state) => ({
  nameUser: state.authen.fullname,
  emailUser: state.authen.email,
  phoneNumber: state.authen.phone_number,
  token: state.authen.token,
  teams: state.authen.team_id,
  birthdayUser: state.authen.birthday,
  addressUser: state.authen.address,
  team_name: state.authen.team_name,
  role: state.authen.role,
  identity_number: state.authen.identity_number,
  bank_account: state.authen.bank_account,
  bank: state.authen.bank,
});

const mapDispatchToProps = {
  logOut,
  updateProfile,
};

export default connect(mapStateToProps, mapDispatchToProps)(UpdateProfile);
