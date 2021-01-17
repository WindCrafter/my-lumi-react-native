import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Platform,
  UIManager,
} from 'react-native';
import _ from 'lodash';
import moment from 'moment';
import { useIsFocused } from '@react-navigation/native';
import {
  BarStatus,
  HeaderCustom,
  TabView,
} from '../../../component';
import { Colors } from '../../../../utlis';
import { _global } from '../../../../utlis/global/global';
import FormOT from './FormOT';
import ListOT from './ListOT';
import { _GET, _POST } from '../../../../utlis/connection/api';
import { URL_STAGING } from '../../../../utlis/connection/url';

if (
  Platform.OS === 'android'
  && UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

function ApplyOT(props) {
  const {
    navigation,
    token,
    overTime,
    getHoliday,
    holiday,
    setStatusUserOT,
    setDateUserOT,
    date_user_ot,
    status_user_ot,
  } = props;
  const [index, setIndex] = useState(0);
  const [initialData, setInitialData] = useState([]);
  const isFocused = useIsFocused();

  const [routes] = useState([
    { key: '1', title: 'Viết đơn' },
    { key: '2', title: 'Xem/sửa đơn' },
  ]);
  useEffect(() => {
    getHoliday({
      token,
      year: `${new Date().getFullYear()},${new Date().getFullYear() + 1}`,
    });
  }, []);
  useEffect(() => {
    // getData(1, '', '', []);
    if (isFocused) {
      getData(1, date_user_ot, status_user_ot, []);
    }

    setInitialData();
  }, [isFocused, status_user_ot]);
  const goBack = () => {
    navigation.goBack();
  };
  const getData = async (pageNumber, dateN, statusN, dataN) => {
    console.log('date', dateN, 'status', statusN);
    const _date = dateN || '';
    const _status = statusN || 0;
    const _dataN = dataN || [];
    const apiURL = `${URL_STAGING.LOCAL_HOST}${URL_STAGING.GET_LIST_OVERTIME}?page=${pageNumber}&page_size=20&status=${_status}&date=${_date}`;
    const response = await _GET(apiURL, token, false);

    console.log('_GET_LIST_OVERTIME ===========>', response);
    if (
      response.success
    && response.statusCode === 200
    && response.data
    && response.data.length > 0
    ) {
      setInitialData(response.data);
    }
  };
  const renderScene = ({ route }) => {
    switch (route.key) {
      case '1':
        return (
          <FormOT
            tabLabel="Tạo đơn"
            getHoliday={getHoliday}
            navigation={navigation}
            token={token}
            holiday={holiday}
            overTime={overTime}
          />
        );
      case '2':
        return (
          <ListOT
            navigation={navigation}
            token={token}
            setStatusUserOT={setStatusUserOT}
            status_user_ot={status_user_ot}
            tabLabel="Xem/sửa đơn"
            initialData={initialData}
            setDateUserOT={setDateUserOT}
            date_user_ot={date_user_ot}
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

export default ApplyOT;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    height: '100%',
  },

});
