import {connect} from 'react-redux';
import Contact from '../../screen/contact';
const mapStateToProps = (state) => ({
  token: state.authen.token,
  currentUser: state.user.currentUser,
});

const mapDispatchToProps = {
};

export default connect(mapStateToProps, mapDispatchToProps)(Contact);
