import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Platform,
  UIManager,
} from 'react-native';
import {
  widthPercentageToDP } from 'react-native-responsive-screen';
import ScrollableTabView, {
  ScrollableTabBar,
} from 'react-native-scrollable-tab-view';
import { useIsFocused } from '@react-navigation/native';
import langs from '../../../../common/language';
import {
  BarStatus,
  HeaderCustom,
  ScrollableTabBarCustom,
  TabView,
} from '../../../component';
import { Colors, Fonts } from '../../../../utlis';
import { _global } from '../../../../utlis/global/global';
import FormBreak from './FormBreak';
import HistoryBreak from './HistoryBreak';
import { URL_STAGING } from '../../../../utlis/connection/url';
import { _GET, _POST } from '../../../../utlis/connection/api';

if (
  Platform.OS === 'android'
  && UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

function ApplyBreak(props) {
  const {
    navigation,
    takeLeave,
    token,
    date_user_break,
    setStatusUserBreak,
    setDateUserBreak,
    status_user_break,
  } = props;
  const [initialData, setInitialData] = useState([]);
  const [routes] = useState([
    { key: '1', title: 'Viết đơn' },
    { key: '2', title: 'Xem/sửa đơn' },
  ]);
  const [index, setIndex] = useState(0);
  let response = {};
  const getData = async (pageNumber, dateN, statusN, dataN) => {
    const _date = dateN || '';
    const _status = statusN || 0;
    const apiURL = `${URL_STAGING.LOCAL_HOST}${URL_STAGING.LIST_TAKE_LEAVE}?page=${pageNumber}&page_size=20&status=${_status}&date=${_date}`;
    response = await _GET(apiURL, token, false);
    console.log('_GET_LIST_BREAK ===========>', response);

    if (
      response.success
      && response.statusCode === 200
      && response.data
      && response.data.length >= 0
    ) {
      console.log('heyyyy', response.data);
      setInitialData(response.data);
    }
  };
  const isFocused = useIsFocused();

  useEffect(() => {
    // getData(1, '', '', []);

    if (isFocused) {
      getData(1, date_user_break, status_user_break, []);
      // console.log('statusstatussta redux', status_user_break, date_user_break);
    }

    setInitialData();
  }, [isFocused, status_user_break]);

  const goBack = () => {
    console.log('checkkkkkking');
    navigation.navigate(langs.navigator.home);
  };
  // console.log('response truyen', initialData);
  const renderScene = ({ route }) => {
    switch (route.key) {
      case '1':
        return (
          <FormBreak
            takeLeave={takeLeave}
            navigation={navigation}
            token={token}
          />
        );
      case '2':
        return (
          <HistoryBreak
            navigation={navigation}
            token={token}
            setStatusUserBreak={setStatusUserBreak}
            status_user_break={status_user_break}
            initialData={initialData}
            setDateUserBreak={setDateUserBreak}
            date_user_break={date_user_break}
          />
        );
      default:
        return null;
    }
  };
  return (
    <View style={styles.container}>
      <BarStatus backgroundColor={Colors.white} height={20} />
      <HeaderCustom
        title="Đơn xin đi nghỉ phép"
        height={72}
        goBack={goBack}
        fontSize={20}
      />
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        swipeEnabled={false}
      />
    </View>
  );
}

export default ApplyBreak;

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: 'white',
  },
  image: {
    width: 56,
    height: 56,
    borderRadius: 32,
  },
  detail: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginHorizontal: 12,
    marginVertical: 32,
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
  button: {
    backgroundColor: Colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    flexDirection: 'row',
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
  row: {
    flexDirection: 'row',
  },
  txtTime: {
    fontSize: 14,
    color: Colors.black,
    marginLeft: 10,
  },
  rowBot: {
    flexDirection: 'row',
    marginHorizontal: 4,
    marginTop: 16,
    justifyContent: 'space-around',
    flex: 1,
  },
  columnShift: {
    alignItems: 'flex-start',
    // borderWidth: 1,
    justifyContent: 'space-around',
  },
  icon: {
    alignSelf: 'center',
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
    width: widthPercentageToDP(70),
    alignSelf: 'center',
    backgroundColor: 'grey',
  },
  textUser: {
    marginLeft: 24,
    fontSize: 16,
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
});
