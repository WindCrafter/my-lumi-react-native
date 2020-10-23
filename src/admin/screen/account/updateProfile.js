import React, {useState, useEffect, useRef} from 'react';
import {
  StyleSheet,
  View,
  Platform,
  StatusBar,
  FlatList,
  LayoutAnimation,
  Image,
  UIManager,
  ScrollView,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Modal,
} from 'react-native';
import {BarStatus, HeaderCustom} from '../../../component';
import {
  widthPercentageToDP as wp,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {Colors, imgs} from '../../../../utlis';
import Info from './component/info';
import UpdateInfo from './component/updateInfo';
import {_global} from '../../../../utlis/global/global';
import ModalTime from './component/ModalTime';
import ModalBank from './component/ModalBank';

import moment from 'moment';
import DateTimePicker from '@react-native-community/datetimepicker';

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
    birthdayUser,
  } = props;
  const step = useRef(null);
  const isVNPhoneMobile = /^(0|\+84)(\s|\.)?((3[2-9])|(5[689])|(7[06-9])|(8[1-689])|(9[0-46-9]))(\d)(\s|\.)?(\d{3})(\s|\.)?(\d{3})$/;
  const regId = /(\d{12})|(\d{9})/;
  const [update, setUpdate] = useState(false);
  const [show, setShow] = useState(false);
  const [showBank, setShowBank] = useState(false);

  const [showPicker, setShowPicker] = useState(false);
  const [name, setName] = useState(nameUser);
  const [phone, setPhone] = useState(phoneNumber);
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
  const onExtend = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
    setUpdate(!update);
  };

  const goBack = () => {
    navigation.goBack();
  };

  const onChangeName = (val) => {
    setName(val);
  };
  const onSetTech = () => {
    setBankName('Techcom Bank');
  };
  const onSetBIDV = () => {
    setBankName('BIDV');
  };
  const onSetAgri = () => {
    setBankName('Agribank');
  };
  const onSetVCB = () => {
    setBankName('VietcomBank');
  };
  const onSetVPB = () => {
    setBankName('VP Bank');
  };
  const onSetVTB = () => {
    setBankName('Viettin Bank');
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

  const onChangeGene = (val) => {
    setGene(val);
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
    setShowBank(!showBank);
  };
  const onHideModal = () => {
    setShow(false);
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
        title: 'TestNotify',
        message: 'Sai định dạng số điện thoại',
        messageColor: Colors.danger,
        leftButton: {text: 'OK'},
      });
    }
    if (update && !(gene === 'Nam' || gene === 'Nữ' || gene === 'Khác')) {
      _global.Alert.alert({
        title: 'TestNotify',
        message: 'Vui lòng điền đúng định dạng: Nam/Nữ/Khác',
        messageColor: Colors.danger,
        leftButton: {text: 'OK'},
      });
    }
    if (!regId.test(identity)) {
      _global.Alert.alert({
        title: 'TestNotify',
        message: 'Sai định dang CCCD/CMND',
        messageColor: Colors.danger,
        leftButton: {text: 'OK'},
      });
    } else {
      updateProfile(data);
      navigation.goBack();
    }
  };

  return (
    <View style={styles.view}>
      <KeyboardAvoidingView style={styles.container}>
        <BarStatus
          backgroundColor={Colors.white}
          height={Platform.OS === 'ios' ? 46 : StatusBar.currentHeight}
        />
        <HeaderCustom
          title={'Khai báo thông tin'}
          height={60}
          goBack={goBack}
          rightButton
          textPress={true}
          onRight={onUpdateInfo}
        />
        <ScrollView showsVerticalScrollIndicator={false} style={styles.scroll}>
          <Info
            name={name}
            phone={phone}
            identity={identity}
            nativeLand={nativeLand}
            onChangeNative={onChangeNativeLand}
            onChangePhone={onChangePhone}
            onChangeName={onChangeName}
            onChangeIdentity={onChangeIdentity}
          />

          <UpdateInfo
            birthday={birthday}
            gene={gene}
            onChangeGene={onChangeGene}
            onChangeBirthday={onShowModal}
            onChangeBank={onPick}
            bankName={bankName}
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
            />
          )
        )}
        {showBank ? (
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
          />
        ) : null}
      </KeyboardAvoidingView>
    </View>
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
