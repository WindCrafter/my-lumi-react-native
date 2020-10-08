import { connect } from 'react-redux';
import Contact from '../../screen/contact';
import { getListUsers } from '../../../redux/actions/user'
const mapStateToProps = (state) => ({
    
    token: state.authen.token,
    currentUser: state.user.currentUser,
    // phoneNumber: state.user.phoneNumber,

});

const mapDispatchToProps = {
    getListUsers,
};

export default connect(mapStateToProps, mapDispatchToProps)(Contact);
