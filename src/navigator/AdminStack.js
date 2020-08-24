import React from 'react';
import { StatusBar } from 'react-native';
import {
  createStackNavigator,
  // CardStyleInterpolators,
  // TransitionPresets,
} from '@react-navigation/stack';
import TabbarAdmin from './TabbarAdmin';
import addStaff from '../admin/container/addStaff';
import information from '../admin/container/information';
import ot from '../admin/container/ot';
import resign from '../admin/container/resign';
import contract from '../admin/container/contract';
import setContract from '../admin/container/contract/setContract';
import addContract from '../admin/container/contract/addContract';
import notify from '../admin/container/notify';
import qrcode from '../admin/container/checkIn/qrcode';
import code from '../admin/container/checkIn/code'
const Stack = createStackNavigator();

export default function AdminStack() {
  StatusBar.setBarStyle('light-content');
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleAlign: 'center',
        // headerShown: false,
      }}>
      <Stack.Screen
        name={'TabbarAdmin'}
        component={TabbarAdmin}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={'Thêm nhân viên'}
        component={addStaff}
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