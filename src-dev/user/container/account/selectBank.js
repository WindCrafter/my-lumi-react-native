import {connect} from 'react-redux';
import SelectBank from '../../screen/account/selectBank';

const mapStateToProps = (state) => ({
  token: state.authen.token,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(SelectBank);
