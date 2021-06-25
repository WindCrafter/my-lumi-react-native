import { connect } from 'react-redux';
import { updateWorkFromHome } from '../../../redux/actions/check';
import updateWFH from '../../screen/apply/updateWFH';

const mapStateToProps = (state) => ({
  token: state.authen.token,

});

const mapDispatchToProps = {
  updateWorkFromHome
};

export default connect(mapStateToProps, mapDispatchToProps)(updateWFH);
