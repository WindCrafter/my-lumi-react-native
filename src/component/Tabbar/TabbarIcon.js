/**
 * Created by nghinv on Fri Feb 07 2020
 * Copyright (c) 2020 nghinv@lumi.biz
 */

import React from 'react';
import { Image, StyleSheet } from 'react-native';
import { imgs } from '../../../utlis';

const Icons = [
  { active: imgs.home, inactive: require('../../../naruto.jpeg') },
  { active: imgs.checkin, inactive: require('../../../naruto.jpeg') },
  { active: imgs.personal, inactive: require('../../../naruto.jpeg') },
];

export default function TabbarIcon({ focused, tab }) {
  const icon = focused ? Icons[tab].active : Icons[tab].inactive;
  return <Image source={icon} style={styles.container} resizeMode="contain" />;
}

const styles = StyleSheet.create({
  container: {
    width: 24,
    height: 24,
  },
});
