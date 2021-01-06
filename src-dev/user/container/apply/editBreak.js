import {connect} from 'react-redux';
import EditBreak from '../../screen/apply/editBreak';
import {takeLeave} from '../../../redux/actions/check';

const mapStateToProps = (state) => ({
 
  token: state.authen.token,
 
});

const mapDispatchToProps = {
  takeLeave,
};

export default connect(mapStateToProps, mapDispatchToProps)(EditBreak);
