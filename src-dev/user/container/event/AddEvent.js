import { connect } from 'react-redux';
import AddEvent from '../../screen/Event/AddEvent';

const mapStateToProps = (state) => ({
  token: state.authen.token,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(AddEvent);
