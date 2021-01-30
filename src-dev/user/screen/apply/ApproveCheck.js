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
  FlatList,
} from 'react-native';
import moment from 'moment';
import _ from 'lodash';
import langs from '../../../../common/language';
import { BarStatus, EmptyState, Indicator } from '../../../component';
import { Colors, imgs } from '../../../../utlis';
import CardCheck from './component/CardCheck';
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
function ApproveCheck(props) {
  const { navigation, token } = props;
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState({ date: '', status: 1, name: '' });
  const [type, setType] = useState('Đang chờ');
  const [refresh, setRefresh] = useState(false);
  const [onScroll, setOnScroll] = useState(false);

  useEffect(() => {
    getData(page, filter.date, filter.status, [], filter.name);
  }, []);

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
    }
  };
  const renderItem = ({ item, index }) => {
    return (
      <CardCheck
        status={item.status}
        type={item.type === 2 ? 'Check Out' : 'Check In'}
        day={item.date}
        time={item.type === 2 ? moment(item.check_out * 1000).format('HH:mm') : moment(item.check_in * 1000).format('HH:mm')}
        name={item.fullname}
        onDeny={() => onDeny(item)}
        onAccept={() => onConfirm(item)}
      />
    );
  };
  const onConfirm = async (item) => {
    const apiURL = `${URL_STAGING.LOCAL_HOST}${URL_STAGING.APPROVE_CHECK_REQUEST}`;
    const body = {
      id: item.id,
      status: 2,
      type: item.type,
    };
    const response = await _POST(apiURL, body, token);
    setLoading(false);
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
    } else if (
      !response.success
      && response.statusCode === 600
      && response.data
    ) {
      _global.Alert.alert({
        title: langs.alert.notify,
        message: response.message,
        // messageColor: Colors.danger,
        leftButton: { text: langs.alert.ok },
      });
      setData(
        data.map((i) => (i.id === item.id
          ? {
            ...item,
            date: response.data.date,
            time: response.data.time,
            content: response.data.content,
            is_updated: true

          }
          : i),),
      );
    } else if (
      !response.success
             && response.statusCode === 601
             && response.data
    ) {
      _global.Alert.alert({
        title: langs.alert.notify,
        message: response.message,
        // messageColor: Colors.danger,
        leftButton: { text: langs.alert.ok },
      });
      console.log('data,data', data);
      const newData = [...data];
      const prevIndex = data.findIndex((check) => check.id === item.id);
      newData.splice(prevIndex, 1);
      setData(newData);
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
    const apiURL = `${URL_STAGING.LOCAL_HOST}${URL_STAGING.APPROVE_CHECK_REQUEST}`;
    const body = {
      id: item.id,
      status: 3,
      type: item.type,
    };
    const response = await _POST(apiURL, body, token);
    console.log('_APPROVE_LATE_EARLY =============>', response);
    setLoading(false);
    _global.Loading.hide();
    if (response.success && response.statusCode === 200 && response.data) {
      if (filter.status === '0' || filter.status === 0) {
        setData(data.map((i) => (i.id === item.id ? { ...item, status: 3 } : i)));
      } else {
        setData(data.filter((i) => i.id !== item.id));
      }
    } else if (
      !response.success
             && response.statusCode === 600
             && response.data
    ) {
      _global.Alert.alert({
        title: langs.alert.notify,
        message: response.message,
        // messageColor: Colors.danger,
        leftButton: { text: langs.alert.ok },
      });
    } else if (
      !response.success
             && response.statusCode === 601
             && response.data
    ) {
      _global.Alert.alert({
        title: langs.alert.notify,
        message: response.message,
        // messageColor: Colors.danger,
        leftButton: { text: langs.alert.ok },
      });
    } else {
      _global.Alert.alert({
        title: langs.alert.notify,
        message: langs.alert.approveFail,
        // messageColor: Colors.danger,
        leftButton: { text: langs.alert.ok },
      });
    }
  };

  const onRefresh = () => {
    setRefresh(true);
    setOnScroll(false);
    console.log('on Refresh');
    getData(1, filter.date, filter.status, [], filter.name);
  };

  const getData = async (pageNumber, dateN, statusN, dataN, nameN) => {
    const _date = dateN || moment().format('DD/MM/YYYY');
    const _status = statusN || 0;
    const _data = dataN || [];
    const _name = nameN || '';
    const apiURL = `${URL_STAGING.LOCAL_HOST}${URL_STAGING.LIST_CHECK_REQUEST}?page=${pageNumber}&page_size=20&status=${_status}&date=${_date}&name=${_name}`;
    const response = await _GET(apiURL, token, false);
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
    }
  };

  const handleLoadMore = () => {
    setLoading(true);
    setOnScroll(false);
    getData(page + 1, filter.date, filter.status, data, filter.name);
  };

  const renderFooterComponent = () => {
    return loading ? <Indicator /> : null;
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

  const onChangeStatus = (item) => {
    setLoading(true);
    setFilter({ ...filter, status: item });
    setData([]);
    setPage(1);
    getData(1, filter.date, item, [], filter.name);
    onSetType(item);
  };

  const status = [
    { label: 'Tất cả', value: '0' },
    { label: 'Đang chờ', value: '1' },
    { label: 'Đã duyệt', value: '2' },
    { label: 'Bị từ chối', value: '3' },
    { label: 'Auto Cancel', value: '4' },
  ];
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
  console.log(data);
  console.log(filter.status);
  return (
    <>
      <HeaderCustom
        header={false}
        onChangeStatus={onChangeStatus}
        onChangeDate={onChangeDate}
        onChangeName={debouceSearch}
        type={type}
        CONFIRM_DENY_TAKE_LEAVE
        search
        txtSearch={filter.name}
        flatStatus={status}
      />
      <View style={styles.detail}>
        {data
          && data.length === 0
          && !loading
          && (
            <EmptyState
              source={imgs.notFound}
              title="Chưa có đơn cần duyệt"
              description="Gặp lại bạn sau nhé."
            />
          )}
        <FlatList
          // saga
          // data={historyAdminTakeLeave}
          onMomentumScrollBegin={() => setOnScroll(true)}
          onEndReached={!loading && onScroll ? handleLoadMore : null}
          onEndReachedThreshold={0.5}
          ListFooterComponent={renderFooterComponent}
          data={data}
          keyExtractor={(item, index) => String(index)}
          renderItem={renderItem}
          refreshControl={
            <RefreshControl refreshing={refresh} onRefresh={onRefresh} />
          }
        />
      </View>
    </>
  );
}

export default ApproveCheck;

const styles = StyleSheet.create({
  detail: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
});
