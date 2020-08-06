import React from 'react';
import { StatusBar } from 'react-native';
import {
  createStackNavigator,
  // CardStyleInterpolators,
  // TransitionPresets,
} from '@react-navigation/stack';

import home from '../container/home';
import addStaff from '../container/addStaff';
import information from '../container/information';
import TabbarStack from './TabbarStack';

const Stack = createStackNavigator();

export default function HomeStack() {
  StatusBar.setBarStyle('light-content');
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleAlign: 'center',
        headerShown: false,
      }}>
      <Stack.Screen name={'TabHome'} component={TabbarStack} />
      <Stack.Screen name={'AddStaff'} component={addStaff} route={false} />
      <Stack.Screen name={'Information'} component={information} />
    </Stack.Navigator>
  );
}
