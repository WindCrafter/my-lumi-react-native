import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import {Colors} from '../../../../utlis';

import {Gradient} from '../../../component';
import LinearGradient from 'react-native-linear-gradient';
import {
  widthPercentageToDP as wp,heightPercentageToDP as hp
} from 'react-native-responsive-screen';
const LoadInital = () => {
  return (
    <View style={styles.container}>
      {/* <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: wp(100), y: hp(100)}}
        // locations={[0, 1]}
        colors={['#79D081', '#0AAF9F']}> */}
        <Image
          source={require('../../../../common/assets/images/logo/logoWithSlogan3x.png')}
          style={styles.logo}
        />
      {/* </LinearGradient> */}
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
    width: wp(80),
    // height: 196,
    // transform: [{ rotate: '230deg' }],
    resizeMode: 'contain',
  },
});
