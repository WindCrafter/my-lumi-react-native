import React from 'react';
import { Text, Image, View, StyleSheet, TouchableOpacity } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { imgs } from '../../../utlis';

HeaderCustom.defaultProps = {
  width: wp(100),
  height: 60,
  button: false,
  fontSize: 20,
};

export default function HeaderCustom(props?: Props) {
  const {
    leftImage,
    width,
    height,
    backgroundColor,
    containerStyle,
    title,
    goBack,
    rightButton,
    onRight,
    fontSize,
    ...otherProps
  } = props;

  return (
    <View
      style={[
        styles.container,
        {
          width,
          height,
          backgroundColor,
        },
        containerStyle,
      ]}>
      <TouchableOpacity onPress={goBack} style={styles.button}>
        <Image source={leftImage} style={styles.image} resizeMode="contain" />
      </TouchableOpacity>
      <Text style={[styles.title, { fontSize }]} {...otherProps}>
        {title}
      </Text>
      {rightButton ?
        <TouchableOpacity style={styles.right} onPress={onRight}>
          <Image source={imgs.add} style={styles.img} />
        </TouchableOpacity>
        : null
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    justifyContent: 'center',
  },
  button: {
    position: 'absolute',
    left: 32,
  },
  image: {
    width: 32,
    height: 32,
  },
  title: {
    fontSize: 20,
    fontWeight: '300',
    color: 'rgb(47,172,79)',
  },
  right: {
    backgroundColor: 'rgb(47,172,79)',
    padding: 4,
    position: 'absolute',
    right: 16,
    borderRadius: 16,
  },
  img: {
    width: 16,
    height: 16,
  },
});
