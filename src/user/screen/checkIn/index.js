import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  StatusBar,
  Keyboard,
} from 'react-native';
import { Card } from 'native-base';
import Icon from 'react-native-vector-icons/Feather';
import langs from '../../../../common/language';
import { HeaderCheck } from '../../../component';
import { Colors } from '../../../../utlis';
import { imgs } from '../../../../utlis';
import ModalQR from './component/ModalQR';
import moment from 'moment';
import ModalCode from './component/ModalCode';

const CheckIn = (props) => {
  const { navigation, checkIn, deviceId, token } = props;
  const [showQR, setShowQR] = useState(false);
  const [showCode, setShowCode] = useState(false);
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
  const onHideModalCode = () => {
    setShowCode(false);
    Keyboard.dismiss();
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

  const onGoHistory = () => {
    navigation.navigate('History');
  };

  return (
    <View style={styles.container}>
      <HeaderCheck
        title={langs.checkIn}
        type={type ? 'Check In' : 'Check Out'}
        onPress={onChangeType}
        pressHistory={onGoHistory}
      />
      <View style={styles.detail}>
        <View style={styles.viewTop}>
          <Text style={styles.txtTop}>Vui lòng chọn hình thức chấm công :</Text>
        </View>
        <TouchableOpacity style={styles.viewMid} onPress={onQRCode}>
          <Card style={styles.card}>
            <View style={styles.body}>
              <Image source={imgs.blueQrcode} style={styles.image} />
              <Text style={styles.txtCheck}>Chấm công bằng QR code</Text>
            </View>
            <Icon name="chevron-right" size={32} color={Colors.background} />
          </Card>
        </TouchableOpacity>
        <TouchableOpacity style={styles.viewMid}>
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
    </View>
  );
};

export default CheckIn;

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    width: '90%',
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
    paddingVertical: 28,
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
  image: { width: 24, height: 24, alignSelf: 'center' },
  body: { flexDirection: 'row' },
});
