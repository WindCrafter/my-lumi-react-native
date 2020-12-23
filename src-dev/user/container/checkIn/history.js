import { connect } from 'react-redux';
import History from '../../screen/checkIn/history';

const mapStateToProps = (state) => ({
  dateCheckIn: state.check.dateCheckIn,
  timeCheckIn: state.check.timeCheckIn,
  dateCheckOut: state.check.dateCheckOut,
  timeCheckOut: state.check.timeCheckOut,
  token: state.authen.token,
});

const mapDispatchToProps = {
};

export default connect(mapStateToProps, mapDispatchToProps)(History);
