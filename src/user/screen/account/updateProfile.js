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
import {BarStatus, Button, HeaderCustom} from '../../../component';
import {
  widthPercentageToDP,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
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
import {Card} from 'native-base';

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
    addressUser,
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
  const [identity, setIdentity] = useState(
    advance && advance.identity ? advance.identity : null,
  );
  const [nativeLand, setNativeLand] = useState(addressUser);
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
  const onHideGene = () => {
    setShowGene(false);
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
      fullname: name,
      phone_number: phone,
      birthday: birthday,
      address: nativeLand,
      token: token,
    };
    if (
      name === nameUser &&
      phone === phoneNumber &&
      birthday === birthdayUser &&
      nativeLand === addressUser
    ) {
      navigation.goBack();
    } else {
      if (!isVNPhoneMobile.test(phone)) {
        _global.Alert.alert({
          title: langs.alert.notify,
          message: langs.alert.wrongVinaphone,
          messageColor: Colors.danger,
          leftButton: {text: langs.alert.ok},
        });
        // if (!regId.test(identity)) {
        //   _global.Alert.alert({
        //     title: langs.alert.notify,
        //     message: langs.alert.wrongIdentity,
        //     messageColor: Colors.danger,
        //     leftButton: {text: langs.alert.ok},
        //   });
        // }
      } else {
        updateProfile(data);
      }
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
      <KeyboardAvoidingView style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false} style={styles.scroll}>
          <Card style={styles.card}>
            <Info
              name={name}
              identity={identity}
              team={team}
              birthday={birthday}
              onChangeBirthday={onShowModal}
              onChangeName={onChangeName}
              onChangeIdentity={onChangeIdentity}
              onChangeTeam={onShowTeam}
            />
            <UpdateInfo
              nativeLand={nativeLand}
              phone={phone}
              onChangeNative={onChangeNativeLand}
              onChangePhone={onChangePhone}
              onChangeBank={onPick}
              bankName={bankName}
              deviceId={deviceId}
              onCopyDeviceID={onAlertCopy}
            />
          </Card>
          <Button
            title={langs.update}
            containerStyle={styles.complete}
            onPress={onUpdateInfo}
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
        <ModalTeam
          showModal={showTeam}
          hideModal={onHideTeam}
          detailTeam={team}
          dataTeam={teams}
          pressItem={(e) => onChangeTeam(e)}
        />
      </KeyboardAvoidingView>
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
  card: {
    width: widthPercentageToDP(100) - 32,
    alignSelf: 'center',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowColor: 'rgba(0, 0, 0, 0.16)',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 24,
    marginTop: 16,
    paddingVertical: 16,
  },
  complete: {
    backgroundColor: Colors.background,
  },
});
