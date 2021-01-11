import React, { useState, useEffect } from 'react';
import {
  Image,
  Platform,
  StatusBar,
  StyleSheet,
  View,
  FlatList,
  ActivityIndicator,
  Text,
} from 'react-native';
import moment from 'moment';
import ScrollableTabView, { DefaultTabBar } from 'react-native-scrollable-tab-view';
import { Colors, imgs } from '../../../../utlis';
import { BarStatus, HeaderCustom } from '../../../component';
import langs from '../../../../common/language';
import { _global } from '../../../../utlis/global/global';
import ApproveBreak from './ApproveBreak';
import ApproveLate from './ApproveLate';
import ApproveOT from './ApproveOT';
import ApproveCheck from './ApproveCheck';

const ApproveAll = (props) => {
  const {
    navigation,
    listManagerLateEarly,
    token,
    dataManager,
    approveLateEarly,
    removeList,
    refreshing,
  } = props;
  const goBack = () => {
    navigation.goBack();
    removeList();
  };
  const renderTabBar = () => {
    return (
      <DefaultTabBar tabStyle={styles.tab} />
    );
  };
  return (
    <>
      <BarStatus
        height={Platform.OS === 'ios' ? 46 : StatusBar.currentHeight}
      />
      <HeaderCustom
        title={langs.navigator.approve}
        height={60}
        goBack={goBack}
        fontSize={24}
      />
      <ScrollableTabView tabBarActiveTextColor={Colors.background} tabBarUnderlineStyle={{ backgroundColor: Colors.background }} renderTabBar={renderTabBar}>
        <ApproveBreak tabLabel={langs.break} token={token} />
        <ApproveLate
          tabLabel={langs.late}
          token={token}
          dataManager={dataManager}
          refreshing={refreshing}
          listManagerLateEarly={listManagerLateEarly}
          approveLateEarly={approveLateEarly}
        />
        <ApproveOT tabLabel={langs.ot} token={token} />
        <ApproveCheck tabLabel={langs.checkIn} />
      </ScrollableTabView>
    </>
  );
};

export default ApproveAll;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  flatList: {
    // marginBottom: heightPercentageToDP(12),
    // flexGrow: 1,
  },
  noData: { fontSize: 16, alignSelf: 'center', marginTop: 24 },
  tab:{
    // borderLeftWidth: StyleSheet.hairlineWidth,
    borderColor: 'grey',
    paddingTop: 10,
  }
});
