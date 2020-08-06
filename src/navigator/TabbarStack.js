import React from 'react';
import { StatusBar } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import account from '../container/account';
import rollUp from '../container/rollUp';
import { TabbarIcon } from '../component';
import home from '../container/home';

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
        options={(navigation) => ({
          tabBarIcon: (props) => <TabbarIcon {...props} tab={0} />,
        })}
      />
      <BotStack.Screen name={'Roll up'} component={rollUp} />
      <BotStack.Screen name={'Account'} component={account} />
    </BotStack.Navigator>
  );
};


