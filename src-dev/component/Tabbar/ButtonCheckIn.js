import React from 'react';
import { StyleSheet, View, Image, TouchableOpacity } from 'react-native';
import { Colors, imgs } from '../../../utlis';
import langs from '../../../common/language';

const ButtonCheckIn = (props) => {
  const { navigation, onCheck, demoMode, type, status } = props;

  const onLongPress = () => {
    if (demoMode) {
      navigation.navigate(langs.navigator.checkIn);
    }
  };

  return (
    <TouchableOpacity
      accessibilityRole="button"
      onPress={onCheck}
      onLongPress={onLongPress}
      style={styles.container}
      disabled={type === 'inactive'}
    >
      <View
        style={[
          styles.containerBt,
          {
            backgroundColor:
              type === 'inactive'
                ? Colors.itemInActive
                : type === 'in'
                  ? Colors.background
                  : '#EE9723',
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
