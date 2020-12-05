import React from 'react';
import {
  Image,
  StyleSheet,
  ImageProps,
  Text,
  View,
  ImageBackground,
} from 'react-native';
import {imgs} from '../../../utlis';
interface Props extends ImageProps {
  containerStyle?: ImageStyle;
}

export default function Logo(props?: Props) {
  const {containerStyle} = props;
  return (
    <ImageBackground
      source={imgs.sloganLogo}
      resizeMode="contain"
      {...props}
      style={[styles.container, containerStyle]}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    width: 300,
    height: 120,
    alignSelf: 'center',
  },
});
