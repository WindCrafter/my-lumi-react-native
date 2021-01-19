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
import _ from 'lodash';
import moment from 'moment';
import langs from '../../../../common/language';
import { BarStatus, Indicator, EmptyState } from '../../../component';
import { Colors, imgs } from '../../../../utlis';
import ItemOT from './component/ItemApproveOT';
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
function ApproveOT(props) {
  const {
    navigation,
    token,
    setStatusAdOT,
    status_ad_ot,
    date_ad_ot,
    setDateAdOT,
  } = props;
  let initialType;
  switch (status_ad_ot) {
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
  const [filter, setFilter] = useState({ date: date_ad_ot,
    status: status_ad_ot,
    name: '' });
  const [type, setType] = useState(initialType || 'Đang chờ');
  const [refresh, setRefresh] = useState(false);
  const [onScroll, setOnScroll] = useState(false);

  useEffect(() => {
    getData(1, date_ad_ot, status_ad_ot, [], filter.name);
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
      default:
        console.log(':::Wrong type :', item);
    }
  };
  const getData = async (pageNumber, dateN, statusN, dataN, nameN) => {
    const _date = dateN || '';
    const _status = statusN || 0;
    const _data = dataN || [];
    const _name = nameN || '';
    const apiURL = `${URL_STAGING.LOCAL_HOST}${URL_STAGING.GET_LIST_OVERTIME_MANAGER}?page=${pageNumber}&page_size=20&status=${_status}&date=${_date}&name=${_name}`;
    const response = await _GET(apiURL, token, false);
    setRefresh(false);
    setLoading(false);
    setOnScroll(false);
    console.log('_GET_LIST_OVERTIME_MANAGER ===========>', response);
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
    setDateAdOT(!date ? '' : moment(date).format('DD/MM/YYYY'));
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
    setStatusAdOT(item);
  };
  const renderFooterComponent = () => {
    return loading ? <Indicator /> : null;
  };

  const onConfirm = async (item) => {
    const apiURL = `${URL_STAGING.LOCAL_HOST}${URL_STAGING.APPROVE_OVERTIME}`;
    const body = {
      id: item.id,
      status: 2,
    };
    const response = await _POST(apiURL, body, token);
    console.log('_APPROVE_OT =============>', response);
    _global.Loading.hide();
    if (response.success && response.statusCode === 200 && response.data) {
      if (filter.status === '0' || filter.status === 0) {
        setData(data.map((i) => (i.id === item.id ? { ...item, status: 2 } : i)));
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
    const apiURL = `${URL_STAGING.LOCAL_HOST}${URL_STAGING.APPROVE_OVERTIME}`;
    const body = {
      id: item.id,
      status: 3,
    };
    const response = await _POST(apiURL, body, token);
    console.log('_APPROVE_OT =============>', response);
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
  const renderItem = ({ item }) => {
    return <ItemOT item={item} onConfirm={onConfirm} onDeny={onDeny} />;
  };

  const onRefresh = () => {
    setRefresh(true);
    setOnScroll(false);
    getData(1, filter.date, filter.status, [], filter.name);
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
      />
      <View style={styles.detail}>
        {data
          && data.length === 0
          && !loading
          && ((filter.status == 1 && filter.date === '')
          || filter.date === moment(new Date()).format('DD/MM/YYYY') ? (
            <EmptyState
              source={imgs.taskComplete}
              title="Chưa có đơn cần duyệt"
              description="Gặp lại bạn sau nhé."
            />
            ) : (
              <EmptyState
                source={imgs.noHistory}
                title="Không tìm thấy lịch sử"
              />
            ))}
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

export default ApproveOT;

const styles = StyleSheet.create({
  detail: {
    flex: 1,
    marginVertical: 16,
  },
  noData: {
    fontSize: 16,
    alignSelf: 'center',
    marginTop: 24,
  },
});
