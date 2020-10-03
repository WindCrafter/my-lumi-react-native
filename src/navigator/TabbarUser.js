import React from 'react';
import { StatusBar, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import account from '../user/container/account';
import { TabbarIcon } from '../component';
import home from '../user/container/home';
import checkIn from '../user/container/checkIn';
import book from '../user/container/schedule';
import document from '../user/container/document';
import TabbarCustom from './TabbarCustom';

import { Colors } from '../../utlis';
import notify from '../user/container/notify';

const BotStack = createBottomTabNavigator();
StatusBar.setBarStyle('dark-content');
export default function TabbarUser() {
  return (
    <BotStack.Navigator
      screenOptions={{
        headerTitleAlign: 'center',
      }}
      tabBarOptions={{
        activeTintColor: Colors.background,
      }}
      tabBar={(props) => <TabbarCustom {...props} />}>
      <BotStack.Screen name={'Home'} component={home} />
      <BotStack.Screen name={'Book lịch'} component={book} />
      <BotStack.Screen name={'Thông báo'} component={notify} />
      <BotStack.Screen name={'Cá nhân'} component={account} />
    </BotStack.Navigator>
  );
}
