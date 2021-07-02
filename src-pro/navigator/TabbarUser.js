import React from 'react';
import { StatusBar, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import account from '../user/container/account';
import { TabbarIcon } from '../component';
import home from '../user/container/home';
import book from '../user/container/book';
import OverView from '../user/container/OverView/index';
import TabbarCustom from './TabbarCustom';
import FloatTabbar from './FloatTabbar';
import { Colors } from '../../utlis';
import notify from '../user/container/notify';
import langs from '../../common/language';

const BotStack = createBottomTabNavigator();
const shouldShowTabbar = (route) => {
  try {
    return route.state.routes[route.state.index].params.tabBarVisible;
  } catch (error) {
    return true;
  }
};
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
      tabBar={(props) => <TabbarCustom {...props} />}
    >
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
      <BotStack.Screen
        name={langs.navigator.overView}
        component={OverView}
        options={() => ({
          tabBarLabel: 'Tổng quan',
        })}
      />
      <BotStack.Screen
        name={langs.navigator.account}
        component={account}
        options={({ route }) => ({
          tabBarVisible: shouldShowTabbar(route),
          tabBarLabel: 'Tổng quan',
        })}
      />
    </BotStack.Navigator>
  );
}
