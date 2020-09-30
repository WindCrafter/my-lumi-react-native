import React from 'react';
import { Image, StyleSheet } from 'react-native';
import { imgs } from '../../../utlis';

const Icons = [
  { active: imgs.homegreen, inactive: imgs.homegrey },
  { active: imgs.documentGreen, inactive: imgs.document },
  { active: imgs.scheduleGreen, inactive: imgs.scheduleGrey },
  { active: imgs.checkingreen, inactive: imgs.checkingrey },
  { active: imgs.personalgreen, inactive: imgs.personalgrey },
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
