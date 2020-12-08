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
    navigation.navigate(langs.navigator.updateProfile);
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
        <HeaderAccount title={langs.account} sub={langs.setting} />
        <RoundedView
          leftImage={require('../../../../naruto.jpeg')}
          title={nameUser}
          rightImage={imgs.next}
          tintColor={'grey'}
          detail={'Team App'}
          fontSize={16}
          onPressButton={onMoveToProfile}
          styleImg={styles.image}
          styleName={styles.name}
          team={'Team App'}
        />
        <View style={styles.detail}>
          <RoundedView
            leftImage={imgs.meeting}
            title={langs.lumier}
            onPressButton={onMoveToContact}
          />
          <RoundedView
            leftImage={imgs.changePassIcon}
            title={langs.changePass}
            onPressButton={onShowModal}
          />
          <RoundedView
            leftImage={imgs.inforsolidblack}
            title={langs.infoApp}
            onPressButton={onShowModal}
          />
          <RoundedView
            leftImage={imgs.KPI}
            title={langs.kpiConfirm}
            onPressButton={onShowModal}
          />
          <RoundedView
            leftImage={imgs.logout}
            title={langs.logOut}
            onPressButton={onLogOut}
          />
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
    marginTop: 16,
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
    height: 40,
    width: 40,
    borderRadius: 20,
    alignSelf: 'center',
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
  },
});
