import React, { useState, useEffect } from 'react';
import {
  Image,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { widthPercentageToDP } from 'react-native-responsive-screen';
import { Card } from 'native-base';
import moment from 'moment';
import { Colors, imgs } from '../../../../utlis';
import { BarStatus } from '../../../component';
import langs from '../../../../common/language';
import CardBreakLeader from './component/CardBreakLeader';
import HeaderCustom from './component/HeaderCustom';
import { _GET, _POST } from '../../../../utlis/connection/api';
import { _global } from '../../../../utlis/global/global';
import { URL_STAGING } from '../../../../utlis/connection/url';
import CardBreak from './component/CardBreak';

const ApproveBreak = (props) => {
  const {
    navigation,
    token,
    setStatusAdBreak,
    status_ad_break,
    date_ad_break,
    setDateAdBreak,
  } = props;
  let initialType;
  switch (status_ad_break) {
    case '0':
      initialType = 'Tất cả';
      break;
    case '1':
      initialType = 'Đang chờ';
      break;
    case '2':
      initialType = 'Đã duyệt';
      break;
    case '3':
      initialType = 'Bị từ chối';
      break;
    case '4':
      initialType = 'Auto Cancel';
      break;
    default:
      0;
  }
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState({
    date: date_ad_break,
    status: status_ad_break,
    name: '',
  });
  const [type, setType] = useState(initialType || 'Đang chờ')
  const [date, setDate] = useState('');
  const [refresh, setRefresh] = useState(false);
  const [onScroll, setOnScroll] = useState(false);

  useEffect(() => {
    console.log('date', date_ad_break);
        console.log('status', status_ad_break);

    getData(1, date_ad_break, status_ad_break, [], filter.name);
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
        0;
    }
  };
  const goBack = () => {
    navigation.navigate(langs.navigator.historyBreak);
  };

  // saga
  // const getData = () => {
  //   const dataLeave = {
  //     status: 0,
  //     page: page,
  //     token: token,
  //   };
  //   listAdminTakeLeave(dataLeave);
  // };

  const getData = async (pageNumber, dateN, statusN, dataN, nameN) => {
    const _date = dateN || '';
    const _status = statusN || 0;
    const _data = dataN || [];
    const _name = nameN || '';
    const apiURL = `${URL_STAGING.LOCAL_HOST}${URL_STAGING.GET_LIST_ADMIN_TAKE_LEAVE}?page=${pageNumber}&page_size=20&status=${_status}&date=${_date}&name=${_name}`;
    const response = await _GET(apiURL, token, false);
    console.log('_GET_LIST_TAKELEAVE_MANAGER ===========>', response);
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
  // saga
  // const onChangeDate = (date) => {
  //   const pickDate = moment(date, 'DD/MM/YYYY').toDate();
  //   console.log(moment(pickDate).format('DD/MM/YYYY'));
  //   setFilter({...filter, date: moment(pickDate).format('DD/MM/YYYY')});
  //   setData([]);
  //   setPage(1);
  //   const dataLeave = {
  //     status: 0,
  //     page: page,
  //     token: token,
  //     date: date ? moment(pickDate).format('DD/MM/YYYY') : null,
  //   };
  //   listAdminTakeLeave(dataLeave);
  // };
  const onChangeDate = (datePick) => {
    setFilter({
      ...filter,
      date: !datePick ? '' : moment(datePick).format('DD/MM/YYYY'),
    });
    setData([]);
    setPage(1);
    getData(
      1,
      !datePick ? '' : moment(datePick).format('DD/MM/YYYY'),
      filter.status,
      [],
      filter.name,
    );
    setDateAdBreak(!datePick ? '' : moment(datePick).format('DD/MM/YYYY'));
  };
  const onChangeName = (item) => {
    setFilter({ ...filter, name: item });
    setData([]);
    setPage(1);
    getData(1, filter.date, filter.status, [], item);
  };
  // saga
  // const onChangeStatus = (item) => {
  //   setFilter({...filter, status: item});
  //   setData([]);
  //   setPage(1);
  //   const dataLeave = {
  //     status: item,
  //     page: page,
  //     token: token,
  //   };
  //   listAdminTakeLeave(dataLeave);
  //   onSetType(item);
  // };
  const onChangeStatus = (item) => {
    setFilter({ ...filter, status: item });
    setData([]);
    setPage(1);
    getData(1, filter.date, item, [], filter.name);
    onSetType(item);
    setStatusAdBreak(item);
  };

  const renderFooterComponent = () => {
    return loading ? (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#ABB0BB" />
      </View>
    ) : null;
  };

  const onConfirm = async (item) => {
    const apiURL = `${URL_STAGING.LOCAL_HOST}${URL_STAGING.CONFIRM_DENY_TAKE_LEAVE}`;
    const body = {
      _id: item,
      status: 2,
    };
    const response = await _POST(apiURL, body, token);
    console.log('_APPROVE_BREAK =============>', response);
    _global.Loading.hide();
    setLoading(false);
    if (response.success && response.statusCode === 200 && response.data) {
      if (filter.status === '0' || filter.status === 0) {
        setData(
          data.map((i) => (i._id === response.data._id
            ? { ...i, status: response.data.status }
            : i),),
        );
      } else {
        setData(data.filter((i) => i._id !== response.data._id));
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
  const onRefresh = () => {
    setRefresh(true);
    setOnScroll(false);

    getData(1, filter.date, filter.status, [], filter.name);
  };

  const onDeny = async (item) => {
    const apiURL = `${URL_STAGING.LOCAL_HOST}${URL_STAGING.CONFIRM_DENY_TAKE_LEAVE}`;
    const body = {
      _id: item._id,
      status: 3,
    };
    const response = await _POST(apiURL, body, token);
    console.log('_DENY =============>', response);
    _global.Loading.hide();
    setLoading(false);
    if (response.success && response.statusCode === 200 && response.data) {
      if (filter.status === '0' || filter.status === 0) {
        setData(
          data.map((i) => (i._id === response.data._id
            ? { ...i, status: response.data.status }
            : i),),
        );
      } else {
        setData(data.filter((i) => i._id !== response.data._id));
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
        data.map((i) => (i._id === item._id
          ? {
            ...item,
            date: response.data.date,
            time: response.data.time,
            content: response.data.content,
            is_updated: true,
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
      const prevIndex = data.findIndex((check) => check._id === item._id);
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

  const renderItem = ({ item, index }) => {
    const _listDate = item.date.map((i) => moment(i, 'DD/MM/YYYY').format('DD/MM/YYYY'),);
    return (
      <CardBreakLeader
        name={item.fullname}
        status={item.status}
        type={item.type}
        date={_listDate}
        reason={item.content}
        onDeny={() => onDeny(item)}
        onAccept={() => onConfirm(item._id)}
        typeBreak={
          item.date.length > 1 && item.morning === 0
            ? 'Nhiều ngày'
            : item.date.length === 1 && item.morning === 0
              ? 'Một ngày'
              : item.date.length === 1 && item.morning === 1
                ? 'Buổi sáng'
                : item.date.length === 1 && item.morning === 2
                  ? 'Buổi chiều'
                  : 'Đơn thiếu '
        }
      />
    );
  };
  console.log(filter.name);
  return (
    <>
      <HeaderCustom
        header={false}
        onChangeStatus={onChangeStatus}
        onChangeDate={onChangeDate}
        onChangeName={onChangeName}
        type={type}
        dateN={moment(filter.date,'DD/MM/YYYY')._d}
        CONFIRM_DENY_TAKE_LEAVE
        search
        txtSearch={filter.name}
      />
      <View style={{ flex: 1 }}>
        {data.length === 0 && (
          <Text style={styles.noData}>Không có lịch sử.</Text>
        )}
        <FlatList
          // saga
          // data={historyAdminTakeLeave}
          onMomentumScrollBegin={() => setOnScroll(true)}
          onEndReached={!loading && onScroll ? handleLoadMore : null}
          onEndReachedThreshold={0.5}
          ListFooterComponent={renderFooterComponent}
          data={data}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItem}
          refreshControl={
            <RefreshControl refreshing={refresh} onRefresh={onRefresh} />
          }
        />
      </View>
    </>
  );
};

export default ApproveBreak;

const styles = StyleSheet.create({
  loader: {
    marginTop: 10,
    alignItems: 'center',
  },
  noData: { fontSize: 16, alignSelf: 'center', marginTop: 24 },
});
