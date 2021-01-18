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
import langs from '../../../../common/language';
import { BarStatus } from '../../../component';
import { Colors } from '../../../../utlis';
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
  const { navigation, token } = props;
  const [page, setPage] = useState(1);
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({});
  const [filter, setFilter] = useState({ date: '', status: 1, name: '' });
  const [type, setType] = useState('Đang chờ');
  const [refresh, setRefresh] = useState(false);
  const [onScroll, setOnScroll] = useState(false);

  useEffect(() => {
    getData(page, filter.date, filter.status, [], filter.name);
    setDone(true);
    _global.Loading.hide();
  }, []);

  const goBack = () => {
    navigation.goBack();
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
      default:
        console.log(item);
    }
  };
  const renderItem = ({ item, index }) => {
    // console.log(item);
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
        is_updated={item.is_updated}
      />
    );
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
    const _date = dateN || '';
    const _status = statusN || 0;
    const _data = dataN || [];
    const _name = nameN || '';
    const apiURL = `${URL_STAGING.LOCAL_HOST}${URL_STAGING.LIST_MANAGER_LATE_EARLY}?page=${pageNumber}&page_size=20&status=${_status}&date=${_date}&name=${_name}`;
    const response = await _GET(apiURL, token, false);
    setRefresh(false);
    setLoading(false);
    setOnScroll(false);
    console.log('_GET_LIST_LATE_EARLY ===========>', response);
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
    return loading ? (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    ) : null;
  };

  const onChangeDate = (date) => {
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
    setFilter({ ...filter, status: item });
    setData([]);
    setPage(1);
    getData(1, filter.date, item, [], filter.name);
    onSetType(item);
  };

  const onChangeName = (item) => {
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
        onChangeName={onChangeName}
        type={type}
        CONFIRM_DENY_TAKE_LEAVE
        search
        txtSearch={filter.name}
      />
      <View style={styles.detail}>
        {(data.length === 0) && (
          <Text style={styles.noData}>Không có đơn cần duyệt</Text>
        )}
        <FlatList
          data={data}
          // style={{borderColor: 'red', borderWidth: 1}}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
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

  },
  noData: {
    fontSize: 16,
    alignSelf: 'center',
    marginTop: 24,
  },
});
