import React from 'react';
import { StatusBar } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import account from '../container/account';
import { TabbarIcon } from '../component';
import home from '../container/home';
import checkIn from '../container/checkIn';

const BotStack = createBottomTabNavigator();

export default function TabbarStack() {
  StatusBar.setBarStyle('light-content');
  return (
    <BotStack.Navigator
      screenOptions={{
        headerTitleAlign: 'center',
      }}>
      <BotStack.Screen
        name={'Home'}
        component={home}
        options={() => ({
          tabBarIcon: (props) => <TabbarIcon {...props} tab={0} />,
        })}
      />
      <BotStack.Screen
        name={'Chấm công'}
        component={checkIn}
        options={() => ({
          tabBarIcon: (props) => <TabbarIcon {...props} tab={1} />,
        })}
      />
      <BotStack.Screen
        name={'Cá nhân'}
        component={account}
        options={() => ({
          tabBarIcon: (props) => <TabbarIcon {...props} tab={2} />,
        })}
      />
    </BotStack.Navigator>
  );
}
