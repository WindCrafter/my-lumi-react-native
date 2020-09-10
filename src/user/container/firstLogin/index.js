import {connect} from 'react-redux';
import FirstLogin from '../../screen/firstLogin';
import {changePass, updateProfile} from '../../../redux/actions/authen';

const mapStateToProps = (state) => ({
  token: state.authen.token,
});

const mapDispatchToProps = {
  changePass,
  updateProfile,
};

export default connect(mapStateToProps, mapDispatchToProps)(FirstLogin);
