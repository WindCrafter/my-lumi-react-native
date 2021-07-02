import React, { useEffect, useRef, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Platform,
  AppState,
} from 'react-native';
import moment from 'moment';
import LinearGradient from 'react-native-linear-gradient';
import { imgs, Colors } from '../../../../../utlis';
// import langs from '../../../../../common/language';
import { SCREEN_WIDTH } from '../../../../../utlis/config/utlis';

const currrentDate = moment().format('DD/MM/YYYY');
const day = moment().format('dddd');
const currentDayInWeek = day === 'Monday'
  ? 'Thứ 2'
  : day === 'Tuesday'
    ? 'Thứ 3'
    : day === 'Wednesday'
      ? 'Thứ 4'
      : day === 'Thursday'
        ? 'Thứ 5'
        : day === 'Friday'
          ? 'Thứ 6'
          : day === 'Saturday'
            ? 'Thứ 7'
            : 'Chủ Nhật';

const Header = (props) => {
  const { pressAvatar, pressNotify, name, numberNotifys, avatar } = props;
  const [datez, setDatez] = useState(currrentDate);
  const [dayz, setDayz] = useState(currentDayInWeek);
  const appState = useRef(AppState.currentState);
  useEffect(() => {
    AppState.addEventListener('change', _handleAppStateChange);

    return () => {
      AppState.removeEventListener('change', _handleAppStateChange);
    };
  }, []);

  const _handleAppStateChange = (nextAppState) => {
    const currrentDatez = moment().format('DD/MM/YYYY');
    const d = moment().format('dddd');
    const currentDayz = d === 'Monday'
      ? 'Thứ 2'
      : d === 'Tuesday'
        ? 'Thứ 3'
        : d === 'Wednesday'
          ? 'Thứ 4'
          : d === 'Thursday'
            ? 'Thứ 5'
            : d === 'Friday'
              ? 'Thứ 6'
              : d === 'Saturday'
                ? 'Thứ 7'
                : 'Chủ Nhật';

    if (nextAppState === 'active') {
      setDatez(currrentDatez);
      setDayz(currentDayz);
    }
    appState.current = nextAppState;
  };
  return (
    <LinearGradient
      style={styles.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      colors={['#185628', '#2FAC4F']}
    >
      <View style={styles.detail}>
        <View style={styles.avatar}>
          <TouchableOpacity onPress={pressAvatar}>
            <Image
              source={avatar ? { uri: avatar } : imgs.defaultAvatar}
              style={styles.avt}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.info}>
          <Text style={styles.txtName}>{`Xin chào ${name}!`}</Text>
          <Text style={styles.time}>{`${dayz}, ${datez}`}</Text>
        </View>
        <TouchableOpacity style={styles.notify} onPress={pressNotify}>
          <Image source={imgs.notification} />
          {numberNotifys && numberNotifys !== 0 && numberNotifys < 10 ? (
            <View
              style={{
                backgroundColor: 'red',
                borderRadius: 10,
                position: 'absolute',
                left: 20,
                bottom: 12,
                height: 16,
                width: 16,
                justifyContent: 'space-around',
                alignItems: 'center',
              }}
            >
              <Text
                style={{
                  fontSize: 12,
                  color: 'white',
                  fontWeight: '600',
                  fontFamily: 'Quicksand-Bold',
                  alignSelf: 'center',
                  textAlign: 'left',
                  top: Platform.OS === 'android' ? -1 : 0,
                }}
              >
                {numberNotifys}
              </Text>
            </View>
          ) : numberNotifys && numberNotifys !== 0 && numberNotifys >= 10 ? (
            <View
              style={{
                backgroundColor: 'red',
                borderRadius: 10,
                position: 'absolute',
                left: 20,
                bottom: 12,
                paddingHorizontal: 4,
                paddingVertical: 1,
                justifyContent: 'space-around',
                alignItems: 'center',
              }}
            >
              <Text
                style={{
                  fontSize: 12,
                  color: 'white',
                  fontWeight: '600',
                  fontFamily: 'Quicksand-Bold',
                  alignSelf: 'center',
                  textAlign: 'left',
                  top: Platform.OS === 'android' ? -1 : 0,
                }}
              >
                9+
              </Text>
            </View>
          ) : null}
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    flex: 1.5,
  },
  detail: {
    flexDirection: 'row',
    flex: 5,
    marginTop: 8,
  },
  avatar: {
    flex: 1,
    justifyContent: 'center',
  },
  info: {
    flexDirection: 'column',
    flex: 2.25,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  avt: {
    height: SCREEN_WIDTH > 400 ? 84 : 64,
    width: SCREEN_WIDTH > 400 ? 84 : 64,
    borderRadius: 60,
    marginLeft: 12,
  },
  txtName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
    fontFamily: 'Quicksand-Bold',
  },
  time: {
    fontSize: 16,
    fontWeight: '300',
    color: '#ffffff',
  },
  notify: {
    marginTop: 48,
    marginRight: 32,
    height: 32,
    width: 32,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,25,0.22)',
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
  btCheckIn: {
    paddingHorizontal: 8,
    height: 24,
    backgroundColor: 'white',
    justifyContent: 'center',
    marginLeft: 12,
    borderRadius: 12,
    padding: 4,
  },
  txtCheckIn: {
    color: Colors.background,
    fontSize: 12,
  },
  quiz: {
    fontSize: 16,
    fontWeight: '500',
    color: '#ffffff',
  },
  viewQuiz: {
    height: 24,
    justifyContent: 'center',
  },
});
