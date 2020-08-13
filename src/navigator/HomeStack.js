import React from 'react';
import {StatusBar} from 'react-native';
import {
  createStackNavigator,
  // CardStyleInterpolators,
  // TransitionPresets,
} from '@react-navigation/stack';

import home from '../container/home';
import addStaff from '../container/addStaff';
import information from '../container/information';
import TabbarStack from './TabbarStack';
import Notify from '../container/notify';
import notify from '../container/notify';
const Stack = createStackNavigator();

export default function HomeStack() {
  StatusBar.setBarStyle('light-content');
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleAlign: 'center',
        // headerShown: false,
      }}>
      <Stack.Screen
        name={'TabHome'}
        component={TabbarStack}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={'Thêm nhân viên'}
        component={addStaff}
        options={{
          headerBackTitleVisible: false,
          headerStyle: {
            backgroundColor: 'rgb(47, 172, 79)',
          },
          headerTintColor: 'white',
        }}
      />
      <Stack.Screen name={'Information'} component={information} />
      <Stack.Screen
        name={'Thông báo'}
        component={notify}
        options={{
          headerBackTitleVisible: false,
          headerStyle: {
            backgroundColor: 'rgb(47, 172, 79)',
          },
          headerTintColor: 'white',
        }}
      />
    </Stack.Navigator>
  );
}
