/**
 * Created by nghinv on Mon Aug 24 2020
 * Copyright (c) 2020 nghinv@lumi.biz
 */

import React from 'react';
import {StyleSheet, Image, Dimensions} from 'react-native';

export default function LoadInital() {
  return (
    <Image
      source={require('../../../../common/assets/images/splash/splash.png')}
      resizeMode="cover"
      style={styles.image}
    />
  );
}

const styles = StyleSheet.create({
  image: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});
