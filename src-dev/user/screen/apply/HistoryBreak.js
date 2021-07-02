import React, { useState, useEffect } from 'react';
import { useIsFocused } from '@react-navigation/native';

import {
  Platform,
  StatusBar,
  StyleSheet,
  View,
  ActivityIndicator,
  Text,
  RefreshControl,
  TouchableOpacity,
  UIManager,
  AppState,
} from 'react-native';
import moment from 'moment';
import { SwipeListView } from 'react-native-swipe-list-view';
import Icon from 'react-native-vector-icons/Feather';
import { Colors, imgs } from '../../../../utlis';
import {
  BarStatus,
  EmptyState,
  Indicator,
} from '../../../component';
import HeaderCustom from './component/HeaderCustom';
import langs from '../../../../common/language';
import CardBreak from './component/CardBreak';
import ActionButton from './component/ActionButton';
import { _GET, _POST } from '../../../../utlis/connection/api';
import { URL } from '../../../../utlis/connection/url';
import { _global } from '../../../../utlis/global/global';

if (
  Platform.OS === 'android'
  && UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}
const HistoryBreak = (props) => {
  const {
    navigation,
    token,
  } = props;
  // console.log('>>>>', initialData);
  const [status, setStatus] = useState(0);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const [type, setType] = useState('Tất cả');
  const [refresh, setRefresh] = useState(false);
  const [onScroll, setOnScroll] = useState(false);
  const [localDate, setLocalDate] = useState(null);
  const isFocused = useIsFocused();

  useEffect(() => {
    // getData(1, '', '', []);
    AppState.addEventListener('change', _handleAppStateChange);

    if (isFocused) {
      setLoading(true);
      setType('Tất cả');
      setStatus(0);
      setLocalDate(null);
      getData(1, null, 0, []);
    }
    return () => {
      AppState.removeEventListener('change', _handleAppStateChange);
    };
  }, [isFocused]);
  const _handleAppStateChange = (nextAppState) => {
    if (nextAppState === 'active') {
      getData(1, null, 0, []);
      console.log('call api for history break');
    }
  };
  const getData = async (pageNumber, dateN, statusN, dataN) => {
    // console.log('statusNstatusNstatusN', statusN);
    const _date = dateN || '';
    const _status = statusN || 0;
    const _dataN = dataN || [];
    const apiURL = `${URL.GET_LIST_TAKE_LEAVE}?page=${pageNumber}&page_size=20&status=${_status}&date=${_date}`;
    const response = await _GET(apiURL, token, false);
    console.log('_GET_LIST_TAKE_LEAVE ===========>', response);
    setRefresh(false);
    setOnScroll(false);
    setLoading(false);
    if (
      response.success
      && response.statusCode === 200
      && response.data
      && response.data.length > 0
    ) {
      setData(_dataN.concat(response.data));
      setPage(pageNumber);
    }
  };
  const handleLoadMore = () => {
    getData(page + 1, localDate, status, data);
    setOnScroll(false);
    setLoading(true);
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
      default: 0;
    }
  };
  const renderFooterComponent = () => {
    console.log('loading', loading);
    return loading ? <Indicator /> : null;
  };

  const onRefresh = () => {
    setRefresh(true);
    setOnScroll(false);
    getData(1, localDate, status, []);
  };

  const goBack = () => {
    navigation.goBack();
  };

  const onChangeStatus = (item) => {
    setLoading(true);
    setStatus(item);
    setData([]);
    setPage(1);
    getData(1, localDate, item, []);
    onSetType(item);
  };

  const onChangeDate = (date) => {
    setLoading(true);
    setData([]);
    setPage(1);
    getData(
      1,
      !date ? '' : moment(date).format('DD/MM/YYYY'),
      status,
      [],
    );
    setLocalDate(!date ? '' : moment(date).format('DD/MM/YYYY'));
  };

  const renderItem = ({ item, index }) => {
    const _listDate = item.date.map((i) => moment(i, 'DD/MM/YYYY').format(' DD/MM/YYYY'),);
    return (
      <CardBreak
        status={item.status}
        type={item.type}
        date={_listDate}
        reason={item.content}
        typeBreak={
          item.date.length > 1 && item.morning === 0
            ? 'Nhiều ngày'
            : item.date.length === 1 && item.morning === 0
              ? 'Một ngày'
              : item.date.length === 1 && item.morning === 1
                ? 'Buổi sáng'
                : item.date.length === 1 && item.morning === 2
                  ? 'Buổi chiều'
                  : item.date.length === 1
                    ? 'Một ngày'
                    : 'Nhiều ngày'
        }
      />
    );
  };
  const closeRow = (rowMap, rowKey) => {
    if (rowMap[rowKey]) {
      rowMap[rowKey].closeRow();
    }
  };
  const deleteRow = (rowMap, rowKey) => {
    // console.log(rowMap, rowKey);
    closeRow(rowMap, rowKey);
    const newData = [...data];
    const prevIndex = _data.findIndex((item) => item.key === rowKey);
    newData.splice(prevIndex, 1);
    setData(newData);
  };
  const onUpdateBreak = (data2, rowMap) => {
    closeRow(rowMap, data2.item.key);
    // console.log(data2);
    navigation.navigate(langs.navigator.updateBreak, {
      _id: data2.item._id,
      _date: data2.item.date,
      content: data2.item.content,
      morning: data2.item.morning,
      type: data2.item.type,

    });
  };
  const onDeleteBreak = async (rowMap, data2) => {
    const apiURL = `${URL.DELETE_TAKE_LEAVE}`;
    const body = {
      _id: data2.item._id,
      token
    };
    const response = await _POST(apiURL, body, token);
    if (response.success && response.statusCode === 200 && response.data) {
      _global.Alert.alert({
        title: langs.alert.notify,
        message: langs.alert.successDeleteApplication,
        leftButton: {
          text: langs.alert.ok,
          onPress: () => deleteRow(rowMap, data2.item.key),
        },
      });
      _global.Loading.hide();
    } else {
      _global.Alert.alert({
        title: langs.alert.notify,
        message: response.message,
        // messageColor: Colors.danger,
        leftButton: {
          text: langs.alert.ok,
          onPress: () => closeRow(rowMap, data2.item.key),
        },
      });
      _global.Loading.hide();
    }
  };
  // const onSwipeGestureBegan = (rowKey) => {
  //   console.log('This row opened', rowKey);
  //   setRow(rowKey);
  // };
  const onApplyBreak = () => {
    navigation.navigate(langs.navigator.applyBreak);
  };

  const renderHiddenItem = (data2, rowMap) => {
    let flag;
    data2.item.status === 1 ? flag = true : false;
    return flag ? (
      <View style={styles.rowBack}>
        <TouchableOpacity
          style={styles.backRightBtn}
          onPress={() => {
            data2.item.status === 1 ? onUpdateBreak(data2, rowMap) : null;
          }}
        >
          <View style={[styles.backBtn, { backgroundColor: 'white' }]}>
            <Icon name="edit-3" size={24} color={Colors.black} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.backRightBtn}
          onPress={() => {
            _global.Alert.alert({
              title: langs.alert.notice,
              message: langs.alert.deleteApplication,
              leftButton: {
                text: langs.alert.cancel,
                onPress: () => closeRow(rowMap, data2.item.key),
              },
              rightButton: {
                text: langs.alert.accept,
                onPress: () => onDeleteBreak(rowMap, data2),
                textStyle: {
                  fontWeight: '600',
                  fontFamily: 'Quicksand-Bold',
                },
              },
            });
          }}
        >
          <View style={[styles.backBtn, { backgroundColor: 'white' }]}>
            <Icon name="trash" size={24} color={Colors.danger} />
          </View>
        </TouchableOpacity>
      </View>
    ) : (
      <View
        style={{
          alignItems: 'flex-end',
          flex: 1,
          justifyContent: 'center',
        }}
      >
        <View style={[{ flexDirection: 'row', paddingRight: 32 }]}>
          <View style={styles.backRightBtn}>
            <View
              style={[
                styles.backBtn,
                { backgroundColor: Colors.backgroundInActive },
              ]}
            >
              <Icon name="edit-3" size={24} color={Colors.itemInActive} />
            </View>
          </View>
          <View style={styles.backRightBtn}>
            <View
              style={[
                styles.backBtn,
                { backgroundColor: Colors.backgroundInActive },
              ]}
            >
              <Icon name="trash" size={24} color={Colors.itemInActive} />
            </View>
          </View>
        </View>
        <Text style={styles.textDescrip}>
          Không thay đổi được
          {' '}
          {'\n'}
          {' '}
          đơn đã duyệt
        </Text>
      </View>
    );
  };
  // const onRowDidOpen = (rowKey, rowMap) => {
  //   console.log('This row opened', rowKey);
  //   console.log('This row opened', rowMap);
  // };
  const renderEmpty = () => {
    return <EmptyState source={imgs.notFound} title="Không có lịch sử." />;
  };
  const empty = data && data.length === 0 && !loading;
  const _data = [];
  console.log('data check 2',data);

  data && data.map((v, i) => { _data[i] = { ...v, key: i }; });
  console.log('data check',_data);
  return (
    <>
      <HeaderCustom
        height={44}
        title={langs.titleHistoryBreak}
        goBack={goBack}
        fontSize={24}
        onChangeStatus={onChangeStatus}
        onChangeDate={onChangeDate}
        type={type}
        backgroundColor={Colors.white}
        dateN={moment(localDate, 'DD/MM/YYYY')._d}
      />
      <View style={styles.backGround}>
        <SwipeListView
          data={empty ? [1] : _data}
          keyExtractor={(item, index) => String(index)}
          showsVerticalScrollIndicator={false}
          renderItem={empty ? renderEmpty : renderItem}
          onMomentumScrollBegin={() => setOnScroll(true)}
          onEndReached={!loading && onScroll ? handleLoadMore : null}
          onEndReachedThreshold={0.5}
          ListFooterComponent={renderFooterComponent}
          refreshControl={
            <RefreshControl refreshing={refresh} onRefresh={onRefresh} />
          }
          renderHiddenItem={empty ? null : renderHiddenItem}
          leftOpenValue={75}
          rightOpenValue={-150}
          disableRightSwipe
          swipeToOpenPercent={20}
          // previewRowKey="0"
          // previewOpenValue={-40}
          // previewOpenDelay={1000}
          // onRowOpen={onRowDidOpen}
          // swipeGestureBegan={onSwipeGestureBegan}
        />
      </View>
      <ActionButton onApply={onApplyBreak} />
    </>
  );
};

export default HistoryBreak;

const styles = StyleSheet.create({
  noData: { fontSize: 16, alignSelf: 'center', marginTop: 24 },
  backTextWhite: {
    color: '#FFF',
  },

  rowBack: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingRight: 32,
  },
  backRightBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 80,
    marginLeft: 8,
  },
  backBtn: {
    height: 48,
    width: 48,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 1,
    borderRadius: 24,
  },
  textDescrip: {
    fontSize: 10,
    textAlign: 'center',
    paddingRight: 32,
    color: Colors.itemInActive,
  },
  backGround: { flex: 1, backgroundColor: '#f0f0f0' },
  loader: { marginTop: 8 },
  imgClear: { alignSelf: 'center', width: 8, height: 8, tintColor: 'white' },
});
