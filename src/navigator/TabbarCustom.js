import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Colors } from '../../utlis';
import { TabbarIcon } from '../component';
import ButtonCheckIn from '../component/Tabbar/ButtonCheckIn';
import ButtonTabbar from '../component/Tabbar/ButtonTabbar';

export default function TabbarCustom({ state, descriptors, navigation }) {
  const focusedOptions = descriptors[state.routes[state.index].key].options;

  if (focusedOptions.tabBarVisible === false) {
    return null;
  }
  return (
    <View style={styles.container}>
      <ButtonTabbar
        state={state}
        descriptors={descriptors}
        navigation={navigation}
        index={0}
        route={state.routes[0]}
        tab={0}
      />
      <ButtonTabbar
        state={state}
        descriptors={descriptors}
        navigation={navigation}
        index={1}
        route={state.routes[1]}
        tab={1}
      />
      <ButtonCheckIn />
      <ButtonTabbar
        state={state}
        descriptors={descriptors}
        navigation={navigation}
        index={3}
        route={state.routes[3]}
        tab={3}
      />
      <ButtonTabbar
        state={state}
        descriptors={descriptors}
        navigation={navigation}
        index={4}
        route={state.routes[4]}
        tab={4}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 0.5,
    borderTopColor: 'gray',
    backgroundColor: Colors.white,
  },
});
