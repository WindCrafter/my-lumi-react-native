import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, StatusBar } from 'react-native';
import { Colors } from '../../../../utlis';
import { BarStatus } from '../../../component';
import HeaderAccount from './component/HeaderAccount';
import CalendarCustom from './component/Calendar';
import { imgs } from '../../../../utlis';
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
          <View style={styles.bottomDetail}>
            <View style={{ flexDirection: 'row', paddingVertical: 10 }}>
              <Image source={imgs.KPI} />
              <Text style={styles.txtLogOut}>KPI tháng</Text>
            </View>
            <View style={{ flexDirection: 'row', paddingVertical: 10 }}>
              <Image source={imgs.inforblack} />
              <Text style={styles.txtLogOut}>Thông tin ứng dụng</Text>
            </View>

            <TouchableOpacity onPress={onLogOut} style={{ flexDirection: 'row', paddingVertical: 10 }}>
              <Image source={imgs.logout} />

              <Text style={styles.txtLogOut}>Đăng xuất</Text>
            </TouchableOpacity>
          </View>
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
    color: Colors.black,
    marginLeft: 10

  },
  detail: {
    flex: 4,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  bot: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  bottomDetail: { width: '90%' }
});
