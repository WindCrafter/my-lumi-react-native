import {connect} from 'react-redux';
import ChangePass from '../../screen/changePass/index';
import {changePass} from '../../../redux/actions/authen';

const mapStateToProps = (state) => ({
  token: state.authen.token,
});

const mapDispatchToProps = {
  changePass,
};

export default connect(mapStateToProps, mapDispatchToProps)(ChangePass);
