import React from 'react';
import { StyleSheet, View, Image, TouchableOpacity } from 'react-native';
import { Colors, imgs } from '../../../utlis';
import langs from '../../../common/language';
import { globalApp } from '../../../logs/logs';

const ButtonCheckIn = (props) => {
  const { navigation, onCheck, demoMode, type, status } = props;
  const onConnect = () => {
    try {
      if (globalApp.customLog && globalApp.customLog.enableLog) {
        globalApp.customLog.disconnect();
      } else {
        globalApp.customLog
          && globalApp.customLog.connect({
            localhost: false,
          });
      }
    } catch (e) {
      // error customlog
    }
  };

  const onLongPress = () => {
    if (demoMode) {
      navigation.navigate(langs.navigator.checkIn);
    } else onConnect();
  };

  return (
    <TouchableOpacity
      accessibilityRole="button"
      onPress={onCheck}
      onLongPress={onLongPress}
      style={styles.container}
      disabled={!demoMode ? (type === 'inactive') : false}
    >
      <View
        style={[
          styles.containerBt,
          {
            backgroundColor:
             !demoMode ? (type === 'inactive'
               ? Colors.itemInActive
               : type === 'in'
                 ? Colors.background
                 : '#EE9723') : (type === 'in'
               ? Colors.background
               : '#EE9723'),
            // borderWidth: type === 'inactive' ? 0 : status === 1 ? 5 : 0,
            // borderColor: type === 'out' ? Colors.background : '#EE9723',
          },
        ]}
      >
        <Image source={imgs.tick} style={[styles.img]} />
      </View>
    </TouchableOpacity>
  );
};

export default ButtonCheckIn;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 2,
  },
  containerBt: {
    height: 48,
    width: 48,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 8,
  },
  text: {
    color: Colors.white,
  },
  img: {
    alignSelf: 'center',
    height: 24,
    width: 24,
    tintColor: 'white',
  },
});
