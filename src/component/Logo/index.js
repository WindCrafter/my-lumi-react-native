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
      source={imgs.logo}
      resizeMode="contain"
      {...props}
      style={[styles.container, containerStyle]}>
      <Text style={styles.txt} numberOfLines={1}>
        Lumi Staff
      </Text>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 130,
    height: 130,
    alignSelf: 'center',
    justifyContent: 'flex-end',
  },
  txt: {
    alignSelf: 'center',
    color: 'rgb(61, 196, 99)',
    fontSize: 28,
    fontWeight: '500',
    marginBottom: 24,
  },
});
