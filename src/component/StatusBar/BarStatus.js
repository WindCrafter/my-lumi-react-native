import React from 'react';
import { StatusBar, View, Platform, StyleSheet } from 'react-native';
import { imgs } from '../../../utlis';
interface Props extends ImageProps {
  containerStyle?: ImageStyle;
}

export default function BarStatus(props?: Props) {
  const { backgroundColor } = props;
  return (
    <View style={[styles.statusBar, { backgroundColor }]}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  );
}

const styles = StyleSheet.create({
  statusBar: {
    height: Platform.OS === 'ios' ? 20 : StatusBar.currentHeight,
  },
});
