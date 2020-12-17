import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Platform,
  StatusBar,
  UIManager,
  ScrollView,
  Keyboard,
} from 'react-native';
import {
  BarStatus,
  Button,
  HeaderCustom,
  KeyBoardScroll,
} from '../../../component';
import {
  widthPercentageToDP,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {Colors} from '../../../../utlis';
import Info from './component/info';
import UpdateInfo from './component/updateInfo';
import {_global} from '../../../../utlis/global/global';
import ModalTime from './component/ModalTime';

import moment from 'moment';
import DateTimePicker from '@react-native-community/datetimepicker';
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
  const {navigation, updateProfile, token, getProfile, auth} = props;
  const [user, setUser] = useState(auth);
  const [dateChange, setDateChange] = useState(new Date());

  useEffect(() => {
    getProfile({access_token: token});
  }, []);

  const isVNPhoneMobile = /^(0|\+84)(\s|\.)?((3[2-9])|(5[689])|(7[06-9])|(8[1-689])|(9[0-46-9]))(\d)(\s|\.)?(\d{3})(\s|\.)?(\d{3})$/;
  const regId = /(\d{12})|(\d{9})/;
  const [update] = useState(false);
  const [show, setShow] = useState(false);
  const [showBank, setShowBank] = useState(false);
  const [showGene, setShowGene] = useState(false);
  const [showPicker, setShowPicker] = useState(false);

  const goBack = () => {
    navigation.goBack();
  };

  const onChangeName = (val) => {
    setUser({...user, fullname: val});
  };
  // const onSetTech = () => {
  //   setBankName('Techcombank');
  // };
  // const onSetBIDV = () => {
  //   setBankName('BIDV');
  // };
  // const onSetAgri = () => {
  //   setBankName('Agribank');
  // };
  // const onSetVCB = () => {
  //   setBankName('Vietcombank');
  // };
  // const onSetVPB = () => {
  //   setBankName('VPBank');
  // };
  // const onSetVTB = () => {
  //   setBankName('VietinBank');
  // };

  const onChangePhone = (val) => {
    setUser({...user, phone_number: val});
  };

  // const onChangeAccount = (val) => {
  //   setBankAccount(val);
  // };

  const onChangeBirthday = (event, val) => {
    const pickDate = val || moment(user.birthday, 'DD/MM/YYYY').toDate();
    if (Platform.OS === 'ios') {
      setShowPicker(Platform.OS === 'ios');
      console.log('=>>>>>>>', pickDate);
      setDateChange(val);
    } else {
      if (event.type === 'set') {
        console.log('here');
        setShowPicker(false);
        setUser({...user, birthday: moment(pickDate).format('DD/MM/YYYY')});
        setDateChange(pickDate);
      } else {
        setShowPicker(false);
      }
    }
  };

  const onConfirmBirthday = () => {
    setShow(false);
    setUser({...user, birthday: moment(dateChange).format('DD/MM/YYYY')});
  };

  // const onHideGene = () => {
  //   setShowGene(false);
  // };

  const onChangeIdentity = (val) => {
    setUser({...user, identity_number: val});
  };

  const onChangeAddress = (val) => {
    setUser({...user, address: val});
  };

  const onShowModal = () => {
    setShow(true);
    Keyboard.dismiss();
    setShowPicker(true);
  };

  const onPick = () => {
    navigation.navigate(langs.navigator.selectBank, {
      onChangeBank,
      bank: user.bank,
    });
  };

  const onChangeBank = (value) => {
    navigation.goBack();
    setUser({...user, bank: value});
  };

  const onChangeBankAccount = (value) => {
    setUser({...user, bank_account: value});
  };

  const onHideModal = () => {
    setShow(false);
  };

  const onAlertCopy = () => {
    _global.Alert.alert({
      title: langs.alert.deviceID,
      message: auth.deviceId,
      messageColor: Colors.black,
      leftButton: {
        text: langs.alert.copy,
        onPress: onCopyDeviceID,
        textStyle: {color: Colors.background},
      },
    });
  };

  const onCopyDeviceID = () => {
    Clipboard.setString(`${auth.deviceId}`);
  };

  const onUpdateInfo = () => {
    const data = {
      fullname: user.fullname,
      phone_number: user.phone_number,
      birthday: user.birthday,
      address: user.address,
      token: user.token,
      identity_number: user.identity_number,
      bank_name: user.bank,
      bank_account: user.bank_account,
    };

    if (!isVNPhoneMobile.test(user.phone_number)) {
      _global.Alert.alert({
        title: langs.alert.notify,
        message: langs.alert.wrongVinaphone,
        leftButton: {text: langs.alert.ok},
      });
    } else {
      updateProfile(data);
    }
  };

  return (
    <>
      <BarStatus
        backgroundColor={Colors.white}
        height={Platform.OS === 'ios' ? 26 : StatusBar.currentHeight}
      />
      <HeaderCustom title={'Khai báo thông tin'} goBack={goBack} />
      <KeyBoardScroll contentContainerStyle={styles.container}>
        <Card style={styles.card}>
          <UpdateInfo
            name={user.fullname}
            team={user.team_name}
            role={user.role}
            birthday={user.birthday}
            onChangeBirthday={onShowModal}
            onChangeName={onChangeName}
            nativeLand={user.address}
            identity={user.identity_number}
            phone={user.phone_number}
            bankAccount={user.bank_account}
            onChangeNative={onChangeAddress}
            onChangePhone={onChangePhone}
            onChangeBank={onPick}
            onChangeIdentity={onChangeIdentity}
            onChangeBankAccount={onChangeBankAccount}
            bankName={user.bank}
            deviceId={user.deviceId}
            onCopyDeviceID={onAlertCopy}
          />
        </Card>
        <Button
          title={langs.update}
          containerStyle={styles.complete}
          onPress={onUpdateInfo}
        />
        {Platform.OS === 'ios' ? (
          <ModalTime
            showModal={show}
            hideModal={onHideModal}
            onConfirm={onConfirmBirthday}
            picker={
              <View style={styles.picker}>
                <DateTimePicker
                  value={dateChange}
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
              value={dateChange}
              mode={'date'}
              display="default"
              onChange={onChangeBirthday}
              locale="vi-VI"
            />
          )
        )}
      </KeyBoardScroll>
    </>
  );
}

export default UpdateProfile;

const styles = StyleSheet.create({
  container: {
    padding: 24,
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
    flex: 1,
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
