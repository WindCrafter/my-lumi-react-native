import React from 'react';
import {StatusBar} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import account from '../container/account';
import rollUp from '../container/rollUp';
<<<<<<< HEAD
import {TabbarIcon} from '../component';
=======
import { TabbarIcon } from '../component';
import home from '../container/home';
>>>>>>> e4dde46fb9ae06d5936fcd11695e5b465d6d40b9

const BotStack = createBottomTabNavigator();

export default function TabbarStack() {
  StatusBar.setBarStyle('light-content');
  return (
    <BotStack.Navigator
      screenOptions={{
        headerTitleAlign: 'center',
      }}>
      <BotStack.Screen
<<<<<<< HEAD
        name={'Trang chủ'}
        component={HomeStack}
        options={() => ({
          // tabBarVisible: false,
=======
        name={'Home'}
        component={home}
        options={(navigation) => ({
>>>>>>> e4dde46fb9ae06d5936fcd11695e5b465d6d40b9
          tabBarIcon: (props) => <TabbarIcon {...props} tab={0} />,
        })}
      />
      <BotStack.Screen name={'Chấm công'} component={rollUp} />
      <BotStack.Screen name={'Cá nhân'} component={account} />
    </BotStack.Navigator>
  );
}
