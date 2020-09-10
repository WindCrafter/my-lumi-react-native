import { connect } from 'react-redux';
import AddStaff from '../../screen/addStaff';
import { getListRoles, addStaff } from '../../../redux/actions/admin';

const mapStateToProps = (state) => ({
  token: state.authen.token,
  roleIdAdmin: state.admin.roleIdAdmin,
  roleIdUser: state.admin.roleIdUser,
});

const mapDispatchToProps = {
  getListRoles,
  addStaff,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddStaff);
