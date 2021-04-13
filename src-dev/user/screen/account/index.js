import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  StatusBar,
  Linking,
  ScrollView,
  Switch,
  Alert,
  Platform,
  PermissionsAndroid,
} from 'react-native';
import {
  PERMISSIONS,
  request,
  RESULTS,
  openSettings,
} from 'react-native-permissions';
import codePush from 'react-native-code-push';
import { Card } from 'native-base';
import { Colors, imgs } from '../../../../utlis';
import { BarStatus, HeaderAccount } from '../../../component';
import RoundedView from './component/RoundedView';
import ModalInforApp from './component/ModalInforApp';
import { _global } from '../../../../utlis/global/global';
import langs from '../../../../common/language';

const Account = (props) => {
  const {
    logOut,
    nameUser,
    navigation,
    getListUsers,
    token,
    oneSignalID,
    // getListTeams,
    resetCheck,
    changeDemoMode,
    demoMode,
    codepush,
    avatar,
    removeUserIdDevice,
  } = props;

  const [showModal, setshowModal] = useState(false);

  const onLogOut = () => {
    _global.Alert.alert({
      title: langs.alert.notify,
      message: langs.alert.questSignOut,
      leftButton: {
        text: langs.alert.signOut,
        onPress: () => onRemoveUserId(),
        textStyle: { color: Colors.danger },
      },
      rightButton: { text: langs.alert.cancel },
    });
  };

  const onRemoveUserId = () => {
    logOut();
    const data = {
      deviceId: oneSignalID,
      token,
    };
    removeUserIdDevice(data);
    resetCheck();
  };

  const gotoKpi = () => {
    navigation.navigate(langs.navigator.kpi);
  };

  const onShowModal = async () => {
    setshowModal(true);
  };

  const onHideModal = () => {
    setshowModal(false);
  };

  const onMoveToProfile = () => {
    navigation.navigate(langs.navigator.updateProfile);
  };
  const onMoveToContact = () => {
    navigation.navigate(langs.navigator.contact);
  };
  const onMoveToChangePass = () => {
    navigation.navigate(langs.navigator.changePass);
  };
  const openUrl = () => {
    Linking.openURL('https://lumi.vn');
  };

  const restartApp = () => {
    codePush.restartApp();
  };

  const onDemo = () => {};
  return (
    <>
      <BarStatus
        backgroundColor={Colors.white}
        height={Platform.OS === 'ios' ? 36 : StatusBar.currentHeight}
      />
      <View style={styles.container}>
        <HeaderAccount shadow title={langs.account} sub={langs.setting} />
        <ScrollView showsVerticalScrollIndicator={false}>
          <RoundedView
            leftImage={
              avatar ? { uri: avatar } : require('../../../../naruto.jpeg')
            }
            title={nameUser}
            rightImage={imgs.next}
            tintColor="grey"
            fontSize={16}
            onPressButton={onMoveToProfile}
            styleImg={styles.image}
            styleName={styles.name}
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
              onPressButton={onMoveToChangePass}
            />
            <RoundedView
              leftImage={imgs.inforsolidblack}
              title={langs.infoApp}
              onPressButton={onShowModal}
            />
            <RoundedView
              leftImage={imgs.KPI}
              title={langs.kpiConfirm}
              onPressButton={gotoKpi}
            />
            <Card style={styles.row}>
              <View style={{ flexDirection: 'row' }}>
                <Image source={imgs.changeIcon} style={styles.imgClear} />
                <Text style={styles.txtDemo}>Trạng thái</Text>
              </View>
              <Switch
                trackColor={{ false: '#767577', true: '#0db14b' }}
                thumbColor={demoMode ? '#ffffff' : '#f4f3f4'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={changeDemoMode}
                value={demoMode}
              />
            </Card>
            <RoundedView
              leftImage={imgs.logout}
              title={langs.logOut}
              onPressButton={onLogOut}
            />
          </View>
          <View style={{ alignSelf: 'center', paddingVertical: 10 }}>
            {codepush.progress === 0 ? null : codepush.progress === 100 ? (
              <TouchableOpacity onPress={restartApp}>
                <Text>Cần khởi động lại</Text>
              </TouchableOpacity>
            ) : (
              <Text>{`Đang cập nhật : ${parseInt(codepush.progress)}%`}</Text>
            )}
          </View>
        </ScrollView>
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
    flex: 1,
    alignItems: 'center',
    marginTop: 16,
  },
  bot: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  bottomDetail: { width: '90%' },
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
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    textAlignVertical: 'center',
    width: '90%',
    paddingVertical: 20,
    paddingHorizontal: 24,
    borderRadius: 16,
    marginTop: 8,

    borderWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.gray,
    backgroundColor: 'white',
    height: 64,
  },
  txtDemo: {
    fontSize: 18,
    color: 'black',
    marginLeft: 10,
  },
});
