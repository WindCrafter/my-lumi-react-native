import React from 'react';
import ReactNative from 'react-native';

const { TouchableOpacity, View } = ReactNative;

export default (props) => {
  return <TouchableOpacity {...props}>{props.children}</TouchableOpacity>;
};
