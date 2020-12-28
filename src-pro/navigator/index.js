import React from 'react';
// import { StatusBar } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {
  createStackNavigator,
  // CardStyleInterpolators,
  // TransitionPresets,
} from '@react-navigation/stack';
// import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import forgotPass from '../admin/container/forgotPassword/forgotPass';
import login from '../admin/container/login';
import UserStack from './UserStack';
import Register from '../admin/container/register/index';
import {navigationRef} from './CustomNavigation';
import langs from '../../common/language';

const RootStack = createStackNavigator();
// const BotStack = createBottomTabNavigator();

const linking = {
  prefixes: ['lumihr://'],
};

export default function Navigator(props) {
  const {loginSuccess, changePass, role} = props;
  return (
    <NavigationContainer linking={linking} ref={navigationRef}>
      <RootStack.Navigator
        screenOptions={{
          headerTitleAlign: 'center',
          headerShown: false,
        }}>
        {!loginSuccess ? (
          <>
            <RootStack.Screen
              name={langs.navigator.login}
              component={login}
              options={{
                headerShown: false,
              }}
            />
            <RootStack.Screen
              name={langs.navigator.register}
              component={Register}
              options={{
                headerShown: false,
              }}
            />
            <RootStack.Screen
              name={langs.navigator.forgotPass}
              component={forgotPass}
              options={{
                title: false,
              }}
            />
          </>
        ) : (
          <RootStack.Screen
            name={langs.navigator.userStack}
            component={UserStack}
          />
        )}
      </RootStack.Navigator>
    </NavigationContainer>
  );
}
