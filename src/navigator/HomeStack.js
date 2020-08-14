import React from 'react';
import { StatusBar } from 'react-native';
import {
  createStackNavigator,
  // CardStyleInterpolators,
  // TransitionPresets,
} from '@react-navigation/stack';

import addStaff from '../container/addStaff';
import information from '../container/information';
import TabbarStack from './TabbarStack';
import ot from '../container/ot';
import resign from '../container/resign';
import contract from '../container/contract';
import setContract from '../container/contract/setContract';
import addContract from '../container/contract/addContract';
import applyLate from '../container/apply/applyLate';
import applyBreak from '../container/apply/applyBreak';
import applyOT from '../container/apply/applyOT';
import qrcode from '../container/checkIn/qrcode';

const Stack = createStackNavigator();

export default function HomeStack() {
  StatusBar.setBarStyle('light-content');
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleAlign: 'center',
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
      <Stack.Screen
        name={'Information'}
        component={information}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={'OT'}
        component={ot}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={'Resign'}
        component={resign}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={'Contract'}
        component={contract}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={'SetContract'}
        component={setContract}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={'AddContract'}
        component={addContract}
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
    </Stack.Navigator>
  );
}
