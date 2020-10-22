import { connect } from 'react-redux';
import FirstLogin from '../../screen/firstLogin';
import { changePass, updateProfile } from '../../../redux/actions/authen';

const mapStateToProps = (state) => ({
  token: state.authen.token,
  name: state.authen.userProfile.name,
  deviceId: state.authen.deviceId,
});

const mapDispatchToProps = {
  changePass,
  updateProfile,
};

export default connect(mapStateToProps, mapDispatchToProps)(FirstLogin);
