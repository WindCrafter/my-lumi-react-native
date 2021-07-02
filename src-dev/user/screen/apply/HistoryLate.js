import React, { useState, useEffect, useRef } from 'react';
import { useIsFocused } from '@react-navigation/native';

import {
  StyleSheet,
  View,
  ActivityIndicator,
  Text,
  RefreshControl,
  TouchableOpacity,
  ScrollView, AppState
} from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import moment from 'moment';
import { SwipeListView } from 'react-native-swipe-list-view';
import Icon from 'react-native-vector-icons/Feather';
import { Colors, Fonts, imgs } from '../../../../utlis';
import langs from '../../../../common/language';
import CardLate from './component/CardLate';
import { _global } from '../../../../utlis/global/global';
import { _GET, _POST } from '../../../../utlis/connection/api';
import { URL } from '../../../../utlis/connection/url';
import {
  BarStatus,
  EmptyState,
  Indicator,
} from '../../../component';
import HeaderCustom from './component/HeaderCustom';
import ActionButton from './component/ActionButton';

const HistoryLate = (props) => {
  const {
    navigation,
    token,
  } = props;
  const [status, setStatus] = useState(0);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const [type, setType] = useState('Tất cả');
  const [refresh, setRefresh] = useState(false);
  const [onScroll, setOnScroll] = useState(false);
  const [edit, setEdit] = useState(false);
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
    } return () => {
      AppState.removeEventListener('change', _handleAppStateChange);
    };
  }, [isFocused]);
  const _handleAppStateChange = (nextAppState) => {
    if (nextAppState === 'active') {
      getData(1, null, 0, []);
      console.log('call api for history late');
    }
  };
  const step = useRef();
  const goBack = () => {
    // navigation.reset({
    //   index: 0,
    //   routes: [{ name: langs.navigator.applyLate }],
    // });
    navigation.goBack();
  };

  const getData = async (pageNumber, dateN, statusN, dataN) => {
    const _date = dateN || '';
    const _status = statusN || 0;
    const _dataN = dataN || [];
    const apiURL = `${URL.LIST_LATE_EARLY}?page=${pageNumber}&page_size=20&status=${_status}&date=${_date}`;
    const response = await _GET(apiURL, token, false);
    console.log('_GET_LIST_LATE_EARLY ===========>', response);
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

  const renderItem = ({ item }) => {
    return (
      <CardLate
        leader={false}
        status={item.status}
        type={item.type}
        reason={item.content}
        day={item.date}
        time={item.time}
      />
    );
  };
  const onApplyLate = () => {
    navigation.navigate(langs.navigator.applyLate);
  };
  const onChangeDate = (date) => {
    setLoading(true);
    setData([]);
    setPage(1);
    getData(1, !date ? '' : moment(date).format('DD/MM/YYYY'), status, []);
    setLocalDate(!date ? '' : moment(date).format('DD/MM/YYYY'));
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
        0;
    }
  };

  const onChangeStatus = (item) => {
    setLoading(true);
    setStatus(item);
    setData([]);
    setPage(1);
    getData(1, localDate, item, []);
    onSetType(item);
  };

  const handleLoadMore = () => {
    getData(page + 1, localDate, status, data);
    setOnScroll(false);
    setLoading(true);
  };

  const onRefresh = () => {
    setRefresh(true);
    setOnScroll(false);
    getData(1, localDate, status, []);
  };

  const renderFooterComponent = () => {
    console.log('loading', loading);
    return loading ? <Indicator /> : null;
  };
  const closeRow = (rowMap, rowKey) => {
    // console.log(rowKey);
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
  const onUpdateLate = (data2, rowMap) => {
    // console.log(data2);
    closeRow(rowMap, data2.item.key);

    navigation.navigate(langs.navigator.updateLate, {
      id: data2.item.id,
      date: data2.item.date,
      typeRoute: data2.item.type,
      timeRoute: data2.item.time,
      content: data2.item.content,
      statusRoute: data2.item.status,

    });
  };
  const onDeleteLate = async (rowMap, data2) => {
    const apiURL = `${URL.DELETE_LATE_EARLY}`;
    const body = {
      id: data2.item.id,
      token,
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
  const renderHiddenItem = (data2, rowMap) => {
    let flag;
    data2.item.status === 1 ? (flag = true) : false;
    return flag ? (
      <View style={styles.rowBack}>
        <TouchableOpacity
          style={styles.backRightBtn}
          onPress={() => {
            data2.item.status === 1 ? onUpdateLate(data2, rowMap) : null;
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
                onPress: () => onDeleteLate(rowMap, data2),
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
        <Text
          style={styles.textDescrip}
        >
          Không thay đổi được
          {'\n'}
          đơn đã duyệt
        </Text>
      </View>
    );
  };
  const _data = [];
  data && (data.map((v, i) => {
    _data[i] = { ...v, key: i };
  }));
  // console.log(data);
  const handleScroll = (event) => {
    if (event.nativeEvent.contentOffset.x > 0) {
      setEdit(true);
    } else setEdit(false);
  };
  // console.log('datadatadatadata', data);
  // console.log('initialDatainitialData', initialData);
  // console.log('date_user_late', date_user_late);
  // console.log('localDate',localDate);
  const renderEmpty = () => {
    return <EmptyState source={imgs.notFound} title="Không có lịch sử." />;
  };
  const empty = data && data.length === 0 && !loading;
  return (
    <>
      <HeaderCustom
        height={44}
        title={langs.titleHistoryLate}
        goBack={goBack}
        fontSize={24}
        onChangeStatus={onChangeStatus}
        onChangeDate={onChangeDate}
        type={type}
        backgroundColor={Colors.white}
        dateN={moment(localDate, 'DD/MM/YYYY')._d}
      />
      <View style={{ width: wp(100), backgroundColor: '#F0F0F0' }}>
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
        />
      </View>
      <ActionButton onApply={onApplyLate} />
    </>
  );
};

export default HistoryLate;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  flatList: {
    // marginBottom: heightPercentageToDP(12),
    // flexGrow: 1,
  },
  noData: { fontSize: 16, alignSelf: 'center', marginTop: 24,
  // fontFamily: Fonts.font_family.italic
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
});
