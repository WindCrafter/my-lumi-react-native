import {connect} from 'react-redux';
import AddStaff from '../../screen/addStaff';
import {getListRoles, addStaff} from '../../../redux/actions/admin';

const mapStateToProps = (state) => ({
  token: state.authen.token,
  roleInfo: state.authen.roleInfo,
  teams: state.authen.teams,
});

const mapDispatchToProps = {
  getListRoles,
  addStaff,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddStaff);
