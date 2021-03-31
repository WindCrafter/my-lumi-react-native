import { connect } from 'react-redux';
import ListEvent from '../../screen/Event/ListEvent';

const mapStateToProps = (state) => ({
  token: state.authen.token,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ListEvent);
