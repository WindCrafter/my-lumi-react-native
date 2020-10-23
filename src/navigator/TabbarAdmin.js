import React from 'react';
import {StatusBar} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import account from '../admin/container/account';
import {TabbarIcon} from '../component';
import home from '../admin/container/home';
import checkIn from '../admin/container/checkIn';
import {Colors} from '../../utlis';
import TabbarCustom from './TabbarCustom';
import book from '../admin/container/book';
import notify from '../admin/container/notify';

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
      <BotStack.Screen name={'TestNotify'} component={notify} />
      <BotStack.Screen name={'Cá nhân'} component={account} />
    </BotStack.Navigator>
  );
}
