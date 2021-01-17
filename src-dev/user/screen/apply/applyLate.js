import React, { useState, useEffect } from 'react';

import {
  StyleSheet,
  View,
  Platform,
  UIManager,
} from 'react-native';
import { useIsFocused } from '@react-navigation/native';

import HistoryLate from './HistoryLate';

import FormLate from './FormLate';
import langs from '../../../../common/language';
import {
  BarStatus,
  HeaderCustom,
  TabView,
} from '../../../component';
import { _global } from '../../../../utlis/global/global';
import { URL_STAGING } from '../../../../utlis/connection/url';
import { _GET, _POST } from '../../../../utlis/connection/api';
import { Colors } from '../../../../utlis';

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
    setStatusUserLate,
    status_user_late,
    date_user_late,
    setDateUserLate,
  } = props;
  const [initialData, setInitialData] = useState([]);
  const [routes] = useState([
    { key: '1', title: 'Viết đơn' },
    { key: '2', title: 'Xem/sửa đơn' },
  ]);
  const [index, setIndex] = useState(0);
  console.log(date_user_late);
  let response = {};
  const getData = async (pageNumber, dateN, statusN, dataN) => {
    const _date = dateN || '';
    const _status = statusN || 0;
    const apiURL = `${URL_STAGING.LOCAL_HOST}${URL_STAGING.LIST_LATE_EARLY}?page=${pageNumber}&page_size=20&status=${_status}&date=${_date}`;
    response = await _GET(apiURL, token, false);
    console.log('_GET_LIST_LATE_EARLY ===========>', response);

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
      getData(1, date_user_late, status_user_late, []);
      console.log('statusstatussta redux', status_user_late, date_user_late);
    }

    setInitialData();
  }, [isFocused, status_user_late]);

  const goBack = () => {
    console.log('checkkkkkking');
    navigation.navigate(langs.navigator.home);
  };
  const renderScene = ({ route }) => {
    switch (route.key) {
      case '1':
        return (
          <FormLate
            tabLabel="Tạo đơn"
            setLateEarly={setLateEarly}
            navigation={navigation}
            token={token}
          />
        );
      case '2':
        return (
          <HistoryLate
            navigation={navigation}
            token={token}
            setStatusUserLate={setStatusUserLate}
            status_user_late={status_user_late}
            tabLabel="Xem/sửa đơn"
            initialData={initialData}
            setDateUserLate={setDateUserLate}
            date_user_late={date_user_late}
          />
        );
      default:
        return null;
    }
  };
  console.log('response', initialData);
  return (
    <View style={styles.container}>
      <BarStatus backgroundColor={Colors.white} height={20} />
      <HeaderCustom
        title="Đơn xin đi muộn"
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

export default ApplyLate;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    flex: 1,
    zIndex: 0,
  },
  
});
