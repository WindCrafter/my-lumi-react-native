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
  TouchableOpacity,
} from 'react-native';
import moment from 'moment';
import { SwipeListView } from 'react-native-swipe-list-view';
import Icon from 'react-native-vector-icons/Feather';
import langs from '../../../../common/language';
import { BarStatus } from '../../../component';
import { Colors } from '../../../../utlis';
import ItemOT from './component/ItemOT';
import ActionButton from './component/ActionButton';
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

// const item0 = {
//   status: 1,
//   date: '21/09/2020',
//   time: '0.5',
//   content: 'Sửa lỗi phát sinh trên UI',
// };
// const item1 = {
//   status: 2,
//   date: '21/09/2020',
//   time: '0.5',
//   content: 'Sửa lỗi phát sinh trên UI',
// };
// const item2 = {
//   status: 3,
//   date: '21/09/2020',
//   time: '0.5',
//   content: 'Sửa lỗi phát sinh trên UI',
// };

function ListOT(props) {
  const { navigation, token } = props;
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [type, setType] = useState('Tất cả');
  const [date, setDate] = useState('');
  const [status, setStatus] = useState(0);
  const [onScroll, setOnScroll] = useState(false);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    // getData(1, '', '', []);
    const unsubscribe = navigation.addListener('focus', () => {
      getData(1, date, status, []);
    });
    return () => {
      unsubscribe;
    };
  }, [navigation]);

  const goBack = () => {
    navigation.goBack();
  };

  const renderItem = ({ item }) => {
    return <ItemOT item={item} />;
  };

  const onPressCreate = () => {
    navigation.navigate(langs.navigator.applyOT);
  };

  const onPressConfirm = () => {
    navigation.navigate(langs.navigator.approveOT);
  };

  const getData = async (pageNumber, dateN, statusN, dataN) => {
    console.log('date', dateN, 'status', statusN);
    const _date = dateN || '';
    const _status = statusN || 0;
    const _dataN = dataN || [];
    const apiURL = `${URL_STAGING.LOCAL_HOST}${URL_STAGING.GET_LIST_OVERTIME}?page=${pageNumber}&page_size=20&status=${_status}&date=${_date}`;
    const response = await _GET(apiURL, token, false);
    setRefresh(false);
    setLoading(false);
    setOnScroll(false);
    console.log('_GET_LIST_OVERTIME ===========>', response);
    if (
      response.success
      && response.statusCode === 200
      && response.data
      && response.data.length > 0
    ) {
      setData(_dataN.concat(response.data));
      setPage(pageNumber);
    } else {
    }
  };

  const onRefresh = () => {
    setRefresh(true);
    setOnScroll(false);
    getData(1, date, status, []);
  };

  const handleLoadMore = () => {
    getData(page + 1, date, status, data);
    setOnScroll(false);
    setLoading(true);
  };

  const renderFooterComponent = () => {
    return loading ? (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color={Colors.gray} />
      </View>
    ) : null;
  };

  const onChangeDate = (date) => {
    setDate(!date ? '' : moment(date).format('DD/MM/YYYY'));
    setData([]);
    setPage(1);
    getData(1, !date ? '' : moment(date).format('DD/MM/YYYY'), status, []);
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
      default: 0;
    }
  };

  const onChangeStatus = (item) => {
    setStatus(item);
    setData([]);
    setPage(1);
    getData(1, date, item, []);
    onSetType(item);
  };
  const closeRow = (rowMap, rowKey) => {
    console.log(rowKey);
    if (rowMap[rowKey]) {
      rowMap[rowKey].closeRow();
    }
  };
  const deleteRow = (rowMap, rowKey) => {
    console.log(rowMap, rowKey);
    closeRow(rowMap, rowKey);
    const newData = [...data];
    const prevIndex = _data.findIndex((item) => item.key === rowKey);
    newData.splice(prevIndex, 1);
    setData(newData);
  };
  const onUpdateOT = (data2) => {
    console.log(data2);
    navigation.navigate(langs.navigator.updateOT, {
      id: data2.item.id,
      start_date: data2.item.start_date,
      start: data2.item.start,
      data: data2.item.data,
      content: data2.item.content,
      total_time: data2.item.total_time,
    });
  };
  const onDeleteOT = async (rowMap, data2) => {
    const apiURL = `${URL_STAGING.LOCAL_HOST}${URL_STAGING.DELETE_OT}`;
    const body = {
      _id: data2.item.id,
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
            data2.item.status === 1 ? onUpdateOT(data2) : null;
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
                onPress: () => onDeleteOT(rowMap, data2),
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

  const _data = [];
  data.map((v, i) => {
    _data[i] = { ...v, key: i };
  });
  console.log(_data);
  return (
    <>
      <BarStatus
        backgroundColor={Colors.white}
        height={Platform.OS === 'ios' ? 36 : StatusBar.currentHeight}
      />
      <HeaderCustom
        title={langs.titleListOT}
        height={60}
        goBack={goBack}
        fontSize={24}
        onChangeStatus={onChangeStatus}
        onChangeDate={onChangeDate}
        type={type}
      />
      <View style={styles.detail}>
        {_data.length === 0 && (
          <Text style={styles.noData}>Không có lịch sử</Text>
        )}
        <SwipeListView
          data={_data}
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
          renderHiddenItem={renderHiddenItem}
          leftOpenValue={75}
          rightOpenValue={-150}
          disableRightSwipe
          swipeToOpenPercent={20}
        />
      </View>
      <ActionButton onApply={onPressCreate} onApprove={onPressConfirm} />
    </>
  );
}

export default ListOT;

const styles = StyleSheet.create({
  detail: {
    flex: 1,
  },
  noData: {
    fontSize: 16,
    alignSelf: 'center',
    marginTop: 24,
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
    shadowRadius: 3.84,
    shadowOpacity: 0.25,

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
