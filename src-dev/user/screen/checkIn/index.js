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
import {Colors} from '../../../../utlis';
import {imgs} from '../../../../utlis';

import NetInfo from '@react-native-community/netinfo';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {PERMISSIONS, request, RESULTS} from 'react-native-permissions';
import ModalTime from './components/ModalTime';

const CheckIn = (props) => {
  const {
    navigation,
    checkInCode,
    deviceId,
    token,
    checkInWifi,
    switchTo,
    type,
    changeToOut,
    changeToIn,
    demoMode,
  } = props;

  const [ssidUser, setSsidUser] = useState('');
  const [bssidUser, setBssidUser] = useState('');
  const [code, setCode] = useState('');
  const [method, setMedthod] = useState('qr');
  const [onShowModalDate, setOnShowModalDate] = useState(false);
  const [onShowModalTime, setOnShowModalTime] = useState(false);
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());

  const onChangeMethod = () => {
    type === 'in' ? changeToOut() : changeToIn();
  };

  const onHideModalDate = () => {
    setOnShowModalDate(false);
  };

  const onHideModalTime = () => {
    setOnShowModalTime(false);
  };

  const onChangeCode = (value) => {
    setCode(value);
  };

  const onCheckInSuccess = () => {
    navigation.goBack();
  };

  const onCheckIn = () => {
    if (demoMode) {
      checkInCode({
        code,
        type,
        date: moment(date).format('DD/MM/YYYY'),
        time: moment(time).format('HH:mm:ss'),
        token: token,
      });
    } else {
      checkInCode({
        code,
        type,
        token: token,
        onConfirm: onCheckInSuccess,
      });
    }
  };

  const onPressBack = () => {
    navigation.goBack();
  };

  const onChangeDate = (d) => {
    setOnShowModalDate(false);
    setDate(d);
  };

  const onChangeTime = (t) => {
    setOnShowModalTime(false);
    setTime(t);
  };

  // const onBlur = () => {
  //   console.log('blur');
  //   Keyboard.dismiss();
  // };

  const renderHeaderCard = () => {
    return !demoMode ? (
      <Text style={styles.txtTitleCard}>{`Ngày ${moment().format(
        'DD/MM/YYYY',
      )}`}</Text>
    ) : (
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <TouchableOpacity onPress={() => setOnShowModalDate(true)}>
          <Text style={styles.txtTitleCard}>{`Ngày ${moment(date).format(
            'DD/MM/YYYY',
          )}`}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setOnShowModalTime(true)}>
          <Text style={styles.txtTitleCard}>{`${moment(time).format(
            'HH:mm',
          )}`}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <View style={styles.header}>
        {demoMode ? (
          <TouchableOpacity style={styles.headerLeft} onPress={onChangeMethod}>
            <Text style={styles.titleHeader}>{`Check-${type}`}</Text>
            <Image source={imgs.exchangeIcon} style={[styles.changeIcon]} />
          </TouchableOpacity>
        ) : (
          <Text style={styles.titleHeader}>{`Check-${type}`}</Text>
        )}

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
            {renderHeaderCard()}
            <View style={styles.inputCode}>
              <Image source={imgs.key} style={[styles.iconKey]} />
              <TextInput
                placeholder="Nhập mã tại đây"
                style={styles.input}
                onChangeText={onChangeCode}
              />
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
            <TouchableOpacity style={styles.footerCard} onPress={onCheckIn}>
              <Text style={styles.txtCheck}>Chấm công</Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>
      </ScrollView>
      {onShowModalDate && (
        <ModalTime
          show={onShowModalDate}
          onHideModal={onHideModalDate}
          onConfirm={onChangeDate}
          title={'Chọn ngày'}
          value={date}
          typeModal={'date'}
        />
      )}
      {onShowModalTime && (
        <ModalTime
          show={onShowModalTime}
          onHideModal={onHideModalTime}
          onConfirm={onChangeTime}
          title={'Chọn giờ'}
          value={time}
          typeModal={'time'}
        />
      )}
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
