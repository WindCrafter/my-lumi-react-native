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
import {PERMISSIONS, request, RESULTS} from 'react-native-permissions';
import NetInfo from '@react-native-community/netinfo';
import {connect} from 'react-redux';
import {checkInWifi} from '../redux/actions/check';
import {_global} from '../../utlis/global/global';
import langs from '../../common/language';
import DateTimePicker from '@react-native-community/datetimepicker';
import ModalTime from '../user/screen/account/component/ModalTime';
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

  const onCheckInWifi = () => {
    type === 'in'
      ? onCheck()
      : _global.Alert.alert({
          title: langs.alert.notify,
          message: langs.alert.endShift,
          messageColor: Colors.danger,
          leftButton: {
            text: langs.alert.yes,
            onPress: () => onCheck(),
          },
          rightButton: {
            text: langs.alert.no,
          },
        });
  };

  const onCheck = () => {
    if (!demoMode) {
      checkIn({type, token});
    } else {
      setShow(true);
    }
  };

  if (focusedOptions.tabBarVisible === false) {
    return null;
  }

  const onConfirm = () => {
    const data = {
      type,
      time: moment(dateIOS).format('HH:mm:ss'),
      date: moment(dateIOS).format('DD/MM/YYYY'),
      token,
    };
    setShow(false);
    checkIn(data);
  };

  const onHideModal = () => {
    setShow(false);
  };

  const onChangeIOS = (item, selected) => {
    setDateIOS(selected);
  };

  let _date;

  const onChangeTime = (item, selected) => {
    if (item.type === 'set') {
      setShow(false);
      const data = {
        type,
        time: moment(selected).format('HH:mm:ss'),
        date: _date,
        token,
      };
      console.log(data);
      checkIn(data);
    }
  };

  const onChangeDate = (item, selected) => {
    if (item.type === 'set') {
      _date = moment(selected).format('DD/MM/YYYY');
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
