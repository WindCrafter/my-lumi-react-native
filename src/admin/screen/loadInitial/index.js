import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { Colors } from '../../../../utlis';
import { widthPercentageToDP, heightPercentageToDP } from 'react-native-responsive-screen';

const LoadInital = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require('../../../../logoloayxoay.gif')}
        style={styles.logo}
      />
    </View>
  );
};

export default LoadInital;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtLoad: {
    color: Colors.white,
    fontSize: 28,
    fontWeight: '600',
    textAlign: 'center',
  },
  logo: {
    width: 196,
    height: 196,
    transform: [{ rotate: '230deg' }],
  },
});
