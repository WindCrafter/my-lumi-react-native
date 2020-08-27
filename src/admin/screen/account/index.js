import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Colors } from '../../../../utlis';
import { BarStatus } from '../../../component';
import HeaderAccount from './component/HeaderAccount';
import CalendarCustom from './component/Calendar';

const Account = (props) => {
  const { logOut, nameUser, emailUser, navigation } = props;
  const name = nameUser;
  const email = emailUser;
  const onLogOut = () => {
    logOut();
  };
  const onMoveToProfile = () => {
    navigation.navigate('UpdateProfile');
  };

  return (
    <>
      <BarStatus backgroundColor={Colors.background} />
      <View style={styles.container}>
        <HeaderAccount name={name} email={email} onPress={onMoveToProfile} />
        <View style={styles.detail}>
          <CalendarCustom />
          <TouchableOpacity style={styles.logOut} onPress={onLogOut}>
            <Text style={styles.txtLogOut}>Đăng xuất</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

export default Account;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  logOut: {
    width: '80%',
    height: 60,
    backgroundColor: Colors.danger,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
  },
  txtLogOut: {
    fontWeight: '600',
    fontSize: 20,
    color: Colors.white,
  },
  detail: {
    flex: 4,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
});
