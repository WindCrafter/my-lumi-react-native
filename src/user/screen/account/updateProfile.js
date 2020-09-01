import React, { useState, useEffect, useRef } from 'react';
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
} from 'react-native';
import { BarStatus, HeaderCustom } from '../../../component';
import {
  widthPercentageToDP as wp,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import { Colors, imgs } from '../../../../utlis';
import Info from './component/info';
import UpdateInfo from './component/updateInfo';
import { _global } from '../../../../utlis/global/global';
import ModalTime from './component/ModalTime';
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

  const onChangePhone = (val) => {
    setPhone(val);
  };

  const onChangeBirthday = (event, val) => {
    const pickDate = val || moment(birthday, 'DD/MM/YYYY').toDate();
    setShowPicker(Platform.OS === 'ios');
    console.log('=>>>>>>>', pickDate)
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
      },
      token: token,
    };
    if (!isVNPhoneMobile.test(phone)) {
      _global.Alert.alert({
        title: 'Thông báo',
        message: 'Sai định dạng số điện thoại',
        messageColor: Colors.danger,
        leftButton: { text: 'OK' },
      });
    }
    if (update && !(gene === 'Nam' || gene === 'Nữ' || gene === 'Khác')) {
      _global.Alert.alert({
        title: 'Thông báo',
        message: 'Vui lòng điền đúng định dạng: Nam/Nữ/Khác',
        messageColor: Colors.danger,
        leftButton: { text: 'OK' },
      });
    }
    if (!regId.test(identity)) {
      _global.Alert.alert({
        title: 'Thông báo',
        message: 'Sai định dang CCCD/CMND',
        messageColor: Colors.danger,
        leftButton: { text: 'OK' },
      });
    } else {
      updateProfile(data);
      navigation.goBack();
    }
  };

  return (
    <View style={styles.view}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.select({
          ios: () => 0,
          android: () => 0,
        })()}>
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
          {update ? (
            <UpdateInfo
              birthday={birthday}
              gene={gene}
              onChangeGene={onChangeGene}
              onChangeBirthday={onShowModal}
            />
          ) : null}
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
      </KeyboardAvoidingView>
      {!update ? (
        <View style={styles.viewButton}>
          <TouchableOpacity style={styles.button} onPress={onExtend}>
            <Text style={styles.txtButton}>Mở rộng </Text>
          </TouchableOpacity>
        </View>
      ) : null}
    </View>
  );
}

export default UpdateProfile;

const styles = StyleSheet.create({
  container: {
    flex: 3,
    backgroundColor: '#ffffff',
    marginBottom: 16,
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
