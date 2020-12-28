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
import langs from '../../common/language';
import FloatTabbar from './FloatTabbar';

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
      tabBar={(props) => <FloatTabbar {...props} />}>
      <BotStack.Screen
        name={langs.navigator.home}
        component={home}
        options={({ route }) => ({
          tabBarLabel: 'Trang chủ',
        })}
      />
      <BotStack.Screen
        name={langs.navigator.book}
        component={book}
        options={({ route }) => ({
          tabBarLabel: 'Lịch họp',
        })}
      />
      <BotStack.Screen name={langs.navigator.button} component={checkIn} />
      <BotStack.Screen
        name={langs.navigator.testNotify}
        component={notify}
        options={() => ({
          tabBarLabel: 'Thông báo',
        })}
      />
      <BotStack.Screen
        name={langs.navigator.account}
        component={account}
        options={({ route }) => ({
          tabBarLabel: 'Cá nhân',
        })}
      />
    </BotStack.Navigator>
  );
}
