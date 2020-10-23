import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import { Colors } from '../../utlis';
import { TabbarIcon } from '../component';
import ButtonCheckIn from '../component/Tabbar/ButtonCheckIn';
import ButtonTabbar from '../component/Tabbar/ButtonTabbar';
import { PERMISSIONS, request, RESULTS } from 'react-native-permissions';
import NetInfo from '@react-native-community/netinfo';
import { connect } from 'react-redux';
import { checkInWifi } from '../redux/actions/check';
function TabbarCustom({
  state,
  descriptors,
  navigation,
  deviceId,
  token,
  checkIn,
}) {
  const focusedOptions = descriptors[state.routes[state.index].key].options;
  const [type, setType] = useState(true);
  const requestLocationPermission = async () => {
    try {
      const granted = await request(
        Platform.select({
          android: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
          ios: PERMISSIONS.IOS.LOCATION_ALWAYS,
        }),
      );
      if (granted === RESULTS.GRANTED) {
        console.log('Thanh cong');
        initWifi();
        console.log(token);
      } else {
        initWifi();

        navigation.navigate('CheckIn');
        console.log('Yêu cầu vị trí bị từ chối');
        console.log(RESULTS.GRANTED);
      }
    } catch (err) {
      console.warn(err);
    }
  };
  const onCheckInWifi = () => {
    Platform.OS === 'ios' ? initWifi() : requestLocationPermission();
  };
  const initWifi = async () => {
    try {
      let set = await NetInfo.fetch('wifi');

      const data = {
        ssid: set.details.ssid,
        bssid: set.details.bssid,
        type: type ? 'in' : 'out',
        deviceId: deviceId,
        token: token,
      };
      checkIn(data);
      setType(!type);
      console.log(
        'Your current connected wifi ssidUser is ' + set.details.ssid,
      );
      console.log('Your current BssidUser is ' + set.details.bssid);
      console.log(data);
    } catch (error) {
      navigation.navigate('CheckIn');

      console.log('Cannot get current ssidUser!', { error });
    }
  };
  if (focusedOptions.tabBarVisible === false) {
    return null;
  }

  return (
    <SafeAreaView style={styles.container}>
      <ButtonTabbar
        state={state}
        descriptors={descriptors}
        navigation={navigation}
        index={0}
        route={state.routes[0]}
        tab={0}
      />
      <ButtonTabbar
        state={state}
        descriptors={descriptors}
        navigation={navigation}
        index={1}
        route={state.routes[1]}
        tab={1}
      />
      <ButtonCheckIn navigation={navigation} onCheck={onCheckInWifi} />
      <ButtonTabbar
        state={state}
        descriptors={descriptors}
        navigation={navigation}
        index={2}
        route={state.routes[2]}
        tab={2}

      />
      <ButtonTabbar
        state={state}
        descriptors={descriptors}
        navigation={navigation}
        index={3}
        route={state.routes[3]}
        tab={3}
      />
    </SafeAreaView>
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
});
const mapStateToProps = (state) => {
  return {
    deviceId: state.authen.deviceId,
    token: state.authen.token,
    currentUser: state.user.currentUser,
  };
};

const mapDispatchToProps = {
  checkIn: checkInWifi,
};

export default connect(mapStateToProps, mapDispatchToProps)(TabbarCustom);
