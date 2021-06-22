import React from 'react';
import { StatusBar } from 'react-native';
import {
  createStackNavigator,
  CardStyleInterpolators,
  // TransitionPresets,
} from '@react-navigation/stack';
import contact from '../user/container/contact';
import applyLate from '../user/container/apply/applyLate';
import applyOT from '../user/container/apply/applyOT';
import ListOT from '../user/container/apply/ListOT';
import ApproveOT from '../user/container/apply/ApproveOT';
import applyBreak from '../user/container/apply/applyBreak';
import applyWFH from '../user/container/apply/applyWFH';
import HistoryWFH from '../user/container/apply/HistoryWFH';
import updateWFH from '../user/container/apply/updateWFH';
import updateBreak from '../user/container/apply/updateBreak';
import updateOT from '../user/container/apply/updateOT';
import updateLate from '../user/container/apply/updateLate';
import notify from '../user/container/notify';
import TabbarUser from './TabbarUser';
import updateProfile from '../user/container/account/updateProfile';
import SelectBank from '../user/container/account/selectBank';
import history from '../user/container/checkIn/history';
import Event from '../user/container/event';
import PickTeam from '../user/container/event/PickTeam';
import allHistory from '../user/container/allHistory/index';
import Confirm from '../user/screen/notify/type/confirm';
import verify from '../user/container/notify/verify';
import NotifyDetail from '../user/container/notify/notifyDetail';
import Assignment from '../user/container/apply/Assignment';
import langs from '../../common/language';
import HistoryLate from '../user/container/apply/HistoryLate';
import ApproveLate from '../user/container/apply/ApproveLate';
import HistoryBreak from '../user/container/apply/HistoryBreak';
import ApproveBreak from '../user/container/apply/ApproveBreak';
import ChangePass from '../user/container/changePass/index';
import Kpi from '../user/container/kpi';
import ApproveAll from '../user/container/apply/ApproveAll';
import DetailEvent from '../user/container/event/DetailEvent';
import ListEvent from '../user/container/event/ListEvent';
import AddEvent from '../user/container/event/AddEvent';
import EditEvent from '../user/container/event/EditEvent';
import DetailEventByNotify from '../user/container/event/DetailEventByNotify';

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
      }}
    >
      <Stack.Screen
        name={langs.navigator.tabbarUser}
        component={TabbarUser}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={langs.navigator.changePass}
        component={ChangePass}
        options={{
          headerShown: false,
          gestureEnabled: false,
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
        name={langs.navigator.applyLate}
        component={applyLate}
        options={{
          headerShown: false,
          gestureEnabled: false,
        }}
      />
      <Stack.Screen
        name={langs.navigator.approveOT}
        component={ApproveOT}
        options={{
          headerShown: false,
          gestureEnabled: false,
        }}
      />
      <Stack.Screen
        name={langs.navigator.approve}
        component={ApproveAll}
        options={{
          headerShown: false,
          gestureEnabled: false,
        }}
      />
      <Stack.Screen
        name={langs.navigator.applyBreak}
        component={applyBreak}
        options={{
          headerShown: false,
          gestureEnabled: false,
        }}
      />
      <Stack.Screen
        name={langs.navigator.updateBreak}
        component={updateBreak}
        options={{
          headerShown: false,
          gestureEnabled: false,
        }}
      />
      <Stack.Screen
        name={langs.navigator.updateLate}
        component={updateLate}
        options={{
          headerShown: false,
          gestureEnabled: false,
        }}
      />
      <Stack.Screen
        name={langs.navigator.updateOT}
        component={updateOT}
        options={{
          headerShown: false,
          gestureEnabled: false,
        }}
      />
      <Stack.Screen
        name={langs.navigator.approveBreak}
        component={ApproveBreak}
        options={{
          headerShown: false,
          gestureEnabled: false,
        }}
      />
      <Stack.Screen
        name={langs.navigator.applyOT}
        component={applyOT}
        options={{
          headerShown: false,
          gestureEnabled: false,
        }}
      />
      <Stack.Screen
        name={langs.navigator.listOT}
        component={ListOT}
        options={{
          headerShown: false,
          gestureEnabled: false,
        }}
      />
      <Stack.Screen
        name={langs.navigator.historyBreak}
        component={HistoryBreak}
        options={{
          headerShown: false,
          gestureEnabled: false,
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
        name={langs.navigator.allHistory}
        component={allHistory}
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
        name={langs.navigator.notify}
        component={notify}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={langs.navigator.confirm}
        component={Confirm}
        options={{
          headerBackTitleVisible: false,
          headerStyle: {
            backgroundColor: 'rgb(47, 172, 79)',
          },
          headerTintColor: 'white',
        }}
      />
      <Stack.Screen
        name={langs.navigator.verify}
        component={verify}
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
        component={Event}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={langs.navigator.pickTeam}
        component={PickTeam}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={langs.navigator.notifyDetail}
        component={NotifyDetail}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={langs.navigator.assignment}
        component={Assignment}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={langs.navigator.historyLate}
        component={HistoryLate}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={langs.navigator.approveLate}
        component={ApproveLate}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={langs.navigator.selectBank}
        component={SelectBank}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={langs.navigator.kpi}
        component={Kpi}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={langs.navigator.detailEvent}
        component={DetailEvent}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={langs.navigator.detailEventByNotify}
        component={DetailEventByNotify}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={langs.navigator.listEvent}
        component={ListEvent}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={langs.navigator.addEvent}
        component={AddEvent}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={langs.navigator.editEvent}
        component={EditEvent}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={langs.navigator.applyWFH}
        component={applyWFH}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={langs.navigator.historyWFH}
        component={HistoryWFH}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={langs.navigator.updateWFH}
        component={updateWFH}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}
