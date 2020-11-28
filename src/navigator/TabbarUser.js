import React from 'react';
import {StatusBar, View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import account from '../user/container/account';
import {TabbarIcon} from '../component';
import home from '../user/container/home';
import checkIn from '../user/container/checkIn';
import book from '../user/container/schedule';
import TabbarCustom from './TabbarCustom';

import {Colors} from '../../utlis';
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
      tabBar={(props) => <TabbarCustom {...props} />}>
      <BotStack.Screen
        name={langs.navigator.home}
        component={home}
        options={({route}) => ({
          tabBarVisible: shouldShowTabbar(route),
        })}
      />
      <BotStack.Screen
        name={langs.navigator.book}
        component={book}
        options={({route}) => ({
          tabBarVisible: shouldShowTabbar(route),
        })}
      />
      <BotStack.Screen
        name={langs.navigator.testNotify}
        component={notify}
        options={() => ({
          tabBarLabel: 'Thong bao',
        })}
      />
      <BotStack.Screen
        name={langs.navigator.account}
        component={account}
        options={({route}) => ({
          tabBarVisible: shouldShowTabbar(route),
        })}
      />
    </BotStack.Navigator>
  );
}
