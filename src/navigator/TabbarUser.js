import React from 'react';
import { StatusBar } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import account from '../user/container/account';
import { TabbarIcon } from '../component';
import home from '../user/container/home';
import checkIn from '../user/container/checkIn';
import { Colors } from '../../utlis';

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
