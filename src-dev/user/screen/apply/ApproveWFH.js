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
  AppState,
} from 'react-native';
import moment from 'moment';
import _, { stubFalse } from 'lodash';
import langs from '../../../../common/language';
import { BarStatus, EmptyState, Indicator } from '../../../component';
import { Colors, imgs } from '../../../../utlis';
import CardWFH from './component/CardWFH';
import { URL } from '../../../../utlis/connection/url';
import HeaderCustom from './component/HeaderCustom';
import { _GET, _POST } from '../../../../utlis/connection/api';
import { _global } from '../../../../utlis/global/global';

if (
  Platform.OS === 'android'
  && UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}
function ApproveWFH(props) {
  const { navigation, token } = props;
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState({ date: '', status: 1, name: '' });
  const [type, setType] = useState('Đang chờ');
  const [refresh, setRefresh] = useState(false);
  const [onScroll, setOnScroll] = useState(false);

  useEffect(() => {
    AppState.addEventListener('change', _handleAppStateChange);

    getData(page, filter.date, filter.status, [], filter.name);
    return () => {
      AppState.removeEventListener('change', _handleAppStateChange);
    };
  }, []);
  const _handleAppStateChange = (nextAppState) => {
    if (nextAppState === 'active') {
      getData(page, filter.date, filter.status, [], filter.name);
      console.log('call api for approve check');
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
    }
  };
  const renderItem = ({ item, index }) => {
    return (
      <CardWFH
        item={item}
        leader
        onDeny={() => onDeny(item)}
        onAccept={() => onConfirm(item)}
      />
    );
  };
  const onConfirm = async (item) => {
    const apiURL = `${URL.APPROVE_WORK_FROM_HOME}`;
    const body = {
      _id: item._id,
      status: 2,
    };
    const response = await _POST(apiURL, body, token);
    setLoading(false);
    console.log('_APPROVE_WFH =============>', response);
    _global.Loading.hide();
    if (response.success && response.statusCode === 200) {
      if (filter.status === '0' || filter.status === 0) {
        setData(
          data.map((i) => (i._id === item._id ? { ...item, status: 2 } : i)),
        );
      } else {
        setData(data.filter((i) => i._id !== item._id));
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
    const apiURL = `${URL.APPROVE_WORK_FROM_HOME}`;
    const body = {
      _id: item._id,
      status: 3,
    };
    const response = await _POST(apiURL, body, token);
    console.log('_APPROVE_WFH =============>', response);
    setLoading(false);
    _global.Loading.hide();
    if (response.success && response.statusCode === 200 && response.data) {
      if (filter.status === '0' || filter.status === 0) {
        setData(data.map((i) => (i._id === item._id ? { ...item, status: 3 } : i)));
      } else {
        setData(data.filter((i) => i._id !== item._id));
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
    console.log('on Refresh');
    getData(1, filter.date, filter.status, [], filter.name);
  };

  const getData = async (pageNumber, dateN, statusN, dataN, nameN) => {
    console.log('dateNNNNN', dateN);
    const _date = dateN ? moment(dateN, 'DD/MM/YYYY').format('DD-MM-YYYY') : 0;
    const _status = statusN || 0;
    const _data = dataN || [];
    const _name = nameN || '';
    const apiURL = `${URL.GET_LIST_WORK_FROM_HOME_MANAGER}?page=${pageNumber}&page_size=20&status=${_status}&start_date=${_date}`;
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
        CONFIRM_DENY_TAKE_LEAVE
        search={false}
        txtSearch={filter.name}
        flatStatus={status}
      />
      <View style={styles.detail}>
        <FlatList
          // saga
          // data={historyAdminTakeLeave}
          onMomentumScrollBegin={() => setOnScroll(true)}
          onEndReached={!loading && onScroll ? handleLoadMore : null}
          onEndReachedThreshold={0.5}
          ListFooterComponent={renderFooterComponent}
          data={empty ? [1] : data}
          keyExtractor={(item, index) => String(index)}
          renderItem={empty ? renderEmpty : renderItem}
          refreshControl={
            <RefreshControl refreshing={refresh} onRefresh={onRefresh} />
          }
        />
      </View>
    </>
  );
}

export default ApproveWFH;

const styles = StyleSheet.create({
  detail: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
});
