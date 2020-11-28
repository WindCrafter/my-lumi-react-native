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
import langs from '../../../../common/language';
const Account = (props) => {
  const {logOut, nameUser, emailUser, navigation} = props;
  const name = nameUser;
  const email = emailUser;
  const onLogOut = () => {
    logOut();
  };
  const onMoveToProfile = () => {
    navigation.navigate(langs.navigator.updateProfile);
  };
  const onMoveTContact = () => {
    navigation.navigate(langs.navigator.contact);
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
        <View style={{flex:0.2}}></View>
        <View style={styles.detail}>
          <Card style={styles.cardMid}>
            <RoundedView
              leftImage={imgs.KPI}
              title={'Quản lí KPI'}
              rightImage={imgs.next}
              tintColor={'#7CE3BF'}
              line={true}
            />
            <RoundedView
              leftImage={imgs.meeting}
              title={'Danh sách Lumier'}
              rightImage={imgs.next}
              tintColor={'#3E30B2'}
              line={true}
              onPressButton={onMoveTContact}
            />
            <RoundedView
              leftImage={imgs.inforsolidblack}
              title={'Thông tin ứng dụng'}
              rightImage={imgs.next}
              tintColor={'#DE6D2E'}
              line={true}
            />
            <RoundedView
              leftImage={imgs.logout}
              title={'Đăng xuất'}
              rightImage={imgs.next}
              tintColor={'#EA4074'}
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
    backgroundColor: Colors.white,
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
