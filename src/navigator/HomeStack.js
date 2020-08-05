import React from 'react';
import { StatusBar } from 'react-native';
import {
  createStackNavigator,
  // CardStyleInterpolators,
  // TransitionPresets,
} from '@react-navigation/stack';

import home from '../container/home';
import addStaff from '../container/addStaff';

const Stack = createStackNavigator();

export default function TabbarStack() {
  StatusBar.setBarStyle('light-content');
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleAlign: 'center',
        headerShown: false,
      }}>
      <Stack.Screen name={'Home'} component={home} />
      <Stack.Screen name={'AddStaff'} component={addStaff} />
    </Stack.Navigator>
  );
}
