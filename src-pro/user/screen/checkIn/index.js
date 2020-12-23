import React, {useState, useRef} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Keyboard,
  Platform,
  KeyboardAvoidingView,
  TextInput,
  ScrollView,
} from 'react-native';
import moment from 'moment';
import LinearGradient from 'react-native-linear-gradient';
import langs from '../../../../common/language';
import {HeaderCheck, Bottom} from '../../../component';
import {Colors} from '../../../../utlis';
import {imgs} from '../../../../utlis';

import NetInfo from '@react-native-community/netinfo';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {PERMISSIONS, request, RESULTS} from 'react-native-permissions';
// import {ScrollView} from 'react-native-gesture-handler';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {RNCamera} from 'react-native-camera';
import CusMarker from '../checkIn/CustomMarker';
import {
  widthPercentageToDP,
  heightPercentageToDP,
} from 'react-native-responsive-screen';

const CheckIn = (props) => {
  const {
    navigation,
    checkIn,
    deviceId,
    token,
    checkInWifi,
    switchTo,
    type,
    changeToOut,
    changeToIn,
  } = props;

  const [ssidUser, setSsidUser] = useState('');
  const [bssidUser, setBssidUser] = useState('');
  const [code, setCode] = useState('');
  const [method, setMedthod] = useState('qr');
  const onChangeMethod = () => {
    type === 'in' ? changeToOut() : changeToIn();
  };
  const onCheckInCode = () => {
    const data = {
      typeCheck: 'code',
      deviceId: deviceId,
      codeString: code,
      type: type,
      token: token,
    };
    checkIn(data);
    setCode('');
    Keyboard.dismiss();
  };
  const initWifi = async () => {
    try {
      let state = await NetInfo.fetch('wifi');
      const data = {
        ssid: state.details.ssid,
        bssid: state.details.bssid,
        type: type,
        deviceId: deviceId,
        token: token,
      };
      setSsidUser(state.details.ssid);
      setBssidUser(state.details.bssid);
      checkInWifi(data);
      console.log(
        'Your current connected wifi ssidUser is ' + state.details.ssid,
      );
      console.log('Your current BssidUser is ' + state.details.bssid);
    } catch (error) {
      setSsidUser('Cannot get current ssidUser!' + error.message);
      setBssidUser('Cannot get current BssidUser!' + error.message);
      console.log('Cannot get current ssidUser!', {error});
    }
  };
  const onCheckInWifi = () => {
    Platform.OS === 'ios' ? initWifi() : requestLocationPermission();
  };
  const requestLocationPermission = async () => {
    try {
      const granted = await request(
        Platform.select({
          android: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
          ios: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
        }),
        {
          title: 'YÊU CẦU VỊ TRÍ',
          message: 'Yêu cầu quyền truy cập vị trí ',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === RESULTS.GRANTED) {
        console.log('Thanh cong');
        initWifi();
      } else {
        console.log('Yêu cầu vị trí bị từ chối');
        console.log(RESULTS.GRANTED);
      }
    } catch (err) {
      console.warn(err);
    }
  };
  const onChangeCode = (value) => {
    setCode(value);
  };

  const onCheckIn = (e) => {
    const data = {
      deviceId: deviceId,
      codeString: e.data,
      type: type,
      typeCheck: 'qrCode',
      token: token,
    };
    checkIn(data);
  };
  const onPressBack = () => {
    navigation.goBack();
  };
  const scrollRef = useRef();

  const PageCode = () => {
    scrollRef.current.scrollTo({x: 2 * wp(100), y: 20, animated: true});
    setMedthod('code');
  };
  const PageQr = () => {
    scrollRef.current.scrollTo({x: 0, y: 20, animated: true});
    setMedthod('qr');
  };
  const PageWifi = () => {
    scrollRef.current.scrollTo({x: wp(100), y: 20, animated: true});
    setMedthod('wifi');
  };

  // const onPressCheck = () => {
  //   console.log('check');
  // };

  // const onBlur = () => {
  //   console.log('blur');
  //   Keyboard.dismiss();
  // };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS == 'ios' ? 'padding' : 'height'}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerLeft} onPress={onChangeMethod}>
          <Text style={styles.titleHeader}>{`Check-${type}`}</Text>
          <Image source={imgs.exchangeIcon} style={[styles.changeIcon]} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.cancel} onPress={onPressBack}>
          <Image source={imgs.cancel} style={[styles.iconCancel]} />
        </TouchableOpacity>
      </View>
      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{flexGrow: 1, justifyContent: 'center'}}>
        <View style={styles.card}>
          <View style={styles.headerCard}>
            <Text style={styles.txtTitleCard}>Ngày 20/11/2020</Text>
            <View style={styles.inputCode}>
              <Image source={imgs.key} style={[styles.iconKey]} />
              <TextInput placeholder="Nhập mã tại đây" style={styles.input} Î />
            </View>
            <Text style={styles.note}>
              Vui lòng thiên hệ với Leader/Hr để nhận mã.
            </Text>
          </View>
          <LinearGradient
            style={styles.footerCard}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 1}}
            colors={['rgb(13, 177, 75)', 'rgb(17, 153, 142)']}>
            <TouchableOpacity style={styles.footerCard} onPress={onPressCheck}>
              <Text style={styles.txtCheck}>Chấm công</Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default CheckIn;

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    paddingHorizontal: 24,
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    marginTop: 22,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  changeIcon: {
    tintColor: '#32ac4f',
  },
  titleHeader: {
    fontSize: 24,
    fontWeight: '700',
    color: '#32ac4f',
    width: 120,
  },
  iconCancel: {
    tintColor: Colors.white,
    width: 16,
    height: 16,
    resizeMode: 'stretch',
  },
  cancel: {
    width: 30,
    height: 30,
    borderRadius: 50,
    overflow: 'hidden',
    backgroundColor: Colors.gray,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
    // justifyContent: 'center',
  },
  card: {
    borderRadius: 16,
    backgroundColor: Colors.white,
    overflow: 'hidden',
  },
  headerCard: {
    paddingVertical: 50,
    paddingHorizontal: 16,
  },
  txtTitleCard: {
    fontSize: 24,
    color: '#0db14b',
    fontWeight: '500',
  },
  inputCode: {
    flexDirection: 'row',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: Colors.gray,
    marginTop: 70,
  },
  iconKey: {
    tintColor: '#0db14b',
  },
  input: {
    marginLeft: 10,
    paddingHorizontal: 10,
    fontFamily: 'Quicksand-Regular',
    flex: 1,
  },
  note: {
    marginTop: 50,
    color: 'rgba(0,0,0,0.6)',
  },
  footerCard: {
    alignItems: 'center',
    height: 50,
    justifyContent: 'center',
  },
  txtCheck: {
    color: Colors.white,
    fontSize: 20,
  },
});
