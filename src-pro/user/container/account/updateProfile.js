import {connect} from 'react-redux';
import {logOut, getProfile} from '../../../redux/actions/authen';
import {updateProfile} from '../../../redux/actions/user';
import UpdateProfile from '../../screen/account/updateProfile';

const mapStateToProps = (state) => ({
  token: state.authen.token,
  auth: state.authen,
});

const mapDispatchToProps = {
  logOut,
  updateProfile,
  getProfile,
};

export default connect(mapStateToProps, mapDispatchToProps)(UpdateProfile);
