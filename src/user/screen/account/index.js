import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  StatusBar,
} from 'react-native';
import {Colors} from '../../../../utlis';
import {BarStatus} from '../../../component';
import HeaderAccount from './component/HeaderAccount';
import CalendarCustom from './component/Calendar';
import RoundedView from './component/RoundedView';
import {Card} from 'native-base';

import {imgs} from '../../../../utlis';
const Account = (props) => {
  const {logOut, nameUser, emailUser, navigation} = props;
  const name = nameUser;
  const email = emailUser;
  const onLogOut = () => {
    logOut();
  };
  const onMoveToProfile = () => {
    navigation.navigate('UpdateProfile');
  };
  const onMoveTContact = () => {
    navigation.navigate('Contact');
  };
  return (
    <>
      <BarStatus backgroundColor={Colors.white} />

      <View style={styles.container}>
        <HeaderAccount />

        <Card style={styles.cardTop}>
          <RoundedView
            leftImage={require('../../../../naruto.jpeg')}
            title={nameUser}
            rightImage={imgs.next}
            tintColor={'grey'}
            detail={'Team App'}
            fontSize={16}
            onPressButton={onMoveToProfile}
          />
        </Card>
        <View style={styles.detail}>
          <Card style={styles.cardMid}>
            <RoundedView
              leftImage={imgs.KPI}
              title={'Quản lí KPI'}
              rightImage={imgs.next}
              tintColor={'grey'}
              line={true}
            />
            <RoundedView
              leftImage={imgs.meeting}
              title={'Danh sách Lumier'}
              rightImage={imgs.next}
              tintColor={'grey'}
              line={true}
              onPressButton={onMoveTContact}
            />
            <RoundedView
              leftImage={imgs.inforsolidblack}
              title={'Thông tin ứng dụng'}
              rightImage={imgs.next}
              tintColor={'grey'}
              line={true}
            />
            <RoundedView
              leftImage={imgs.logout}
              title={'Đăng xuất'}
              rightImage={imgs.next}
              tintColor={'grey'}
              line={true}
              onPressButton={onLogOut}
            />
          </Card>
        </View>
      </View>
    </>
  );
};

export default Account;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  txtLogOut: {
    fontWeight: '600',
    fontSize: 18,
    color: Colors.black,
    marginLeft: 10,
  },
  detail: {
    flex: 3,
    alignItems: 'center',
  },
  bot: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  bottomDetail: {width: '90%'},
  cardTop: {
    width: '90%',
    alignSelf: 'center',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowColor: 'rgba(0, 0, 0, 0.16)',
    justifyContent: 'center',
    borderRadius: 24,
    height: 88,
    marginTop:-8
  },
  cardMid: {
    width: '90%',
    alignSelf: 'center',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowColor: 'rgba(0, 0, 0, 0.16)',
    justifyContent: 'space-evenly',
    borderRadius: 24,
    height: 282,
  },
});
