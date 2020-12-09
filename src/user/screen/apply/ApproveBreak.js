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

const DATA = [
  {name: 'Do Tuan Phong', id: '1', status: 1, type: 1},
  {name: 'Do Tuan Phong', id: '2', status: 2, type: 2},
  {name: 'Do Tuan Phong', id: '3', status: 3, type: 1},
  {name: 'Do Tuan Phong', id: '4', status: 1, type: 2},
  {name: 'Do Tuan Phong', id: '5', status: 2, type: 1},
  {name: 'Do Tuan Phong', id: '6', status: 3, type: 1},
  {name: 'Do Tuan Phong', id: '7', status: 2, type: 1},
  {name: 'Do Tuan Phong', id: '8', status: 1, type: 1},
  {name: 'Do Tuan Phong', id: '9', status: 1, type: 1},
];

const ApproveBreak = (props) => {
  const {navigation, listAdminTakeLeave, token, historyAdminTakeLeave} = props;
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState({});
  const [type, setType] = useState('Tất cả');
  useEffect(() => {
    getData();
  }, [page]);
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
  const getData = () => {
    // const status = filter.status || '';
    // const date = filter.date || '';
    // const name = filter.name || '';
    // const apiURL = `${URL.LOCAL_HOST}${URL.GET_LIST_OVERTIME}?page=${page}&?status=${status}&?date=${date}`;
    // const apiURL = `https://jsonplaceholder.typicode.com/photos?_limit=10&page=${page}`;
    // console.log(apiURL);
    // fetch(apiURL).then((res) => {
    //   setData(
    //     data.concat([
    //       { ...item1, id: Math.random().toString(36).substr(2, 9) },
    //       { ...item, id: Math.random().toString(36).substr(2, 9) },
    //       { ...item2, id: Math.random().toString(36).substr(2, 9) },
    //     ]),
    //   );
    //   setLoading(false);
    // });
    const dataLeave = {
      status: 0,
      page: page,
      token: token,
    };
    listAdminTakeLeave(dataLeave);
  };
  const onApplyLate = () => {
    navigation.navigate(langs.navigator.applyLate);
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
      date: date ? moment(pickDate).format('DD/MM/YYYY') : null,
    };
    listAdminTakeLeave(dataLeave);
  };
  const onChangeName = (item) => {
    setFilter({...filter, name: item});
    setData([]);
    setPage(1);
    getData();
  };
  const onChangeStatus = (item) => {
    setFilter({...filter, status: item});
    setData([]);
    setPage(1);
    const dataLeave = {
      status: item,
      page: page,
      token: token,
    };
    listAdminTakeLeave(dataLeave);
    onSetType(item);
  };
  const renderItem = ({item, index}) => {
    const _listDate = item.date.map((i) =>
      moment(i, 'DD/MM/YYYY').format('DD/MM '),
    );
    console.log(item.date);
    console.log(item.date.length)
    return (
      <CardBreak
        leader={true}
        status={item.status}
        type={item.type}
        date={_listDate.toString()}
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
      <View style={{flex:1}}>
        <FlatList
          data={historyAdminTakeLeave}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
        />
      </View>
    </>
  );
};

export default ApproveBreak;

const styles = StyleSheet.create({});
