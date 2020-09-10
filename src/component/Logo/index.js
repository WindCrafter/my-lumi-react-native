import React from 'react';
import {
  Image,
  StyleSheet,
  ImageProps,
  Text,
  View,
  ImageBackground,
} from 'react-native';
import { imgs } from '../../../utlis';
interface Props extends ImageProps {
  containerStyle?: ImageStyle;
}

export default function Logo(props?: Props) {
  const { containerStyle } = props;
  return (
    <ImageBackground
      source={imgs.textlogo}
      resizeMode="contain"
      {...props}
      style={[styles.container, containerStyle]}>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 156,
    height: 156,
    alignSelf: 'center',
    justifyContent: 'flex-end',
  },
});
