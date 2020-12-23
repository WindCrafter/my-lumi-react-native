import { connect } from 'react-redux';
import { logOut } from '../../../redux/actions/authen';
import { updateProfile } from '../../../redux/actions/user';
import UpdateProfile from '../../screen/account/updateProfile';

const mapStateToProps = (state) => ({
  nameUser: state.authen.fullname,
  emailUser: state.authen.email,
  phoneNumber: state.authen.phone_number,
  token: state.authen.token,
});

const mapDispatchToProps = {
  logOut,
  updateProfile,
};

export default connect(mapStateToProps, mapDispatchToProps)(UpdateProfile);
