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
import { BarStatus, HeaderCustom, TabView } from '../../../component';
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
    dataManagerCheck,
    approveLateEarly,
    listManagerCheck,
    approveCheck,
    removeList,
    role,
    refreshing,
    route,
    setDateAdBreak,
    setDateAdLate,
    setDateAdOT,
    setStatusAdBreak,
    setStatusAdLate,
    setStatusAdOT,
    status_ad_break,
    status_ad_late,
    status_ad_ot,
    date_ad_break,
    date_ad_ot,
    date_ad_late,
    page_link,
  } = props;

  const page = route.params && parseInt(route.params.page);
  console.log(
    'route.params.page_link',
    route.params,
  );
  console.log('route.params', route.params.page);
  console.log('date redux', date_ad_break);
  const goBack = () => {
    navigation.goBack();
    removeList();
  };
  const renderTabBar = () => {
    return (
      <DefaultTabBar tabStyle={styles.tab} style={{ borderColor: 'white' }} />
    );
  };
  console.log('finale', page);
  const [routes] = useState([
    { key: '1', title: 'Nghỉ phép' },
    { key: '2', title: 'Đi muộn' },
    { key: '3', title: 'OT' },
    role === 'HR' && { key: '4', title: 'Chấm công' },
  ]);
  const [index, setIndex] = useState(page || 0);
  const renderScene = ({ route }) => {
    switch (route.key) {
      case '1':
        return (
          <ApproveBreak
            tabLabel={langs.break}
            token={token}
            setStatusAdBreak={setStatusAdBreak}
            status_ad_break={status_ad_break}
            date_ad_break={date_ad_break}
            setDateAdBreak={setDateAdBreak}
          />
        );
      case '2':
        return (
          <ApproveLate
            tabLabel={langs.late}
            token={token}
            setStatusAdLate={setStatusAdLate}
            status_ad_late={status_ad_late}
            date_ad_late={date_ad_late}
            setDateAdLate={setDateAdLate}
          />
        );
      case '3':
        return (
          <ApproveOT
            tabLabel={langs.ot}
            token={token}
            setStatusAdOT={setStatusAdOT}
            status_ad_ot={status_ad_ot}
            date_ad_ot={date_ad_ot}
            setDateAdOT={setDateAdOT}
          />
        );
      case '4':
        return (
          <ApproveCheck tabLabel={langs.checkIn} token={token} />
        );
      default:
        return null;
    }
  };
  return (
    <View style={{ ...StyleSheet.absoluteFill, backgroundColor: 'white' }}>
      <HeaderCustom
        title={langs.approveAll}
        height={32}
        goBack={goBack}
        fontSize={24}
      />
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        swipeEnabled
        // style={{ height: -24 }}
      />
      {/* <ScrollableTabView
        tabBarActiveTextColor={Colors.background}
        tabBarUnderlineStyle={{ backgroundColor: Colors.background }}
        renderTabBar={renderTabBar}
        initialPage={page || 0}
      >

        {role === 'HR' && (
          <ApproveCheck tabLabel={langs.checkIn} token={token} />
        )}
      </ScrollableTabView> */}
    </View>
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
  tab: {
    // borderLeftWidth: StyleSheet.hairlineWidth,
    borderColor: 'white',
    paddingTop: 10,
    borderWidth: 0,
    backgroundColor: 'white'
  }
});
