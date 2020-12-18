import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import moment from 'moment';
import {Colors} from '../../utlis';
import {TabbarIcon} from '../component';
import ButtonCheckIn from '../component/Tabbar/ButtonCheckIn';
import ButtonTabbar from '../component/Tabbar/ButtonTabbar';
import {connect} from 'react-redux';
import {checkInWifi} from '../redux/actions/check';
import {_global} from '../../utlis/global/global';
import langs from '../../common/language';
import DateTimePicker from '@react-native-community/datetimepicker';
import ModalTime from '../user/screen/account/component/ModalTime';
import {
  PERMISSIONS,
  request,
  RESULTS,
  openSettings,
} from 'react-native-permissions';
import {NetworkInfo} from 'react-native-network-info';

function TabbarCustom({
  state,
  descriptors,
  navigation,
  deviceId,
  token,
  checkIn,
  type,
  demoMode,
  checked,
}) {
  const [show, setShow] = useState(false);
  const [dateIOS, setDateIOS] = useState(new Date());
  const focusedOptions = descriptors[state.routes[state.index].key].options;
  console.log(focusedOptions);
  const onCheckInWifi = () => {
    type === 'in'
      ? onCheck()
      : _global.Alert.alert({
          title: langs.alert.checkOut,
          message: langs.alert.endShift,
          leftButton: {
            text: langs.alert.yes,
            onPress: () => onCheck(),
          },
          rightButton: {
            text: langs.alert.no,
          },
        });
  };

  const onCheck = async () => {
    if (!demoMode) {
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
      if (granted === RESULTS.GRANTED || granted === RESULTS.BLOCKED) {
        const result = await NetworkInfo.getSSID();
        if (result === '<unknown ssid>') {
          _global.Alert.alert({
            title: langs.alert.notify,
            message: 'Vui lòng bật GPS để chấm công!',
            rightButton: {
              text: langs.alert.ok,
              onPress: () => {
                openSettings().catch(() =>
                  console.warn('cannot open settings'),
                );
              },
            },
          });
        } else {
          checkIn({type, token, ssid: result});
        }
      } else {
        _global.Alert.alert({
          title: langs.alert.notify,
          message: 'Vui lòng cấp quyền truy cập vị trí!',
          rightButton: {
            text: langs.alert.ok,
          },
          leftButton: {
            text: langs.alert.cancel,
          },
        });
      }
    } else {
      setShow(true);
    }
  };

  if (focusedOptions.tabBarVisible === false) {
    return null;
  }

  const onConfirm = async () => {
    const data = {
      type,
      time: moment(dateIOS).format('HH:mm:ss'),
      date: moment(dateIOS).format('DD/MM/YYYY'),
      token,
    };
    setShow(false);
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
    if (granted === RESULTS.GRANTED || granted === RESULTS.BLOCKED) {
      const result = await NetworkInfo.getSSID();
      if (result === '<unknown ssid>') {
        _global.Alert.alert({
          title: langs.alert.notify,
          message: 'Vui lòng bật GPS để chấm công!',
          rightButton: {
            text: langs.alert.ok,
          },
        });
      } else {
        checkIn({...data, ssid: result});
      }
    } else {
      _global.Alert.alert({
        title: langs.alert.notify,
        message: 'Vui lòng cấp quyền truy cập vị trí!',
        rightButton: {
          text: langs.alert.ok,
        },
        leftButton: {
          text: langs.alert.cancel,
        },
      });
    }
  };

  const onHideModal = () => {
    setShow(false);
  };

  const onChangeIOS = (item, selected) => {
    setDateIOS(selected);
  };

  let _date;

  const onChangeTime = async (item, selected) => {
    if (item.type === 'set') {
      const data = {
        type,
        time: moment(selected).format('HH:mm:ss'),
        date: _date,
        token,
      };
      console.log(data);
      setShow(false);
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
      if (granted === RESULTS.GRANTED || granted === RESULTS.BLOCKED) {
        const result = await NetworkInfo.getSSID();
        if (result === '<unknown ssid>') {
          _global.Alert.alert({
            title: langs.alert.notify,
            message: 'Vui lòng bật GPS để chấm công!',
            rightButton: {
              text: langs.alert.ok,
              onPress: () => {
                openSettings().catch(() =>
                  console.warn('cannot open settings'),
                );
              },
            },
          });
        } else {
          checkIn({...data, ssid: result});
        }
      } else {
        _global.Alert.alert({
          title: langs.alert.notify,
          message: 'Vui lòng cấp quyền truy cập vị trí!',
          rightButton: {
            text: langs.alert.ok,
            onPress: () => {
              openSettings().catch(() => console.warn('cannot open settings'));
            },
          },
          leftButton: {
            text: langs.alert.cancel,
          },
        });
      }
    } else {
      setShow(false);
    }
  };

  const onChangeDate = (item, selected) => {
    if (item.type === 'set') {
      _date = moment(selected).format('DD/MM/YYYY');
    } else {
      setShow(false);
    }
  };

  return (
    <>
      {show &&
        (Platform.OS === 'ios' ? (
          <ModalTime
            title="Chọn thời gian"
            showModal={show}
            hideModal={onHideModal}
            onConfirm={onConfirm}
            picker={
              <View style={styles.picker}>
                <DateTimePicker
                  value={dateIOS}
                  mode={'datetime'}
                  display="default"
                  onChange={onChangeIOS}
                />
              </View>
            }
          />
        ) : (
          <>
            <DateTimePicker
              value={new Date()}
              mode="time"
              is24Hour={true}
              display="clock"
              onChange={onChangeTime}
            />
            <DateTimePicker
              value={new Date()}
              mode="date"
              is24Hour={true}
              display="default"
              onChange={onChangeDate}
            />
          </>
        ))}
      <SafeAreaView style={styles.container}>
        <ButtonTabbar
          state={state}
          descriptors={descriptors}
          navigation={navigation}
          index={0}
          route={state.routes[0]}
          tab={0}
          title={langs.navigator.main}
        />
        <ButtonTabbar
          state={state}
          descriptors={descriptors}
          navigation={navigation}
          title={langs.navigator.schedule}
          index={1}
          route={state.routes[1]}
          tab={1}
        />
        <ButtonCheckIn navigation={navigation} onCheck={onCheckInWifi} />
        <ButtonTabbar
          state={state}
          descriptors={descriptors}
          navigation={navigation}
          title={langs.navigator.notify}
          index={2}
          route={state.routes[2]}
          tab={2}
        />
        <ButtonTabbar
          state={state}
          descriptors={descriptors}
          navigation={navigation}
          title={langs.navigator.account}
          index={3}
          route={state.routes[3]}
          tab={3}
        />
      </SafeAreaView>
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    borderTopWidth: 0.5,
    borderTopColor: 'gray',
    backgroundColor: Colors.white,
    paddingBottom: 16,
  },
  // modal: {
  //   width: 200,
  //   height: 200,
  // },
  picker: {
    width: Dimensions.get('window').width,
  },
});
const mapStateToProps = (state) => {
  return {
    deviceId: state.authen.deviceId,
    token: state.authen.token,
    currentUser: state.user.currentUser,
    type: state.check.type,
    demoMode: state.user.demoMode,
    checked: state.check.checked,
  };
};

const mapDispatchToProps = {
  checkIn: checkInWifi,
};

export default connect(mapStateToProps, mapDispatchToProps)(TabbarCustom);
