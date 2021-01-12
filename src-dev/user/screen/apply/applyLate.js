/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Platform,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  LayoutAnimation,
  UIManager,
  Image,
  Keyboard,
  FlatList,
} from 'react-native';
import moment from 'moment';
import DropDownPicker from 'react-native-dropdown-picker';
import ScrollableTabView, { ScrollableTabBar } from 'react-native-scrollable-tab-view';
import {
  heightPercentageToDP,
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { Card } from 'native-base';
import HistoryLate from './HistoryLate';
import ApplyLate2 from './applyLate2';
import InputApply from '../../../component/Input/inputApply';
import langs from '../../../../common/language';
import {
  BarStatus,
  HeaderCustom,
  Button,
  InputSelect,
  SelectButton,
  ScrollableTabBarCustom,
} from '../../../component';
import { _global } from '../../../../utlis/global/global';
import { URL_STAGING } from '../../../../utlis/connection/url';
import { _GET, _POST } from '../../../../utlis/connection/api';
import { imgs, Colors } from '../../../../utlis';

if (
  Platform.OS === 'android'
  && UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

function ApplyLate(props) {
  const {
    navigation,
    setLateEarly,
    token,
    assign,
    setStatusUserLate,
    status_user_late,
  } = props;
  const [initialData, setInitialData] = useState([]);
  let response = {};

  useEffect(() => {
    // getData(1, '', '', []);

    const unsubscribe = navigation.addListener('focus', () => {
      const getData = async (pageNumber, dateN, statusN, dataN) => {
        const _date = dateN || '';
        const _status = statusN || 0;
        const _dataN = dataN || [];
        const apiURL = `${URL_STAGING.LOCAL_HOST}${URL_STAGING.LIST_LATE_EARLY}?page=${pageNumber}&page_size=20&status=${_status}&date=${_date}`;
        response = await _GET(apiURL, token, false);
        console.log('_GET_LIST_LATE_EARLY ===========>', response);

        if (
          response.success
          && response.statusCode === 200
          && response.data
          && response.data.length > 0
        ) {
          // console.log('heyyyy');
          setInitialData(response.data);
        }
      };
      getData(1, null, status_user_late, []);
      console.log('statusstatussta redux', status_user_late);
      // console.log('statusstatussta pppp', response.data);
      // console.log('statusstatussta pppp', hey);
    });
    setInitialData();

    return () => {
      unsubscribe;
    };
  }, [navigation]);

  const goBack = () => {
    navigation.goBack();
  };
  // const onChangeTab = (item) => {
  //   if (item.i === 1 && item.from === 0) {
  //     getData(1, null, status_user_late, []);
  //     console.log('status', status_user_late);
  //   } else console.log(item)
  // };'
  // console.log('response', initialData);
  return (
    <View style={styles.container}>
      <BarStatus backgroundColor={Colors.white} height={20} />
      <HeaderCustom
        title="Đơn xin đi muộn"
        height={44}
        goBack={goBack}
        fontSize={20}
      />

      <ScrollableTabView
        contentProps={{ keyboardShouldPersistTaps: 'handled' }}
        tabBarUnderlineStyle={{ height: 3, backgroundColor: Colors.background }}
        tabBarBackgroundColor={Colors.white}
        tabBarActiveTextColor={Colors.background}
        tabBarInactiveTextColor={Colors.itemInActive}
        locked
        tabBarTextStyle={{ fontSize: 16, marginLeft: -4 }}
        renderTabBar={() => (Platform.OS === 'android' ? (
          <ScrollableTabBar style={{ borderBottomColor: 'white' }} />
        ) : (
          <ScrollableTabBarCustom
            style={{
              borderBottomWidth: 0,
              borderBottomColor: 'black',
              marginBottom: 8,
              height: 68,
              // backgroundColor: 'red'
            }}
            tabStyle={{
              height: 68,
              justifyContent: 'center',
              marginRight: 20,
              marginLeft: 5,
            }}
            tabsContainerStyle={{
              marginLeft: 16,
              justifyContent: 'flex-start',
            }}
          />
        ))
        }
      >
        <ApplyLate2 tabLabel="Tạo đơn" />
        <HistoryLate
          navigation={navigation}
          token={token}
          setStatusUserLate={setStatusUserLate}
          status_user_late={status_user_late}
          tabLabel="Xem/sửa đơn"
          initialData={initialData}

        />
      </ScrollableTabView>
    </View>
  );
}

export default ApplyLate;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    flex: 1,
    zIndex: 0,
  },
  image: {
    width: 56,
    height: 56,
    borderRadius: 32,
  },
  title: {
    fontSize: 20,
    fontWeight: '300',
    color: Colors.background,
  },
  detail: {
    flexDirection: 'column',
    justifyContent: 'space-around',
    marginHorizontal: 12,
    flex: 1,
  },
  status: {
    flexDirection: 'row',
    marginVertical: 16,
    justifyContent: 'space-between',
  },
  img: {
    padding: 8,
    borderRadius: 16,
    alignSelf: 'center',
    marginRight: 8,
  },
  imageStamp: {
    width: 20,
    height: 20,
  },
  txtStatus: {
    alignSelf: 'center',
    fontSize: 18,
    fontWeight: '300',
  },
  extend: {
    fontSize: 18,
    fontWeight: '500',
    marginHorizontal: 27,
    marginTop: 16,
    marginBottom: 4,
  },
  end: {
    backgroundColor: 'red',
  },
  complete: {
    backgroundColor: Colors.background,

  },
  bottom: {
    position: 'absolute',
    bottom: 32,
    left: wp(12.5),
  },
  row: {
    flexDirection: 'row',
    marginVertical: 8,
    flex: 1,
  },
  txtTime: {
    fontSize: 16,
    color: Colors.black,
    alignSelf: 'center',
    marginHorizontal: 8,
  },
  card: {
    borderRadius: 16,
    marginTop: 8,
    width: '90%',
    alignSelf: 'center',
    backgroundColor: '#ffffff',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  icon: {
    alignSelf: 'center',
    marginHorizontal: 8,
  },
  btUser: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rowUser: {
    flexDirection: 'row',
    marginVertical: 8,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  lineUser: {
    height: StyleSheet.hairlineWidth,
    width: wp(70),
    alignSelf: 'center',
    backgroundColor: 'grey',
  },
  textUser: {
    marginLeft: 24,
    fontSize: 16,
    fontWeight: '500',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 32,
  },
  column: {
    flexDirection: 'column',
  },
  textPos: {
    marginLeft: 24,
    fontSize: 12,
  },
  viewInputSelect: {
    backgroundColor: Colors.white,
  },
  imgContainer: {
    padding: 8,
    borderRadius: 16,
    alignSelf: 'center',
    marginRight: 8,
    flexDirection: 'row',
  },
  time: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  dropDownStyle: {
    width: 148,
    left: -36,
    height: hp(18),
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    borderColor: 'grey',
    borderWidth: StyleSheet.hairlineWidth,
  },
  buttonTime: {
    flexDirection: 'row',
    borderRadius: 16,
    borderColor: 'grey',
    borderWidth: StyleSheet.hairlineWidth,
    width: 160,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
    paddingVertical: 8,
  },
  filter: {
    flexDirection: 'row',
    alignSelf: 'center',
  },
});
