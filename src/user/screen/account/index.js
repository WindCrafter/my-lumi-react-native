import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  StatusBar,
  Linking,
} from 'react-native';
import {Colors} from '../../../../utlis';
import {BarStatus} from '../../../component';
import HeaderAccount from './component/HeaderAccount';
import RoundedView from './component/RoundedView';
import {Card} from 'native-base';
import ModalInforApp from './component/ModalInforApp';
import {imgs} from '../../../../utlis';
import {_global} from '../../../../utlis/global/global';
import langs from '../../../../common/language';
const Account = (props) => {
  const {
    logOut,
    nameUser,
    navigation,
    // getListUsers,
    token,
    oneSignalID,
    // getListTeams,
    kickAssign,
    resetCheck,
  } = props;
  const [showModal, setshowModal] = useState(false);

  const onLogOut = () => {
    _global.Alert.alert({
      title: langs.alert.notify,
      message: langs.alert.questSignOut,
      messageColor: Colors.danger,
      leftButton: {
        text: langs.alert.signOut,
        onPress: () => onRemoveUserId(),
        textStyle: {color: Colors.danger},
      },
      rightButton: {text: langs.alert.cancel},
    });
  };
  const onRemoveUserId = () => {
    logOut();
    const data = {
      deviceId: oneSignalID,
      token: token,
    };
    kickAssign();
    resetCheck();
  };
  const onShowModal = () => {
    setshowModal(true);
  };
  const onHideModal = () => {
    setshowModal(false);
  };

  const onMoveToProfile = () => {
    navigation.navigate('UpdateProfile');
  };
  const onMoveToContact = () => {
    navigation.navigate('Contact');
  };
  const openUrl = () => {
    Linking.openURL('https://lumi.vn');
    console.log('1');
  };
  return (
    <>
      <BarStatus />
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
            styleImg={styles.image}
          />
        </Card>
        <View style={styles.detail}>
          <Card style={styles.cardMid}>
            <RoundedView
              leftImage={imgs.meeting}
              title={'Danh sách Lumier'}
              rightImage={imgs.next}
              tintColor={'#3E30B2'}
              line={true}
              onPressButton={onMoveToContact}
            />
            <RoundedView
              leftImage={imgs.inforsolidblack}
              title={'Thông tin ứng dụng'}
              rightImage={imgs.next}
              tintColor={'#DE6D2E'}
              line={true}
              onPressButton={onShowModal}
            />
            <RoundedView
              leftImage={imgs.logout}
              title={'Đăng xuất'}
              rightImage={imgs.next}
              tintColor={'#EA4074'}
              line={false}
              onPressButton={onLogOut}
            />
          </Card>
        </View>
        <ModalInforApp
          showModal={showModal}
          hideModal={onHideModal}
          openUrl={openUrl}
        />
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
    marginTop: 16,
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
    height: 240,
  },
  image: {
    height: 36,
    width: 36,
    borderRadius: 18,
    alignSelf: 'center',
  },
});
