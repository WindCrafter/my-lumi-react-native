import React, {useState, useRef} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  StatusBar,
  Keyboard,
  Platform,
  KeyboardAvoidingView,
  TextInput,
  ScrollView,
} from 'react-native';
import {Card} from 'native-base';
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
  // console.log(checkInWifi)

  const [ssidUser, setSsidUser] = useState('');
  const [bssidUser, setBssidUser] = useState('');
  const [code, setCode] = useState('');
  const [method, setMedthod] = useState('qr');
  const onChangeMethod = () => {
    if (type === 'in') {
      changeToOut();
    } else {
      changeToIn();
    }
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
        console.log(granted);
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
    switchTo();
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

  return (
    <View style={{flex: 1}}>
      <ScrollView
        ref={scrollRef}
        horizontal={true}
        pagingEnabled={true}
        scrollEnabled={false}
        showsHorizontalScrollIndicator={false}
        onScrollAnimationEnd={false}
        // style={{flex:1}}
      >
        <QRCodeScanner
          onRead={onCheckIn}
          reactivate={true}
          reactivateTimeout={3000}
          flashMode={RNCamera.Constants.FlashMode.off}
          cameraStyle={styles.camera}
          topViewStyle={styles.not}
          showMarker={true}
          // cameraProps={{ratio: '1:1'}}
          customMarker={<CusMarker />}
          bottomContent={
            <Text style={styles.titlemodal}>
              Di chuyển Camera vào vùng chứa mã bạn nhé.
            </Text>
          }
        />

        <View style={styles.pagetwo}>
          <View style={styles.viewMid}>
            <View style={styles.modalviewWifi}>
              <Card style={styles.cardWifi}>
                <View style={{flexDirection: 'row'}}>
                  <Image source={imgs.ssid} style={styles.iconWifi} />
                  <Text style={styles.txtTopWifi}>Tên wifi:</Text>

                  <Text style={styles.txtTopWifi}>{ssidUser}</Text>
                </View>
                <View style={{flexDirection: 'row'}}>
                  <Image source={imgs.bssid} style={styles.iconWifi} />
                  <Text style={styles.txtTopWifi}>Mã MAC:</Text>
                  <Text style={styles.txtTopWifi}>{bssidUser}</Text>
                </View>
              </Card>
              <TouchableOpacity style={styles.button} onPress={onCheckInWifi}>
                <Text style={styles.doneWifi}>Kết nối lại</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={styles.pagethree}>
          <View style={styles.viewMid}>
            <View style={styles.modalviewCode}>
              <Card style={styles.card}>
                <KeyboardAvoidingView style={styles.bodyCode}>
                  <Image source={imgs.key} style={styles.imageInputCode} />
                  <TextInput
                    style={styles.txtInputCode}
                    textAlign={'left'}
                    placeholder={'Nhập mã chấm công'}
                    placeholderTextColor={'gray'}
                    onChangeText={onChangeCode}
                    clearButtonMode={'while-editing'}
                    value={code}
                  />
                </KeyboardAvoidingView>
              </Card>
              <TouchableOpacity
                style={styles.touchableCode}
                onPress={onCheckInCode}>
                <Text style={styles.doneCode}>Xác nhận</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
      <HeaderCheck
        title={langs.checkIn}
        type={`Check-${type}`}
        onPressBack={onPressBack}
        onPressChange={onChangeMethod}
      />
      <Bottom
        method={method}
        onPressOne={PageQr}
        onPressTwo={PageWifi}
        onPressThree={PageCode}
      />
    </View>
  );
};

export default CheckIn;

const styles = StyleSheet.create({
  detail: {
    width: wp(100),
  },
  viewMid: {
    alignItems: 'center',
  },
  txtTop: {
    fontSize: 16,
  },
  card: {
    borderRadius: 24,
    width: '80%',
    alignSelf: 'center',
    backgroundColor: '#ffffff',
    overflow: 'hidden',
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    paddingHorizontal: 16,
    paddingVertical: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  image: {width: 24, height: 24, alignSelf: 'center'},
  body: {flexDirection: 'row'},
  pageone: {
    width: wp(100),
    justifyContent: 'center',
    backgroundColor: Colors.background,
  },
  pagetwo: {
    width: wp(100),
    justifyContent: 'center',
    backgroundColor: Colors.background,
    height: '100%',
    flex: 1,
  },
  pagethree: {
    width: wp(100),
    justifyContent: 'center',
    backgroundColor: Colors.background,
    height: '100%',
    flex: 1,
  },
  modalview: {
    borderRadius: 28,
    width: widthPercentageToDP(100),
    height: heightPercentageToDP(60),
    alignItems: 'center',
    justifyContent: 'center',
  },
  titlemodal: {
    fontWeight: '500',
    fontSize: 16,
    marginBottom: -20,
    color: 'white',
    width: '80%',
    textAlign: 'center',
  },
  camera: {
    height: hp(105),
    width: wp(100),
  },
  modalviewCode: {
    borderRadius: 24,
    width: widthPercentageToDP(85),
    height: heightPercentageToDP(35),
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 30,
  },
  touchableCode: {
    justifyContent: 'center',
    alignItems: 'center',
    resizeMode: 'contain',
    width: 132,
    height: 49,
    borderRadius: 16,
    backgroundColor: '#ffffff',
  },
  doneCode: {
    color: '#008aee',
    fontSize: 17,
    fontWeight: '500',
  },
  bodyCode: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 4,
    width: widthPercentageToDP(40),
  },
  imageInputCode: {
    alignSelf: 'center',
    marginRight: 8,
  },
  txtInputCode: {
    width: widthPercentageToDP(50),
  },
  modalviewWifi: {
    borderRadius: 24,
    width: 85,
    height: heightPercentageToDP(35),
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  txtTopWifi: {
    fontSize: 18,
    alignSelf: 'center',
  },
  cardWifi: {
    width: widthPercentageToDP(80),
    alignSelf: 'center',
    paddingVertical: 2,
    overflow: 'hidden',
    shadowColor: 'gray',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    height: 159,
    borderRadius: 16,
    backgroundColor: '#ffffff',
    justifyContent: 'space-evenly',
  },
  doneWifi: {
    color: '#008aee',
    fontSize: 16,
    fontWeight: '500',
  },
  iconWifi: {
    marginHorizontal: 16,
  },
  not: {flex: 0},
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.white,
    width: 132,
    height: 49,
    borderRadius: 16,
    marginTop: 70,
  },
});
