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
import _ from 'lodash';
import Icon from 'react-native-vector-icons/Feather';
import { widthPercentageToDP } from 'react-native-responsive-screen';
import { Card } from 'native-base';
import moment from 'moment';
import { Colors, imgs } from '../../../../utlis';
import { BarStatus, EmptyState, Indicator } from '../../../component';
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
  const [type, setType] = useState(initialType || 'Đang chờ');
  const [refresh, setRefresh] = useState(false);
  const [onScroll, setOnScroll] = useState(false);

  useEffect(() => {
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
        console.log(':::Wrong type :', item);
    }
  };

  const getData = async (pageNumber, dateN, statusN, dataN, nameN) => {
    const _date = dateN || '';
    const _status = statusN || 0;
    const _data = dataN || [];
    const _name = nameN || '';
    const apiURL = `${URL_STAGING.LOCAL_HOST}${URL_STAGING.GET_LIST_ADMIN_TAKE_LEAVE}?page=${pageNumber}&page_size=20&status=${_status}&date=${_date}&name=${_name}`;
    const response = await _GET(apiURL, token, false);
    console.log('_GET_LIST_TAKE_LEAVE_MANAGER ===========>', response);
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
    setDateAdBreak(!date ? '' : moment(date).format('DD/MM/YYYY'));
  };
  const debouceSearch = _.debounce((value) => {
    onChangeName(value);
  }, 500);
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
    setStatusAdBreak(item);
  };

  const renderFooterComponent = () => {
    return loading ? (

      <Indicator />

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
                  : 'Không nhận được thời gian'
        }
      />
    );
  };

  return (
    <>
      <HeaderCustom
        header={false}
        onChangeStatus={onChangeStatus}
        onChangeDate={onChangeDate}
        onChangeName={debouceSearch}
        type={type}
        dateN={filter.date ? moment(filter.date, 'DD/MM/YYYY')._d : null}
        search
        txtSearch={filter.name}
        containerStyle={{ marginTop: -90 }}
      />
      <View style={styles.detail}>
        {data && data.length === 0 && !loading && (
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
};

export default ApproveBreak;

const styles = StyleSheet.create({
  detail: { flex: 1, backgroundColor: '#f0f0f0' },
});
