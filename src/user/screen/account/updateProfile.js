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

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

function UpdateProfile(props) {
  const { navigation, nameUser, phoneNumber, updateProfile, token } = props;
  const step = useRef(null);
  const isVNPhoneMobile = /^(0|\+84)(\s|\.)?((3[2-9])|(5[689])|(7[06-9])|(8[1-689])|(9[0-46-9]))(\d)(\s|\.)?(\d{3})(\s|\.)?(\d{3})$/;
  const [update, setUpdate] = useState(false);
  const [name, setName] = useState(nameUser);
  const [phone, setPhone] = useState(phoneNumber);
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

  const onUpdateInfo = () => {
    const advance = {};
    const data = {
      name: name,
      phoneNumber: phone,
      advance: advance,
      token: token,
    };
    if (!isVNPhoneMobile.test(phone)) {
      _global.Alert.alert({
        title: 'Thông báo',
        message: 'Sai số điện thoại',
        leftButton: { text: 'OK' },
      });
    } else {
      updateProfile(data);
    }
  };

  return (
    <View style={styles.container}>
      <BarStatus
        backgroundColor={Colors.background}
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
        <Info name={nameUser} phoneNumber={phoneNumber} />
        <UpdateInfo
          name={name}
          phone={phone}
          onChangePhone={onChangePhone}
          onChangeName={onChangeName}
        />
      </ScrollView>
      <View style={styles.viewButton}>
        {update ? (
          <TouchableOpacity style={styles.button} onPress={onUpdateInfo}>
            <Text style={styles.txtButton}>Khai báo thông tin </Text>
          </TouchableOpacity>
        ) : null}
      </View>
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
});
