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
// import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import forgotPass from '../admin/container/forgotPassword/forgotPass';
import login from '../admin/container/login';
import AdminStack from './AdminStack';
import UserStack from './UserStack';
import firstLogin from '../admin/container/firstLogin';

const RootStack = createStackNavigator();
// const BotStack = createBottomTabNavigator();

export default function Navigator(props) {
  const { loginSuccess, changePass, role } = props;
  return (
    <NavigationContainer>
      <RootStack.Navigator
        screenOptions={{
          headerTitleAlign: 'center',
          headerShown: false,
        }}>
        {!loginSuccess ? (
          <>
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
          </>
        ) : changePass ? (
          <RootStack.Screen name={'FirstLogin'} component={firstLogin} />
        ) : role === 'admin' ? (
          <RootStack.Screen name={'AdminStack'} component={AdminStack} />
        ) : (
                <RootStack.Screen name={'UserStack'} component={UserStack} />
              )}
      </RootStack.Navigator>
    </NavigationContainer>
  );
}
