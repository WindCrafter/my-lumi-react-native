import React, {useState, useEffect} from 'react';
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
import Icon from 'react-native-vector-icons/Feather';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import {Card} from 'native-base';
import moment from 'moment';
import {Colors, imgs} from '../../../../utlis';
import {BarStatus} from '../../../component';
import langs from '../../../../common/language';
import CardBreakLeader from './component/CardBreakLeader';
import HeaderCustom from './component/HeaderCustom';
import {_GET, _POST} from '../../../../utlis/connection/api';
import {_global} from '../../../../utlis/global/global';
import {URL} from '../../../../utlis/connection/url';
import CardBreak from './component/CardBreak';

const ApproveBreak = (props) => {
  const {
    navigation,
    listAdminTakeLeave,
    token,
    historyAdminTakeLeave,
    confirmDenyTakeLeave,
  } = props;
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState({date: '', status: 1, name: ''});
  const [type, setType] = useState('Đang chờ');
  const [date, setDate] = useState('');

  useEffect(() => {
    getData(1, filter.date, filter.status, [], filter.name);
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
    }
  };
  const goBack = () => {
    navigation.goBack();
  };

  // saga
  // const getData = () => {
  //   const dataLeave = {
  //     status: 0,
  //     page: page,
  //     token: token,
  //   };
  //   listAdminTakeLeave(dataLeave);
  // };
  const [refresh, setRefresh] = useState(false);

  const getData = async (pageNumber, dateN, statusN, dataN, nameN) => {
    const _date = dateN || '';
    const _status = statusN || 0;
    const _data = dataN || [];
    const _name = nameN || '';
    const apiURL = `${URL.LOCAL_HOST}${URL.GET_LIST_ADMIN_TAKE_LEAVE}?page=${pageNumber}&page_size=20&status=${_status}&date=${_date}`;
    const response = await _GET(apiURL, token, false);
    console.log('_GET_LIST_TAKELEAVE_MANAGER ===========>', response);
    setRefresh(false);
    if (
      response.success &&
      response.statusCode === 200 &&
      response.data &&
      response.data.length > 0
    ) {
      setData(_data.concat(response.data));
      setPage(pageNumber);
      setLoading(false);
      _global.Loading.hide();
    } else {
      setLoading(false);
      _global.Loading.hide();
    }
  };
  const handleLoadMore = () => {
    setLoading(true);
    getData(page + 1, filter.date, filter.status, data, filter.name);
  };
  // saga
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
  //     date: date ? moment(pickDate).format('DD/MM/YYYY') : null,
  //   };
  //   listAdminTakeLeave(dataLeave);
  // };
  const onChangeDate = (date) => {
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
  const onChangeName = (item) => {
    setFilter({...filter, name: item});
    setData([]);
    setPage(1);
    getData(1, filter.date, filter.status, [], item);
  };
  // saga
  // const onChangeStatus = (item) => {
  //   setFilter({...filter, status: item});
  //   setData([]);
  //   setPage(1);
  //   const dataLeave = {
  //     status: item,
  //     page: page,
  //     token: token,
  //   };
  //   listAdminTakeLeave(dataLeave);
  //   onSetType(item);
  // };
  const onChangeStatus = (item) => {
    setFilter({...filter, status: item});
    setData([]);
    setPage(1);
    getData(1, filter.date, item, [], filter.name);
    onSetType(item);
  };

  const renderFooterComponent = () => {
    return loading ? (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#ABB0BB" />
      </View>
    ) : null;
  };

  const onConfirm = async (item) => {
    const apiURL = `${URL.LOCAL_HOST}${URL.CONFIRM_DENY_TAKE_LEAVE}`;
    const body = {
      _id: item,
      status: 2,
    };
    const response = await _POST(apiURL, body, token);
    console.log('_APPROVE_BREAK =============>', response);
    if (response.success && response.statusCode === 200 && response.data) {
      if (filter.status === '0' || filter.status === 0) {
        setData(
          data.map((i) =>
            i._id === response.data._id
              ? {...i, status: response.data.status}
              : i,
          ),
        );
      } else {
        setData(data.filter((i) => i._id !== response.data._id));
      }
      _global.Loading.hide();
    } else {
      _global.Alert.alert({
        title: langs.alert.notify,
        message: langs.alert.approveFail,
        // messageColor: Colors.danger,
        leftButton: {text: langs.alert.ok},
      });
      _global.Loading.hide();
    }
  };
  const onRefresh = () => {
    setRefresh(true);
    getData(1, filter.date, filter.status, [], filter.name);
  };

  const onDeny = async (item) => {
    const apiURL = `${URL.LOCAL_HOST}${URL.CONFIRM_DENY_TAKE_LEAVE}`;
    const body = {
      _id: item,
      status: 3,
    };
    const response = await _POST(apiURL, body, token);
    console.log('_DENY =============>', response);
    if (response.success && response.statusCode === 200 && response.data) {
      if (filter.status === '0' || filter.status === 0) {
        setData(
          data.map((i) =>
            i._id === response.data._id
              ? {...i, status: response.data.status}
              : i,
          ),
        );
      } else {
        setData(data.filter((i) => i._id !== response.data._id));
      }
      _global.Loading.hide();
    } else {
      _global.Alert.alert({
        title: langs.alert.notify,
        message: langs.alert.approveFail,
        // messageColor: Colors.danger,
        leftButton: {text: langs.alert.ok},
      });
      _global.Loading.hide();
    }
  };

  const renderItem = ({item, index}) => {
    const _listDate = item.date.map((i) =>
      moment(i, 'DD/MM/YYYY').format('DD/MM/YYYY'),
    );
    return (
      <CardBreakLeader
        name={item.fullname}
        status={item.status}
        type={item.type}
        date={_listDate}
        reason={item.content}
        onDeny={() => onDeny(item._id)}
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
        title={langs.titleApproveBreak}
        height={40}
        goBack={goBack}
        fontSize={24}
        onChangeStatus={onChangeStatus}
        onChangeDate={onChangeDate}
        onChangeName={onChangeName}
        type={type}
        CONFIRM_DENY_TAKE_LEAVE
        search
      />
      <View style={{flex: 1}}>
        {data.length === 0 && (
          <Text style={styles.noData}>Không có lịch sử.</Text>
        )}
        <FlatList
          // saga
          // data={historyAdminTakeLeave}

          onEndReached={!loading ? handleLoadMore : null}
          onEndReachedThreshold={0.5}
          ListFooterComponent={renderFooterComponent}
          data={data}
          keyExtractor={(item, index) => index.toString()}
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
  loader: {
    marginTop: 10,
    alignItems: 'center',
  },
  noData: {fontSize: 16, alignSelf: 'center', marginTop: 24},
});
