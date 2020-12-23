import {connect} from 'react-redux';
import Contact from '../../screen/contact';
import {getListUsers} from '../../../redux/actions/user';

const mapStateToProps = (state) => ({
  token: state.authen.token,
  currentUser: state.user.currentUser,
});

const mapDispatchToProps = {
  getListUsers,
};

export default connect(mapStateToProps, mapDispatchToProps)(Contact);
