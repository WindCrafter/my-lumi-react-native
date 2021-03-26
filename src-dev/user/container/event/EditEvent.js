import { connect } from 'react-redux';
import EditEvent from '../../screen/Event/EditEvent';

const mapStateToProps = (state) => ({
  token: state.authen.token,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(EditEvent);
