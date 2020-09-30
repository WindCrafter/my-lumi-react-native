import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Colors } from '../../../utlis';

const ButtonCheckIn = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Test</Text>
    </View>
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
  },
  text: {
    color: Colors.white,
  },
});
