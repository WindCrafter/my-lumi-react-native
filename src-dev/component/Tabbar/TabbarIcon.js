import React from 'react';
import { Image, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { imgs, Colors } from '../../../utlis';

const Icons = [
  { active: 'home', inactive: 'home-outline' },
  { active: 'calendar', inactive: 'calendar-outline' },
  { active: 'business', inactive: 'business-outline' },
  { active: 'person-circle', inactive: 'person-circle-outline' },
];

export default function TabbarIcon({ focused, tab }) {
  const icon = focused ? Icons[tab].active : Icons[tab].inactive;
  return (
    <Icon
      name={icon}
      size={ 24}
      style={[{ color: focused ? Colors.background : Colors.itemInActive }]}
      resizeMode="contain"
    />
  );
}

const styles = StyleSheet.create({
  container: {
    width: 24,
    height: 24,
  },
});
