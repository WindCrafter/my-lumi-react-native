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
} from 'react-native';
import {Colors, imgs} from '../../../../utlis';
import {BarStatus} from '../../../component';
import Icon from 'react-native-vector-icons/Feather';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import {Card} from 'native-base';
import langs from '../../../../common/language';
import CardBreak from './component/CardBreak';
import HeaderCustom from './component/HeaderCustom';
import moment from 'moment';
import {_GET, _POST} from '../../../../utlis/connection/api';
import {_global} from '../../../../utlis/global/global';
import {URL} from '../../../../utlis/connection/url';

const ApproveBreak = (props) => {
  const {
    navigation,
    listAdminTakeLeave,
    token,
    historyAdminTakeLeave,
    confirmDenyTakeLeave,
  } = props;
  const [page, setPage] = useState(3);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState({});
  const [type, setType] = useState('Tất cả');
  useEffect(() => {
    getData(1, '', '', [], '');
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

  //saga
  // const getData = () => {
  //   const dataLeave = {
  //     status: 0,
  //     page: page,
  //     token: token,
  //   };
  //   listAdminTakeLeave(dataLeave);
  // };
  const getData = async (pageNumber, dateN, statusN, dataN, nameN) => {
    const _date = dateN || '';
    const _status = statusN || 0;
    const _data = dataN || [];
    const _name = nameN || '';
    const apiURL = `${URL.LOCAL_HOST}${URL.GET_LIST_ADMIN_TAKE_LEAVE}?page=${pageNumber}&page_size=20&status=${_status}`;
    console.log(apiURL);
    const response = await _GET(apiURL, token);
    console.log('_GET_LIST_TAKELEAVE_MANAGER ===========>', response);
    if (
      response.success &&
      response.statusCode === 200 &&
      response.data &&
      response.data.length > 0
    ) {
      setData(_data.concat(response.data));
      setPage(pageNumber);
      setLoading(false);
    } else {
      setLoading(false);
    }
  };
  const handleLoadMore = () => {
    setLoading(true);
    getData(page + 1, filter.date, filter.status, data, filter.name);
  };
  //saga
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
    console.log(moment(date).format('DD/MM/YYYY'));
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
  //saga
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
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    ) : null;
  };
  const onConfirm = async (item) => {
    const apiURL = `${URL.LOCAL_HOST}${URL.AD}`;
    const body = {
      _id: item._id,
      status: 2,
    };
    const response = await _POST(apiURL, body, token);
    console.log('_APPROVE_BREAK =============>', response);
    if (response.success && response.statusCode === 200 && response.data) {
      setData(
        data.map((i) => (i._id === response.data._id ? response.data : i)),
      );
    } else {
      _global.Alert.alert({
        title: langs.alert.notify,
        message: langs.alert.approveFail,
        // messageColor: Colors.danger,
        leftButton: {text: langs.alert.ok},
      });
    }
  };

  const onDeny = async (item) => {
    const apiURL = `${URL.LOCAL_HOST}${URL.APPROVE_OVERTIME}`;
    const body = {
      _id: item._id,
      status: 3,
    };
    const response = await _POST(apiURL, body, token);
    console.log('_APPROVE_OT =============>', response);
    if (response.success && response.statusCode === 200 && response.data) {
      setData(
        data.map((i) => (i._id === response.data._id ? response.data : i)),
      );
    } else {
      _global.Alert.alert({
        title: langs.alert.notify,
        message: langs.alert.approveFail,
        // messageColor: Colors.danger,
        leftButton: {text: langs.alert.ok},
      });
    }
  };

  const renderItem = ({item, index}) => {
    const _listDate = item.date.map((i) =>
      moment(i, 'DD/MM/YYYY').format('DD/MM/YYYY'),
    );
    return (
      <CardBreak
        leader={true}
        name={item.fullname}
        status={item.status}
        type={item.type}
        date={_listDate.toString()}
        reason={item.content}
        onDeny={() => onDeny(item)}
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
        search
      />
      <View style={{flex: 1}}>
        {data.length === 0 ? (
          <Text style={styles.noData}>Không có lịch sử.</Text>
        ) : (
          <FlatList
            //saga
            // data={historyAdminTakeLeave}

            onEndReached={!loading ? handleLoadMore : null}
            onEndReachedThreshold={0.5}
            ListFooterComponent={renderFooterComponent}
            data={data}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderItem}
          />
        )}
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
