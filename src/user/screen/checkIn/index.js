import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  StatusBar,
  Keyboard,
  Platform,
} from 'react-native';
import {Card} from 'native-base';
import Icon from 'react-native-vector-icons/Feather';
import langs from '../../../../common/language';
import {HeaderCheck} from '../../../component';
import {Colors} from '../../../../utlis';
import {imgs} from '../../../../utlis';
import ModalQR from './component/ModalQR';
import moment from 'moment';
import ModalCode from './component/ModalCode';
import ModalWifi from './component/ModalWifi';
import NetInfo from '@react-native-community/netinfo';

import {PERMISSIONS, check, request, RESULTS} from 'react-native-permissions';
const CheckIn = (props) => {
  const {navigation, checkIn, deviceId, token, goHistory, checkInWifi} = props;
  // console.log(checkInWifi)
  const [showQR, setShowQR] = useState(false);
  const [showCode, setShowCode] = useState(false);
  const [showWifi, setShowWifi] = useState(false);
  const [ssidUser, setSsidUser] = useState('');
  const [bssidUser, setBssidUser] = useState('');
  const [code, setCode] = useState('');
  const [type, setType] = useState(true);
  const onQRCode = () => {
    setShowQR(true);
  };
  const onHideModalQR = () => {
    setShowQR(false);
  };
  const onCode = () => {
    setShowCode(true);
  };
  const onWifi = () => {
    setShowWifi(true);
  };
  const onHideModalCode = () => {
    setShowCode(false);
    Keyboard.dismiss();
  };
  const onHideModalWifi = () => {
    setShowWifi(false);
  };

  const onChangeType = () => {
    setType(!type);
  };

  const onCheckInCode = () => {
    const data = {
      time: moment().format('HH:mm'),
      deviceId: deviceId,
      codeString: code,
      type: type ? 'in' : 'out',
      token: token,
    };
    checkIn(data);
    setShowCode(false);
    setCode('');
    Keyboard.dismiss();
  };
  const onCheckInWifi = () => {
    console.log(token);
    const data = {
      ssid: ssidUser,
      bssid: bssidUser,
      type: type ? 'in' : 'out',
      deviceId: deviceId,
      token: token,

      
    };

    checkInWifi(data);
    console.log(ssidUser)
    setShowWifi(false);
  };
  const initWifi = async () => {
    try {
      let state = await NetInfo.fetch('wifi');

      setSsidUser(state.details.ssid);
      setBssidUser(state.details.bssid);
      onCheckInWifi();
      console.log('Your current connected wifi ssidUser is ' + ssidUser);
      console.log('Your current BssidUser is ' + bssidUser);
    } catch (error) {
      setSsidUser('Cannot get current ssidUser!' + error.message);
      setBssidUser('Cannot get current BssidUser!' + error.message);
      console.log('Cannot get current ssidUser!', {error});
    }
  };
  const requestLocationPermission = async () => {
    try {
      const granted = await request(
        Platform.select({
          android: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
          ios: PERMISSIONS.IOS.LOCATION_ALWAYS,
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
      time: moment().format('HH:mm'),
      deviceId: deviceId,
      codeString: e.data,
      type: type ? 'in' : 'out',
      token: token,
    };
    checkIn(data);
    setShowQR(false);
  };

  return (
    <Card style={styles.container}>
      <HeaderCheck
        title={langs.checkIn}
        type={type ? 'Check In' : 'Check Out'}
        onPress={onChangeType}
        pressHistory={goHistory}
      />
      <View style={styles.detail}>
        <TouchableOpacity style={styles.viewMid} onPress={onQRCode}>
          <Card style={styles.card}>
            <View style={styles.body}>
              <Image source={imgs.blueQrcode} style={styles.image} />
              <Text style={styles.txtCheck}>Chấm công bằng QR code</Text>
            </View>
            <Icon name="chevron-right" size={32} color={Colors.background} />
          </Card>
        </TouchableOpacity>
        <TouchableOpacity style={styles.viewMid} onPress={onWifi}>
          <Card style={styles.card}>
            <View style={styles.body}>
              <Image source={imgs.wifiblue} style={styles.image} />
              <Text style={styles.txtCheck}>Chấm công bằng Wifi</Text>
            </View>
            <Icon name="chevron-right" size={32} color={Colors.background} />
          </Card>
        </TouchableOpacity>
        <TouchableOpacity style={styles.viewMid} onPress={onCode}>
          <Card style={styles.card}>
            <View style={styles.body}>
              <Image source={imgs.checkIcon} style={styles.image} />
              <Text style={styles.txtCheck}>Chấm công bằng mã</Text>
            </View>
            <Icon name="chevron-right" size={32} color={Colors.background} />
          </Card>
        </TouchableOpacity>
        <View style={styles.nothing} />
      </View>
      <ModalQR
        showModal={showQR}
        hideModal={onHideModalQR}
        onCheckIn={onCheckIn}
      />
      <ModalCode
        code={code}
        onChangeCode={onChangeCode}
        showModal={showCode}
        hideModal={onHideModalCode}
        onCheckIn={onCheckInCode}
      />
      <ModalWifi
        showModal={showWifi}
        hideModal={onHideModalWifi}
        onCheckInWifi={requestLocationPermission}
        ssidUser={ssidUser}
        bssidUser={bssidUser}
      />
    </Card>
  );
};

export default CheckIn;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '90%',
    alignSelf: 'center',
    borderRadius: 24,
    paddingBottom: 10,
  },
  detail: {
    flex: 4,
  },
  viewTop: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 18,
  },
  viewMid: {
    flex: 1,
    alignItems: 'center',
    marginTop: 10,
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
  txtCheck: {
    fontSize: 17,
    fontWeight: '400',
    alignSelf: 'center',
    paddingHorizontal: 12,
  },
  nothing: {
    flex: 2,
  },
  image: {width: 24, height: 24, alignSelf: 'center'},
  body: {flexDirection: 'row'},
});
