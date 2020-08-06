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

const Stack = createStackNavigator();

export default function HomeStack() {
  StatusBar.setBarStyle('light-content');
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleAlign: 'center',
        headerShown: false,
      }}>
<<<<<<< HEAD
      <Stack.Screen
        name={'hoome'}
        component={home}
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
=======
      <Stack.Screen name={'TabHome'} component={TabbarStack} />
      <Stack.Screen name={'AddStaff'} component={addStaff} route={false} />
      <Stack.Screen name={'Information'} component={information} />
>>>>>>> e4dde46fb9ae06d5936fcd11695e5b465d6d40b9
    </Stack.Navigator>
  );
}
