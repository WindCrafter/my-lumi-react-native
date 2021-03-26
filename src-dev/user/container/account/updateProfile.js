import { connect } from 'react-redux';
import { logOut, getProfile, uploadAvatar } from '../../../redux/actions/authen';
import { updateProfile } from '../../../redux/actions/user';
import UpdateProfile from '../../screen/account/updateProfile';

const mapStateToProps = state => ({
  token: state.authen.token,
  auth: state.authen,
  avatar: state.authen.avatar,
});

const mapDispatchToProps = {
  logOut,
  updateProfile,
  getProfile,
  uploadAvatar,
};

export default connect(mapStateToProps, mapDispatchToProps)(UpdateProfile);
