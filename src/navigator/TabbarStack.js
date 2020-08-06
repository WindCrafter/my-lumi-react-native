import React from 'react';
import {StatusBar} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import HomeStack from './HomeStack';
import account from '../container/account';
import rollUp from '../container/rollUp';
import {TabbarIcon} from '../component';

const BotStack = createBottomTabNavigator();

export default function TabbarStack() {
  StatusBar.setBarStyle('light-content');
  return (
    <BotStack.Navigator
      screenOptions={{
        headerTitleAlign: 'center',
      }}>
      <BotStack.Screen
        name={'Trang chủ'}
        component={HomeStack}
        options={() => ({
          // tabBarVisible: false,
          tabBarIcon: (props) => <TabbarIcon {...props} tab={0} />,
        })}
      />
      <BotStack.Screen name={'Chấm công'} component={rollUp} />
      <BotStack.Screen name={'Cá nhân'} component={account} />
    </BotStack.Navigator>
  );
}
