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
} from 'react-native';
import { BarStatus, HeaderCustom } from '../../../component';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
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
  const [name, setName] = useState(nameUser);
  const [phone, setPhone] = useState(phoneNumber);
  const [birthday, setBirthDay] = useState(
    birthdayUser ? birthdayUser : new Date(1598051730000),
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

  const goBack = () => {
    navigation.goBack();
  };
  const onNextstep = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
    step.current.scrollTo({ x: wp(100), y: 0, animated: true });
    setUpdate(true);
  };

  const onChangeName = (val) => {
    setName(val);
  };

  const onChangePhone = (val) => {
    setPhone(val);
  };

  const onChangeBirthday = (event, val) => {
    const pickDate = val || birthday;
    setBirthDay(pickDate);
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
    <View style={styles.container}>
      <BarStatus
        backgroundColor={Colors.white}
        height={Platform.OS === 'ios' ? 46 : StatusBar.currentHeight}
      />
      <HeaderCustom
        title={'Khai báo thông tin'}
        height={60}
        goBack={goBack}
        rightButton
        rightImage={imgs.KPI}
        onRight={onNextstep}
      />
      <ScrollView
        horizontal
        pagingEnabled
        contentContainerStyle={styles.scrollView}
        scrollEnabled={update}
        showsHorizontalScrollIndicator={false}
        ref={step}>
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
          identity={identity}
          nativeLand={nativeLand}
          onChangeNative={onChangeNativeLand}
          onChangeGene={onChangeGene}
          onChangeBirthday={onShowModal}
          onChangeIdentity={onChangeIdentity}
        />
      </ScrollView>
      <View style={styles.viewButton}>
        <TouchableOpacity style={styles.button} onPress={onUpdateInfo}>
          <Text style={styles.txtButton}>Khai báo thông tin </Text>
        </TouchableOpacity>
      </View>
      <ModalTime
        showModal={show}
        hideModal={onHideModal}
        picker={
          <View style={styles.picker}>
            <DateTimePicker
              value={birthday}
              mode={'date'}
              display="default"
              onChange={onChangeBirthday}
            />
          </View>
        }
      />
    </View>
  );
}

export default UpdateProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  viewButton: {
    flex: 0.5,
    justifyContent: 'center',
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
});
