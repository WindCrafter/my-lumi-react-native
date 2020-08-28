import React from 'react';
import { StatusBar } from 'react-native';
import {
  createStackNavigator,
  CardStyleInterpolators,
  // TransitionPresets,
} from '@react-navigation/stack';
import information from '../user/container/information';
import applyLate from '../user/container/apply/applyLate';
import applyOT from '../user/container/apply/applyOT';
import applyBreak from '../user/container/apply/applyBreak';
import notify from '../user/container/notify';
import qrcode from '../user/container/checkIn/qrcode';
import TabbarUser from './TabbarUser';
import code from '../user/container/checkIn/code'
import updateProfile from '../user/container/account/updateProfile';
const Stack = createStackNavigator();

export default function UserStack() {
  StatusBar.setBarStyle('light-content');
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
        name={'Information'}
        component={information}
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
        name={'QRCode'}
        component={qrcode}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={'Code'}
        component={code}
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
