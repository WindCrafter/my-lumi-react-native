import React from 'react';
import {
  Alert,
  StatusBar,
  TouchableOpacity,
  Text,
  StyleSheet,
} from 'react-native';
import {
  createStackNavigator,
  CardStyleInterpolators,
  // TransitionPresets,
} from '@react-navigation/stack';
import contact from '../user/container/contact';
import applyLate from '../user/container/apply/applyLate';
import applyOT from '../user/container/apply/applyOT';
import applyBreak from '../user/container/apply/applyBreak';
import notify from '../user/container/notify';
import TabbarUser from './TabbarUser';
import updateProfile from '../user/container/account/updateProfile';
import history from '../user/container/checkIn/history';
import Event from '../user/container/event';
import CheckIn from '../user/container/checkIn/index'
const Stack = createStackNavigator();
StatusBar.setBarStyle('dark-content');
export default function UserStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        gestureEnabled: true,
        gestureDirection: 'horizontal',
        headerTitleAlign: 'center',
      }}>
      <Stack.Screen
        name={'TabbarUser'}
        component={TabbarUser}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={'Contact'}
        component={contact}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={'ApplyLate'}
        component={applyLate}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={'ApplyBreak'}
        component={applyBreak}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={'ApplyOT'}
        component={applyOT}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={'UpdateProfile'}
        component={updateProfile}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={'History'}
        component={history}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={'CheckIn'}
        component={CheckIn}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={'Thông báo'}
        component={notify}
        options={{
          headerBackTitleVisible: false,
          headerStyle: {
            backgroundColor: 'rgb(47, 172, 79)',
          },
          headerTintColor: 'white',
        }}
      />
      <Stack.Screen
        name={'Sự kiện mới'}
        component={Event}
        options={{
          headerRight: () => (
            <TouchableOpacity
              style={styles.container}
              onPress={() => Alert.alert('Xong')}>
              <Text style={styles.txtDetail}>{'XONG'}</Text>
            </TouchableOpacity>
          ),
        }}
      />
    </Stack.Navigator>
  );
}
const styles = StyleSheet.create({
  txtDetail: {
    color: '#008aee',
    fontSize: 16,
  },
  container: { paddingHorizontal: 3 },
});
