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
        <Image
          source={require('../../../common/assets/images/gif/Sever1.gif')}
          style={styles.img}
        />
      </View>
    </TouchableOpacity>
  );
};

export default ButtonCheckIn;

const styles = StyleSheet.create({
  container: {
    width: 48,
    height: 48,
    backgroundColor: Colors.background,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 8,
    marginTop: 8,
  },
  containerBt: {
    width: 48,
    height: 48,
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
    height: 32,
    width: 32,
  },
});
