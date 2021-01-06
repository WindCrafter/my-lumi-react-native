import {connect} from 'react-redux';
import UpdateBreak from '../../screen/apply/updateBreak';
import {updateTakeLeave} from '../../../redux/actions/check';

const mapStateToProps = (state) => ({
 
  token: state.authen.token,
 
});

const mapDispatchToProps = {
  updateTakeLeave,
};

export default connect(mapStateToProps, mapDispatchToProps)(UpdateBreak);
