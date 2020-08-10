import React from 'react';
import { StatusBar, View, Platform, StyleSheet } from 'react-native';
import { imgs } from '../../../utlis';
interface Props extends ImageProps {
  containerStyle?: ImageStyle;
}

BarStatus.defaultProps = {
  height: Platform.OS === 'ios' ? 20 : StatusBar.currentHeight,
};

export default function BarStatus(props?: Props) {
  const { backgroundColor, height } = props;
  return (
    <View style={{ backgroundColor, height }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  );
}
