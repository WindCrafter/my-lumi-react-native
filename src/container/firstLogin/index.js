import { connect } from 'react-redux';
import FirstLogin from '../../screen/firstLogin';
import { changePass } from '../../redux/actions/authen';

const mapStateToProps = (state) => ({
  token: state.authen.token,
});

const mapDispatchToProps = {
  changePass,
};

export default connect(mapStateToProps, mapDispatchToProps)(FirstLogin);
