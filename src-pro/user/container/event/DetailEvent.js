import { connect } from 'react-redux';
import DetailEvent from '../../screen/Event/DetailEvent';

const mapStateToProps = (state) => ({
  token: state.authen.token,
  user_id: state.authen.user_id,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(DetailEvent);
