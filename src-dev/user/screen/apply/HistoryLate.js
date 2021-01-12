import React, { useState, useEffect, useRef } from 'react';
import {
  Image,
  Platform,
  StatusBar,
  StyleSheet,
  View,
  FlatList,
  ActivityIndicator,
  LayoutAnimation,
  Dimensions,
  Text,
  RefreshControl,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { heightPercentageToDP, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import moment from 'moment';
import { SwipeListView } from 'react-native-swipe-list-view';
import Icon from 'react-native-vector-icons/Feather';
import { Colors, imgs } from '../../../../utlis';
import { BarStatus } from '../../../component';
import langs from '../../../../common/language';
import CardLate from './component/CardLate';
import ActionButton from './component/ActionButton';
import FilterTop from './component/FilterTop';
import UpdateLate2 from './updateLate2';
import { _global } from '../../../../utlis/global/global';
import { _GET, _POST } from '../../../../utlis/connection/api';
import { URL_STAGING } from '../../../../utlis/connection/url';

const HistoryLate = (props) => {
  const {
    navigation,
    listLateEarly,
    token,
    dataLateEarly,
    removeList,
    refreshing,
    status_user_late,
    setStatusUserLate,
    initialData,
    
  } = props;
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [data, setData] = useState(initialData);
  useEffect(() => {
    setData(initialData);
    setDate('');
    console.log('onmei');
  }, [initialData]);

  let initialType;
  switch (status_user_late) {
    case '0':
      initialType = ('Tất cả');
      break;
    case '1':
      initialType = ('Đang chờ');
      break;
    case '2':
      initialType = ('Đã duyệt');
      break;
    case '3':
      initialType = ('Bị từ chối');
      break;
    case '4':
      initialType = ('Auto Cancel');
      break;
    default:
      0;
  }
  const [type, setType] = useState(initialType || 'Tất cả');
  const [date, setDate] = useState('');
  const [refresh, setRefresh] = useState(false);
  const [onScroll, setOnScroll] = useState(false);
  const [edit, setEdit] = useState(false);
  const [route, setRoute] = useState([]);
  const deviceWidth = Dimensions.get('window').width;
  const step = useRef();
  const goBack = () => {
    navigation.goBack();
  };

  const getData = async (pageNumber, dateN, statusN, dataN) => {
    const _date = dateN || '';
    const _status = statusN || 0;
    const _dataN = dataN || [];
    const apiURL = `${URL_STAGING.LOCAL_HOST}${URL_STAGING.LIST_LATE_EARLY}?page=${pageNumber}&page_size=20&status=${_status}&date=${_date}`;
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
  const onApplyLate = () => {
    navigation.navigate(langs.navigator.applyLate);
  };

  const renderItem = ({ item, index }) => {
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

  const onPressCreate = () => {
    navigation.navigate(langs.navigator.approveLate);
  };

  const onChangeDate = (date) => {
    setDate(!date ? '' : moment(date).format('DD/MM/YYYY'));
    setData([]);
    setPage(1);
    getData(1, !date ? '' : moment(date).format('DD/MM/YYYY'), status_user_late, []);
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
  const onSetStatus = (onStatus) => {
    setStatusUserLate(onStatus);
  };
  const onChangeStatus = (item) => {
    setStatusUserLate(item);
    setData([]);
    setPage(1);
    getData(1, date, item, []);
    onSetType(item);
    onSetStatus(item);
  };

  const handleLoadMore = () => {
    getData(page + 1, date, status_user_late, data);
    setOnScroll(false);
    setLoading(true);
  };

  const onRefresh = () => {
    setRefresh(true);
    setOnScroll(false);
    getData(1, date, status_user_late, []);
  };

  const renderFooterComponent = () => {
    return loading ? (
      <View style={styles.loader}>
        <ActivityIndicator size="large" />
      </View>
    ) : null;
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
    const apiURL = `${URL_STAGING.LOCAL_HOST}${URL_STAGING.DELETE_LATE_EARLY}`;
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
          {' '}
          {'\n'}
          {' '}
          đơn đã duyệt
        </Text>
      </View>
    );
  };
  const _data = [];
  data && data.map((v, i) => {
    _data[i] = { ...v, key: i };
  });
  // console.log(data);
  console.log('statusstatusstatus', status_user_late);
  const handleScroll = (event) => {
    if (event.nativeEvent.contentOffset.x > 0) {
      setEdit(true);
    } else setEdit(false);
  };
  return (
    <>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
        scrollEnabled={edit}
        ref={step}
        onMomentumScrollEnd={handleScroll}
      >
        <View style={{ width: wp(100),backgroundColor:"#F0F0F0" }}>
          <FilterTop
            title={langs.titleHistoryBreak}
            goBack={goBack}
            fontSize={24}
            onChangeStatus={onChangeStatus}
            onChangeDate={onChangeDate}
            type={type}
            backgroundColor={Colors.white}
          />

          {Array.isArray(data) && data.length === 0 && (
          <Text style={styles.noData}>Không có lịch sử.</Text>
          )}

          <SwipeListView
            data={_data}
            keyExtractor={(item, index) => index.toString()}
            showsVerticalScrollIndicator={false}
            renderItem={renderItem}
            onMomentumScrollBegin={() => setOnScroll(true)}
            onEndReached={!loading && onScroll ? handleLoadMore : null}
            onEndReachedThreshold={0.5}
            ListFooterComponent={renderFooterComponent}
            refreshControl={
              <RefreshControl refreshing={refresh} onRefresh={onRefresh} />
            }
            renderHiddenItem={renderHiddenItem}
            leftOpenValue={75}
            rightOpenValue={-150}
            disableRightSwipe
            swipeToOpenPercent={20}
          />
        </View>
        <UpdateLate2 route={route} token={token} />
      </ScrollView>
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
  noData: { fontSize: 16, alignSelf: 'center', marginTop: 24 },
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
