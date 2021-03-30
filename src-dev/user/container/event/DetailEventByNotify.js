import { connect } from 'react-redux';
import DetailEventByNotify from '../../screen/Event/DetailEventByNotify';

const mapStateToProps = (state) => ({
  token: state.authen.token,
  user_id: state.authen.user_id,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(DetailEventByNotify);
