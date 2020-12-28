import React from 'react';
import {StyleSheet, View, Image, TouchableOpacity} from 'react-native';
import {Colors, imgs} from '../../../utlis';

const ButtonCheckIn = (props) => {
  const {navigation, onCheck} = props;

  const onLongPress = () => {
    navigation.navigate('CheckIn');
  };

  return (
    <TouchableOpacity
      accessibilityRole="button"
      onPress={onCheck}
      onLongPress={onLongPress}
      style={styles.container}>
      <View style={styles.containerBt}>
        <Image source={imgs.tick} style={styles.img} />
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
    backgroundColor: Colors.background,
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
