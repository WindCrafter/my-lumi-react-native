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
function TabbarCustom({
  state,
  descriptors,
  navigation,
  deviceId,
  token,
  checkIn,
  type,
}) {
  const focusedOptions = descriptors[state.routes[state.index].key].options;

  const onCheckInWifi = () => {
    const data = {
      type: type,
      deviceId: deviceId,
      token: token,
    };
    type === 'in'
      ? checkIn(data)
      : _global.Alert.alert({
          title: langs.alert.notify,
          message: langs.alert.endShift,
          leftButton: {
            text: langs.alert.yes,
            onPress: () => checkIn(data),
          },
          rightButton: {
            text: langs.alert.no,
          },
        });
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
    type: state.check.type,
  };
};

const mapDispatchToProps = {
  checkIn: checkInWifi,
};

export default connect(mapStateToProps, mapDispatchToProps)(TabbarCustom);
