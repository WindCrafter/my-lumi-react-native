import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Platform,
  StatusBar,
  UIManager,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import {BarStatus, HeaderCustom} from '../../../component';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {Colors} from '../../../../utlis';
import Info from './component/info';
import UpdateInfo from './component/updateInfo';
import {_global} from '../../../../utlis/global/global';
import ModalTime from './component/ModalTime';
import ModalBank from './component/ModalBank';

import moment from 'moment';
import DateTimePicker from '@react-native-community/datetimepicker';
import ModalGene from './component/ModalGene';
import ModalTeam from './component/ModalTeam';
import Clipboard from '@react-native-community/clipboard';
import langs from '../../../../common/language';

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

function UpdateProfile(props) {
  const {
    navigation,
    nameUser,
    phoneNumber,
    updateProfile,
    token,
    advance,
    teamUser,
    birthdayUser,
    deviceId,
    teams,
  } = props;
  const isVNPhoneMobile = /^(0|\+84)(\s|\.)?((3[2-9])|(5[689])|(7[06-9])|(8[1-689])|(9[0-46-9]))(\d)(\s|\.)?(\d{3})(\s|\.)?(\d{3})$/;
  const regId = /(\d{12})|(\d{9})/;
  const [update] = useState(false);
  const [show, setShow] = useState(false);
  const [showBank, setShowBank] = useState(false);
  const [showGene, setShowGene] = useState(false);
  const [showPicker, setShowPicker] = useState(false);
  const [showTeam, setShowTeam] = useState(false);
  const [name, setName] = useState(nameUser);
  const [phone, setPhone] = useState(phoneNumber);
  const [team, setTeam] = useState(teamUser);
  const [birthday, setBirthDay] = useState(
    birthdayUser ? birthdayUser : moment(new Date()).format('DD/MM/YYYY'),
  );
  const [gene, setGene] = useState(
    advance && advance.gene ? advance.gene : null,
  );
  const [identity, setIdentity] = useState(
    advance && advance.identity ? advance.identity : null,
  );
  const [nativeLand, setNativeLand] = useState(
    advance && advance.nativeLand ? advance.nativeLand : null,
  );
  const [bankAccount, setBankAccount] = useState(
    advance && advance.bankAccount ? advance.bankAccount : null,
  );
  const [bankName, setBankName] = useState(
    advance && advance.bankName ? advance.bankName : null,
  );

  const goBack = () => {
    navigation.goBack();
  };

  const onChangeName = (val) => {
    setName(val);
  };
  const onSetTech = () => {
    setBankName('Techcombank');
  };
  const onSetBIDV = () => {
    setBankName('BIDV');
  };
  const onSetAgri = () => {
    setBankName('Agribank');
  };
  const onSetVCB = () => {
    setBankName('Vietcombank');
  };
  const onSetVPB = () => {
    setBankName('VPBank');
  };
  const onSetVTB = () => {
    setBankName('VietinBank');
  };
  const onChangePhone = (val) => {
    setPhone(val);
  };
  const onChangeAccount = (val) => {
    setBankAccount(val);
  };
  const onChangeBirthday = (event, val) => {
    const pickDate = val || moment(birthday, 'DD/MM/YYYY').toDate();
    setShowPicker(Platform.OS === 'ios');
    console.log('=>>>>>>>', pickDate);
    setBirthDay(moment(pickDate).format('DD/MM/YYYY'));
  };

  const onShowGene = (val) => {
    setShowGene(true);
  };
  const onHideGene = () => {
    setShowGene(false);
  };
  const onChangeGene = (value) => {
    setGene(value);
  };

  const onShowTeam = (val) => {
    setShowTeam(true);
  };
  const onHideTeam = () => {
    setShowTeam(false);
  };
  const onChangeTeam = (value) => {
    setTeam(value);
  };

  const onChangeIdentity = (val) => {
    setIdentity(val);
  };

  const onChangeNativeLand = (val) => {
    setNativeLand(val);
  };

  const onShowModal = () => {
    setShow(true);
    setShowPicker(!showPicker);
  };
  const onPick = () => {
    setShowBank(true);
  };
  const onDonePick = () => {
    // if (bankAccount === '1') {
    //   _global.Alert.alert({
    //     title: 'DeviceID',
    //     message: deviceId,
    //     messageColor: Colors.black,
    //     leftButton: {
    //       text: 'Copy',
    //       onPress: onCopyDeviceID,
    //       textStyle: {color: Colors.background},
    //     },
    //   });
    // } else {
    //   console.log('bank    ',bankAccount)
    setShowBank(!showBank);
    // }
  };
  const onHideModal = () => {
    setShow(false);
  };

  const onAlertCopy = () => {
    _global.Alert.alert({
      title: langs.alert.deviceID,
      message: deviceId,
      messageColor: Colors.black,
      leftButton: {
        text: langs.alert.copy,
        onPress: onCopyDeviceID,
        textStyle: {color: Colors.background},
      },
    });
  };

  const onCopyDeviceID = () => {
    Clipboard.setString(`${deviceId}`);
  };

  const onUpdateInfo = () => {
    const data = {
      name: name,
      phoneNumber: phone,
      birthday: birthday,
      advance: {
        identity: identity,
        nativeLand: nativeLand,
        gene: gene,
        bankAccount: bankAccount,
        bankName: bankName,
      },
      token: token,
    };
    if (!isVNPhoneMobile.test(phone)) {
      _global.Alert.alert({
        title: langs.alert.notify,
        message: langs.alert.wrongVinaphone,
        messageColor: Colors.danger,
        leftButton: {text: langs.alert.ok},
      });
    }
    if (update && !(gene === 'Nam' || gene === 'Nữ' || gene === 'Khác')) {
      _global.Alert.alert({
        title: langs.alert.notify,
        message: langs.alert.invalidGene,
        messageColor: Colors.danger,
        leftButton: {text: langs.alert.ok},
      });
    }
    if (!regId.test(identity)) {
      _global.Alert.alert({
        title: langs.alert.notify,
        message: langs.alert.wrongIdentity,
        messageColor: Colors.danger,
        leftButton: {text: langs.alert.ok},
      });
    } else {
      updateProfile(data);
      navigation.goBack();
    }
  };

  return (
    <>
      <BarStatus
        backgroundColor={Colors.white}
        height={Platform.OS === 'ios' ? 46 : StatusBar.currentHeight}
      />
      <HeaderCustom
        title={'Khai báo thông tin'}
        goBack={goBack}
        rightButton
        textPress={true}
        onRight={onUpdateInfo}
      />
      <ScrollView style={styles.view} showsVerticalScrollIndicator={false}>
        <KeyboardAvoidingView style={styles.container}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={styles.scroll}>
            <Info
              name={name}
              phone={phone}
              identity={identity}
              nativeLand={nativeLand}
              team={team}
              onChangeNative={onChangeNativeLand}
              onChangePhone={onChangePhone}
              onChangeName={onChangeName}
              onChangeIdentity={onChangeIdentity}
              onChangeTeam={onShowTeam}
            />

            <UpdateInfo
              birthday={birthday}
              gene={gene}
              onChangeGene={onShowGene}
              onChangeBirthday={onShowModal}
              onChangeBank={onPick}
              bankName={bankName}
              deviceId={deviceId}
              onCopyDeviceID={onAlertCopy}
            />
          </ScrollView>
          {Platform.OS === 'ios' ? (
            <ModalTime
              showModal={show}
              hideModal={onHideModal}
              picker={
                <View style={styles.picker}>
                  <DateTimePicker
                    value={moment(birthday, 'DD/MM/YYYY').toDate()}
                    mode={'date'}
                    display="default"
                    onChange={onChangeBirthday}
                    locale="vi-VI"
                  />
                </View>
              }
            />
          ) : (
            showPicker && (
              <DateTimePicker
                value={moment(birthday, 'DD/MM/YYYY').toDate()}
                mode={'date'}
                display="default"
                onChange={onChangeBirthday}
                locale="vi-VI"
              />
            )
          )}
          <ModalBank
            showModal={showBank}
            hideModal={onDonePick}
            onSetVTB={onSetVTB}
            onSetBIDV={onSetBIDV}
            onSetTech={onSetTech}
            onSetAgri={onSetAgri}
            onSetVCB={onSetVCB}
            onSetVPB={onSetVPB}
            onBankAccount={onChangeAccount}
            bankName={bankName}
          />
          <ModalGene
            showModal={showGene}
            hideModal={onHideGene}
            detailGene={gene}
            pressItem={(e) => onChangeGene(e)}
          />
          <ModalTeam
            showModal={showTeam}
            hideModal={onHideTeam}
            detailTeam={team}
            dataTeam={teams}
            pressItem={(e) => onChangeTeam(e)}
          />
        </KeyboardAvoidingView>
      </ScrollView>
    </>
  );
}

export default UpdateProfile;

const styles = StyleSheet.create({
  container: {
    flex: 3,
    backgroundColor: '#ffffff',
  },
  viewButton: {
    flex: 0.5,
  },
  button: {
    width: wp(85),
    alignSelf: 'center',
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 32,
    backgroundColor: Colors.background,
  },
  txtButton: {
    fontSize: 20,
    fontWeight: '600',
    color: Colors.white,
  },
  scrollView: {
    paddingTop: 8,
  },
  picker: {
    width: wp(100),
  },
  scroll: {
    paddingTop: 16,
  },
  view: {
    flex: 1,
    backgroundColor: Colors.white,
  },
});
