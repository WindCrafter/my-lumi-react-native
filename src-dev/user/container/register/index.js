import { connect } from 'react-redux';
import Register from '../../screen/register/index';
import { register } from '../../../redux/actions/authen';

const mapStateToProps = () => ({});

const mapDispatchToProps = {
  register,
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
