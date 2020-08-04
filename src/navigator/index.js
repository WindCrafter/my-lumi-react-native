/**
 * Created by nghinv on Fri Feb 07 2020
 * Copyright (c) 2020 nghinv@lumi.biz
 */

import React from 'react';
// import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import {
  createStackNavigator,
  // CardStyleInterpolators,
  // TransitionPresets,
} from '@react-navigation/stack';
import login from '../container/login';
import forgotPass from '../container/forgotPass';

const RootStack = createStackNavigator();

export default function Navigator(props) {
  return (
    <NavigationContainer>
      <RootStack.Navigator
        screenOptions={{
          headerTitleAlign: 'center',
          headerShown: false,
        }}>
        <RootStack.Screen
          name={'Login'}
          component={login}
          options={{
            headerShown: false,
          }}
        />
        <RootStack.Screen
          name={'Forgot Password'}
          component={forgotPass}
          options={{
            title: false,
          }}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}
