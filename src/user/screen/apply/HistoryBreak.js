import React, {useState, useEffect} from 'react';
import {
  Image,
  Platform,
  StatusBar,
  StyleSheet,
  View,
  ActivityIndicator,
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

const HistoryBreak = (props) => {
  const {navigation, token, listTakeLeave, historyTakeLeave} = props;
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState({});
  const [type, setType] = useState('Tất cả');
  const [status, setStatus] = useState(0);
  useEffect(() => {
    getData();
  }, [page]);
  const getData = () => {
    // const status = filter.status || '';
    // const date = filter.date || '';
    // const apiURL = `${URL.LOCAL_HOST}${URL.GET_LIST_OVERTIME}?page=${page}&?status=${status}&?date=${date}`;
    // const apiURL = `https://api.lumier.lumi.com.vn/take-leave/self-list?status=0&page_size=2&page=${page}`;
    // await _GET(apiURL, token).then((response) => console.log(response));

    const dataLeave = {
      status: 0,
      page: page,
      token: token,
    };
    console.log(dataLeave);
    listTakeLeave(dataLeave);
  };
  const handleLoadMore = () => {
    // setPage(page + 1);
    setLoading(false);
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
    const dataLeave = {
      status: item,
      page: page,
      token: token,
    };
    onSetStatus(item);
    console.log('checkkkkkkk', item);
    setFilter({...filter, status: item});
    console.log('checkkkkkkk2', status);
    setData([]);
    console.log(dataLeave);
    listTakeLeave(dataLeave);
    onSetType(item);
  };
  const onChangeDate = (date) => {
    const pickDate = moment(date, 'DD/MM/YYYY').toDate();
    console.log(moment(pickDate).format('DD/MM/YYYY'));
    setFilter({...filter, date: moment(pickDate).format('DD/MM/YYYY')});
    setData([]);
    setPage(1);
    const dataLeave = {
      status: 0,
      page: page,
      token: token,
      date: date ?  moment(pickDate).format('DD/MM/YYYY') : null,
    };
    listTakeLeave(dataLeave);
  };
  const renderItem = ({item, index}) => {
    const _listDate = item.date.map((i) =>
      moment(i, 'DD/MM/YYYY').format('DD/MM'),
    );
    return (
      <CardBreak
        leader={false}
        status={item.status}
        type={item.type}
        date={_listDate.toString()}
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
        <FlatList
          data={historyTakeLeave}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          onEndReached={!loading ? handleLoadMore : null}
          onEndReachedThreshold={0.5}
          ListFooterComponent={renderFooterComponent}
        />
      </View>
      <ActionButton onApply={onApplyBreak} onApprove={onApproveBreak} />
    </>
  );
};

export default HistoryBreak;

const styles = StyleSheet.create({});
