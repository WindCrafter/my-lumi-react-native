import React, { useState, useEffect } from 'react';
import {
  Image,
  Platform,
  StatusBar,
  StyleSheet,
  View,
  ActivityIndicator,
  Text,
  RefreshControl,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import moment from 'moment';
import { SwipeListView } from 'react-native-swipe-list-view';
import { Colors, imgs } from '../../../../utlis';
import { BarStatus } from '../../../component';
import langs from '../../../../common/language';
import CardBreak from './component/CardBreak';
import ActionButton from './component/ActionButton';
import HeaderCustom from './component/HeaderCustom';
import { _GET } from '../../../../utlis/connection/api';
import { URL_STAGING } from '../../../../utlis/connection/url';

const HistoryBreak = (props) => {
  const {
    navigation,
    token,
    listTakeLeave,
    historyTakeLeave,
    deleteTakeLeave,
  } = props;
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState({});
  const [type, setType] = useState('Tất cả');
  const [date, setDate] = useState('');
  const [status, setStatus] = useState(0);
  const [refresh, setRefresh] = useState(false);
  const [onScroll, setOnScroll] = useState(false);

  useEffect(() => {
    // getData(1, '', '', []);
    const unsubscribe = navigation.addListener('focus', () => {
      getData(1, date, status, []);
    });
    return () => {
      unsubscribe;
    };
  }, [navigation]);
  // saga
  // const getData = () => {

  //   const dataLeave = {
  //     status: 0,
  //     page: page,
  //     token: token,
  //   };
  //   console.log(dataLeave);
  //   listTakeLeave(dataLeave);
  // };
  const getData = async (pageNumber, dateN, statusN, dataN) => {
    const _date = dateN || '';
    const _status = statusN || 0;
    const _dataN = dataN || [];
    const apiURL = `${URL_STAGING.LOCAL_HOST}${URL_STAGING.GET_LIST_TAKE_LEAVE}?page=${pageNumber}&page_size=20&status=${_status}&date=${_date}`;
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
    getData(page + 1, date, status, data);
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
    }
  };
  const renderFooterComponent = () => {
    return loading ? (
      <View style={styles.loader}>
        <ActivityIndicator size="large" />
      </View>
    ) : null;
  };

  const onRefresh = () => {
    setRefresh(true);
    setOnScroll(false);
    getData(1, date, status, []);
  };

  const goBack = () => {
    navigation.goBack();
  };

  const onApplyBreak = () => {
    navigation.navigate(langs.navigator.applyBreak);
  };

  const onApproveBreak = () => {
    navigation.navigate(langs.navigator.approveBreak);
  };

  const onSetStatus = (status) => {
    setStatus(status);
  };

  const onChangeStatus = (item) => {
    setStatus(item);
    setData([]);
    setPage(1);
    getData(1, date, item, []);
    onSetType(item);
    onSetStatus(item);
  };
  // SAGA
  // const onChangeStatus = (item) => {
  //   const dataLeave = {
  //     status: item,
  //     page: page,
  //     token: token,
  //   };
  //   onSetStatus(item);
  //   console.log('checkkkkkkk', item);
  //   setFilter({...filter, status: item});
  //   console.log('checkkkkkkk2', status);
  //   setData([]);
  //   console.log(dataLeave);
  //   listTakeLeave(dataLeave);
  //   onSetType(item);
  // };
  // SAGA
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
  //     date: date ?  moment(pickDate).format('DD/MM/YYYY') : null,
  //   };
  //   listTakeLeave(dataLeave);
  // };

  const onChangeDate = (date) => {
    setDate(!date ? '' : moment(date).format('DD/MM/YYYY'));
    setData([]);
    setPage(1);
    getData(1, !date ? '' : moment(date).format('DD/MM/YYYY'), status, []);
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
  const onUpdateBreak = (data2) => {
    console.log(data2);
    navigation.navigate(langs.navigator.updateBreak, {
      _id: data2.item._id,
      _date: data2.item.date,
      content: data2.item.content,
      morning: data2.item.morning,
      type: data2.item.type
    });
  };
  const onDeleteBreak = (rowMap, data2) => {
   const data = {
     _id:data2.item._id,
     token
   }
    deleteTakeLeave(data);
    deleteRow(rowMap, data2.item.key);
  };
  const renderHiddenItem = (data2, rowMap) => (
    <View style={styles.rowBack}>
      <TouchableOpacity
        style={[styles.backRightBtn, styles.backRightBtnLeft]}
        onPress={() => onUpdateBreak(data2)}
      >

        <Image source={imgs.note} />
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.backRightBtn, styles.backRightBtnRight]}
        onPress={() => onDeleteBreak(rowMap, data2)}
      >
        <Image source={imgs.cancel} />
      </TouchableOpacity>
    </View>
  );
  const onRowDidOpen = rowKey => {
    console.log('This row opened', rowKey);
  };

  const _data = [];
  data.map((v, i) => { _data[i] = { ...v, key: i }; });
  console.log(_data);
  return (
    <>
      <BarStatus
        backgroundColor={Colors.white}
        height={Platform.OS === 'ios' ? 46 : StatusBar.currentHeight}
      />
      <HeaderCustom
        title={langs.titleHistoryBreak}
        height={60}
        goBack={goBack}
        fontSize={24}
        onChangeStatus={onChangeStatus}
        onChangeDate={onChangeDate}
        type={type}
        backgroundColor={Colors.white}
      />
      <View style={{ flex: 1 }}>
        {_data.length === 0 && (
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
          previewRowKey="0"
          previewOpenValue={-40}
          previewOpenDelay={3000}
          disableRightSwipe
          swipeToOpenPercent={20}
          onRowDidOpen={onRowDidOpen}
        />
      </View>
      <ActionButton onApply={onApplyBreak} onApprove={onApproveBreak} />
    </>
  );
};

export default HistoryBreak;

const styles = StyleSheet.create({
  noData: { fontSize: 16, alignSelf: 'center', marginTop: 24 },
  backTextWhite: {
    color: '#FFF',
  },
  rowFront: {
    alignItems: 'center',
    backgroundColor: '#CCC',
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    justifyContent: 'center',
    height: 50,
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
    top: 25,
    width: 75,
  },
  backRightBtnLeft: {
    backgroundColor: 'white',

    height: 48,
    width: 48,
    borderRadius: 24,
    alignSelf: 'center',
  },
  backRightBtnRight: {
    backgroundColor: 'red',
    right: 0,
    height: 48,
    width: 48,
    borderRadius: 24,
    alignSelf: 'center',
  },
});
