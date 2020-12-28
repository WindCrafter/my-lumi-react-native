import React from 'react';
import {
  Alert,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import {
  createStackNavigator,
  CardStyleInterpolators,
  // TransitionPresets,
} from '@react-navigation/stack';
import TabbarAdmin from './TabbarAdmin';
import addStaff from '../admin/container/addStaff';
import information from '../admin/container/information';
import ot from '../admin/container/ot';
import resign from '../admin/container/resign';
import contract from '../admin/container/contract';
import setContract from '../admin/container/contract/setContract';
import addContract from '../admin/container/contract/addContract';
import notify from '../admin/container/notify';
import createQRCode from '../admin/container/checkIn/createQRCode';
import updateProfile from '../admin/container/account/updateProfile';
import contact from '../admin/container/contact';
import history from '../admin/container/checkIn/history';
import event from '../admin/container/event';
import ForgotPass from '../user/container/forgotPassword/forgotPass'
import langs from '../../common/language';
const Stack = createStackNavigator();
StatusBar.setBarStyle('dark-content');
export default function AdminStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        gestureEnabled: true,
        gestureDirection: 'horizontal',
        headerTitleAlign: 'center',
      }}>
      <Stack.Screen
        name={langs.navigator.tabbarAdmin}
        component={TabbarAdmin}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={'Thêm nhân viên'}
        component={addStaff}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={'ForgotPass'}
        component={ForgotPass}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={'Information'}
        component={information}
        options={{
          headerShown: false,
        }}
      />
    
      <Stack.Screen
        name={'OT'}
        component={ot}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={'Resign'}
        component={resign}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={langs.navigator.contact}
        component={contact}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={'Contract'}
        component={contract}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={'SetContract'}
        component={setContract}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={'AddContract'}
        component={addContract}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={langs.navigator.history}
        component={history}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={'CreateQRCode'}
        component={createQRCode}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={langs.navigator.updateProfile}
        component={updateProfile}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={langs.navigator.testNotify}
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
        name={langs.navigator.event}
        component={event}
        options={{
          headerBackTitleVisible: false,

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
  container: {paddingHorizontal: 3},
});
