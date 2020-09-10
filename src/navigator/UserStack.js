import React from 'react';
import { StatusBar } from 'react-native';
import {
  createStackNavigator,
  CardStyleInterpolators,
  // TransitionPresets,
} from '@react-navigation/stack';
import contact from '../user/container/contact';
import applyLate from '../user/container/apply/applyLate';
import applyOT from '../user/container/apply/applyOT';
import applyBreak from '../user/container/apply/applyBreak';
import notify from '../user/container/notify';
import TabbarUser from './TabbarUser';
import updateProfile from '../user/container/account/updateProfile';
import history from '../user/container/checkIn/history';
const Stack = createStackNavigator();
StatusBar.setBarStyle('dark-content');
export default function UserStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        gestureEnabled: true,
        gestureDirection: 'horizontal',
        headerTitleAlign: 'center',
      }}>
      <Stack.Screen
        name={'TabbarUser'}
        component={TabbarUser}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={'Contact'}
        component={contact}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={'ApplyLate'}
        component={applyLate}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={'ApplyBreak'}
        component={applyBreak}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={'ApplyOT'}
        component={applyOT}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={'UpdateProfile'}
        component={updateProfile}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={'History'}
        component={history}
        options={{
          headerShown: false,
        }}
      />
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
