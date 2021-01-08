import React from 'react';
import { Image, StyleSheet } from 'react-native';
import { imgs, Colors } from '../../../utlis';

const Icons = [
  { active: imgs.homegreen, inactive: imgs.homegrey },
  { active: imgs.documentGreen, inactive: imgs.document },
  { active: imgs.stampCheck, inactive: imgs.stampCheck },
  { active: imgs.personalgreen, inactive: imgs.personalgrey },
];

export default function TabbarIcon({ focused, tab }) {
  const icon = focused ? Icons[tab].active : Icons[tab].inactive;
  return tab === 2 ? (
    <Image
      source={icon}
      style={[styles.container, { tintColor: focused ? Colors.background : Colors.gray }]}
      resizeMode="contain"
    />
  ) : (
    <Image source={icon} style={[styles.container]} resizeMode="contain" />
  );
}

const styles = StyleSheet.create({
  container: {
    width: 24,
    height: 24,
  },
});
