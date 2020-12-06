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
const item0 = {
  status: 1,
  date: '21/09/2020',
  time: '0.5',
  content: 'Sửa lỗi phát sinh trên UI',
};
const item1 = {
  status: 2,
  date: '21/09/2020',
  time: '0.5',
  content: 'Sửa lỗi phát sinh trên UI',
};
const item2 = {
  status: 3,
  date: '21/09/2020',
  time: '0.5',
  content: 'Sửa lỗi phát sinh trên UI',
};
const HistoryBreak = (props) => {
  const {navigation} = props;
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState({});
  const [type, setType] = useState('Tất cả');

  useEffect(() => {
    getData();
  }, [page]);
  const getData = async (callback) => {
    // const status = filter.status || '';
    // const date = filter.date || '';
    // const apiURL = `${URL.LOCAL_HOST}${URL.GET_LIST_OVERTIME}?page=${page}&?status=${status}&?date=${date}`;
    const apiURL = `https://jsonplaceholder.typicode.com/photos?_limit=10&page=${page}`;
    console.log(apiURL);
    fetch(apiURL).then((res) => {
      setData(data.concat([item0, item1, item2]));
      setLoading(false);
    });
  };
  const handleLoadMore = () => {
    setPage(page + 1);
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
  const onChangeStatus = (item) => {
    console.log(item);
    setFilter({...filter, status: item});
    setData([]);
    setPage(1);
    getData();
    onSetType(item);
  };
  const onChangeDate = (date) => {
    const pickDate = moment(date, 'DD/MM/YYYY').toDate();
    console.log(moment(pickDate).format('DD/MM/YYYY'));
    setFilter({...filter, date: moment(pickDate).format('DD/MM/YYYY')});
    setData([]);
    setPage(1);
    getData();
  };
  const renderItem = ({item, index}) => {
    return <CardBreak leader={false} status={item.status} type={item.type} />;
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
      <View>
        <FlatList
          data={DATA}
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
