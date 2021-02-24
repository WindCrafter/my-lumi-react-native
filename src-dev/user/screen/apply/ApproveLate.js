import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Platform,
  StatusBar,
  UIManager,
  ActivityIndicator,
  Text,
  RefreshControl,
  SafeAreaView,
  FlatList, AppState
} from 'react-native';
import _ from 'lodash';

import moment from 'moment';
import langs from '../../../../common/language';
import { BarStatus, EmptyState, Indicator } from '../../../component';
import { Colors, imgs } from '../../../../utlis';
import CardLate from './component/CardLate';
import { URL_STAGING } from '../../../../utlis/connection/url';
import HeaderCustom from './component/HeaderCustom';
import { _GET, _POST } from '../../../../utlis/connection/api';
import { _global } from '../../../../utlis/global/global';

if (
  Platform.OS === 'android'
  && UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}
function ApproveLate(props) {
  const {
    token,

  } = props;

  const [page, setPage] = useState(1);

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState({
    date: null,
    status: 1,
    name: '',
  });
  const [type, setType] = useState('Đang chờ');

  const [refresh, setRefresh] = useState(false);
  const [onScroll, setOnScroll] = useState(false);

  useEffect(() => {
    AppState.addEventListener('change', _handleAppStateChange);

    getData(page, null, 1, [], filter.name);
    return () => {
      AppState.removeEventListener('change', _handleAppStateChange);
    };
  }, []);
  const _handleAppStateChange = (nextAppState) => {
    if (nextAppState === 'active') {
      getData(page, null, 1, [], filter.name);
      console.log('call api for approve late');
    }
  };
  const onSetType = (item) => {
    switch (item) {
      case '0':
        setType('Tất cả');
        break;
      case '1':
        setType('Đang chờ');
        break;
      case '2':
        setType('Đã duyệt');
        break;
      case '3':
        setType('Bị từ chối');
        break;
      case '4':
        setType('Auto Cancel');
        break;
      default:
        console.log(':::Wrong type :', item);
    }
  };
  const getData = async (pageNumber, dateN, statusN, dataN, nameN) => {
    const _date = dateN || '';
    const _status = statusN || 0;
    const _data = dataN || [];
    const _name = nameN || '';
    const apiURL = `${URL_STAGING.LOCAL_HOST}${URL_STAGING.LIST_MANAGER_LATE_EARLY}?page=${pageNumber}&page_size=20&status=${_status}&date=${_date}&name=${_name}`;
    const response = await _GET(apiURL, token, false);
    console.log('_GET_LIST_LATE_EARLY_MANAGER ===========>', response);

    setRefresh(false);
    setLoading(false);
    setOnScroll(false);
    if (
      response.success
      && response.statusCode === 200
      && response.data
      && response.data.length > 0
    ) {
      setData(_data.concat(response.data));
      setPage(pageNumber);
      console.log('checkkk', data);
    }
  };
  const handleLoadMore = () => {
    setLoading(true);
    setOnScroll(false);
    getData(page + 1, filter.date, filter.status, data, filter.name);
  };
  const onChangeDate = (date) => {
    setLoading(true);
    setFilter({
      ...filter,
      date: !date ? '' : moment(date).format('DD/MM/YYYY'),
    });
    setData([]);
    setPage(1);
    getData(
      1,
      !date ? '' : moment(date).format('DD/MM/YYYY'),
      filter.status,
      [],
      filter.name,
    );
  };
  const debouceSearch = _.debounce((value) => {
    onChangeName(value);
  }, 1000);
  const onChangeName = (item) => {
    setLoading(true);
    setFilter({ ...filter, name: item });
    setData([]);
    setPage(1);
    getData(1, filter.date, filter.status, [], item);
  };
  const onChangeStatus = (item) => {
    setLoading(true);
    setFilter({ ...filter, status: item });
    setData([]);
    setPage(1);
    getData(1, filter.date, item, [], filter.name);
    onSetType(item);
  };
  const renderFooterComponent = () => {
    return loading ? (
      <Indicator />
    ) : null;
  };
  const onRefresh = () => {
    setRefresh(true);
    setOnScroll(false);
    console.log('on Refresh');
    getData(1, filter.date, filter.status, [], filter.name);
  };

  const onConfirm = async (item) => {
    const apiURL = `${URL_STAGING.LOCAL_HOST}${URL_STAGING.APPROVE_LATE_EARLY}`;
    const body = {
      id: item.id,
      status: 2,
    };
    const response = await _POST(apiURL, body, token);
    console.log('_APPROVE_LATE_EARLY =============>', response);
    _global.Loading.hide();
    if (response.success && response.statusCode === 200 && response.data) {
      if (filter.status === '0' || filter.status === 0) {
        setData(
          data.map((i) => (i.id === item.id ? { ...item, status: 2 } : i)),
        );
      } else {
        setData(data.filter((i) => i.id !== item.id));
      }
    } else {
      _global.Alert.alert({
        title: langs.alert.notify,
        message: langs.alert.approveFail,
        // messageColor: Colors.danger,
        leftButton: { text: langs.alert.ok },
      });
    }
  };

  const onDeny = async (item) => {
    const apiURL = `${URL_STAGING.LOCAL_HOST}${URL_STAGING.APPROVE_LATE_EARLY}`;
    const body = {
      id: item.id,
      status: 3,
    };
    const response = await _POST(apiURL, body, token);
    console.log('_APPROVE_LATE_EARLY =============>', response);
    _global.Loading.hide();
    if (response.success && response.statusCode === 200 && response.data) {
      if (filter.status === '0' || filter.status === 0) {
        setData(data.map((i) => (i.id === item.id ? { ...item, status: 3 } : i)));
      } else {
        setData(data.filter((i) => i.id !== item.id));
      }
    } else {
      _global.Alert.alert({
        title: langs.alert.notify,
        message: langs.alert.approveFail,
        // messageColor: Colors.danger,
        leftButton: { text: langs.alert.ok },
      });
    }
  };

  const renderItem = ({ item, index }) => {
    return (
      <CardLate
        leader
        status={item.status}
        type={item.type}
        reason={item.content}
        day={item.date}
        time={item.time}
        name={item.fullname}
        onDeny={() => onDeny(item)}
        onAccept={() => onConfirm(item)}
      />
    );
  };
  console.log('checkkk', data);
  const renderEmpty = () => {
    return (
      <EmptyState
        source={imgs.notFound}
        title="Chưa có đơn cần duyệt"
        description="Gặp lại bạn sau nhé."
      />
    );
  };
  const empty = data && data.length === 0 && !loading;
  return (
    <>
      <HeaderCustom
        header={false}
        onChangeStatus={onChangeStatus}
        onChangeDate={onChangeDate}
        onChangeName={debouceSearch}
        type={type}
        dateN={filter.date ? moment(filter.date, 'DD/MM/YYYY')._d : null}
        txtSearch={filter.name}
      />
      <View style={styles.detail}>
        <FlatList
          data={empty ? [1] : data}
          // style={{borderColor: 'red', borderWidth: 1}}
          renderItem={empty ? renderEmpty : renderItem}
          keyExtractor={(item, index) => String(index)}
          onMomentumScrollBegin={() => setOnScroll(true)}
          onEndReached={!loading && onScroll ? handleLoadMore : null}
          onEndReachedThreshold={0.5}
          showsVerticalScrollIndicator={false}
          ListFooterComponent={renderFooterComponent}
          refreshControl={
            <RefreshControl refreshing={refresh} onRefresh={onRefresh} />
          }
        />
      </View>
    </>
  );
}

export default ApproveLate;

const styles = StyleSheet.create({
  detail: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
});
