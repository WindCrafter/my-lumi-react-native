import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Colors } from '../../../../utlis';

const LoadInital = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.txtLoad}>Đây chắc chắn là Splash Screen</Text>
    </View>
  );
};

export default LoadInital;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtLoad: {
    color: Colors.white,
    fontSize: 28,
    fontWeight: '600',
    textAlign: 'center',
  },
});
