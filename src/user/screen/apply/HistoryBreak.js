import React, {useState, useEffect} from 'react';
import {
  Image,
  Platform,
  StatusBar,
  StyleSheet,
  View,
  ActivityIndicator,
  Text,
} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {Colors, imgs} from '../../../../utlis';
import {BarStatus} from '../../../component';
import langs from '../../../../common/language';
import CardBreak from './component/CardBreak';
import ActionButton from './component/ActionButton';
import HeaderCustom from './component/HeaderCustom';
import {_GET} from '../../../../utlis/connection/api';
import moment from 'moment';
import {URL} from '../../../../utlis/connection/url';

const HistoryBreak = (props) => {
  const {navigation, token, listTakeLeave, historyTakeLeave} = props;
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState({});
  const [type, setType] = useState('Tất cả');
  const [date, setDate] = useState('');
  const [status, setStatus] = useState(0);
  useEffect(() => {
    // getData(1, '', '', []);
    const unsubscribe = navigation.addListener('focus', () => {
      getData(1, '', '', []);
    });
    return () => {
      unsubscribe;
    };
  }, [navigation]);
  //saga
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
    console.log('date', dateN, 'status', statusN);
    const _date = dateN || '';
    const _status = statusN || 0;
    const _dataN = dataN || [];
    const apiURL = `${URL.LOCAL_HOST}${URL.GET_LIST_TAKE_LEAVE}?page=${pageNumber}&page_size=20&status=${_status}&date=${_date}`;
    console.log(apiURL);
    const response = await _GET(apiURL, token);
    console.log('_GET_LIST_TAKE_LEAVE ===========>', response);
    if (
      response.success &&
      response.statusCode === 200 &&
      response.data &&
      response.data.length > 0
    ) {
      setData(_dataN.concat(response.data));
      setPage(pageNumber);
      setLoading(false);
    } else {
      setLoading(false);
    }
  };
  const handleLoadMore = () => {
    getData(page + 1, date, status, data);
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
  //SAGA
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
  //SAGA
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
    console.log(moment(date).format('DD/MM/YYYY'));
    setDate(!date ? '' : moment(date).format('DD/MM/YYYY'));
    setData([]);
    setPage(1);
    getData(1, !date ? '' : moment(date).format('DD/MM/YYYY'), status, []);
  };
  const renderItem = ({item, index}) => {
    const _listDate = item.date.map((i) =>
      moment(i, 'DD/MM/YYYY').format(' DD/MM/YYYY'),
    );
    return (
      <CardBreak
        leader={false}
        status={item.status}
        type={item.type}
        date={_listDate.toString().trim()}
        reason={item.content}
        typeBreak={
          (item.date.length > 1 && item.morning) === 0
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
      <View style={{flex: 1}}>
        {data.length === 0 ? (
          <Text style={styles.noData}>Không có lịch sử.</Text>
        ) : (
          <FlatList
            data={data}
              keyExtractor={(item, index) => index.toString()}
            renderItem={renderItem}
            onEndReached={!loading ? handleLoadMore : null}
            onEndReachedThreshold={0.5}
            ListFooterComponent={renderFooterComponent}
          />
        )}
      </View>
      <ActionButton onApply={onApplyBreak} onApprove={onApproveBreak} />
    </>
  );
};

export default HistoryBreak;

const styles = StyleSheet.create({
  noData: {fontSize: 16, alignSelf: 'center', marginTop: 24},
});
