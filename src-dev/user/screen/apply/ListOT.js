import React, {useState, useEffect} from 'react';
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
} from 'react-native';
import moment from 'moment';
import langs from '../../../../common/language';
import {BarStatus} from '../../../component';
import {Colors} from '../../../../utlis';
import ItemOT from './component/ItemOT';
import {FlatList} from 'react-native-gesture-handler';
import ActionButton from './component/ActionButton';
import {URL_STAGING} from '../../../../utlis/connection/url';
import HeaderCustom from './component/HeaderCustom';
import {_GET} from '../../../../utlis/connection/api';

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
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
  const {navigation, token} = props;
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

  const renderItem = ({item}) => {
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
      response.success &&
      response.statusCode === 200 &&
      response.data &&
      response.data.length > 0
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
    }
  };

  const onChangeStatus = (item) => {
    setStatus(item);
    setData([]);
    setPage(1);
    getData(1, date, item, []);
    onSetType(item);
  };

  return (
    <>
      <BarStatus
        backgroundColor={Colors.white}
        height={Platform.OS === 'ios' ? 46 : StatusBar.currentHeight}
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
      <View style={[styles.detail, data.length === 0 && {flex: 1}]}>
        {data.length === 0 && (
          <Text style={styles.noData}>Không có lịch sử</Text>
        )}
        <FlatList
          data={data}
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
        />
      </View>
      <ActionButton onApply={onPressCreate} onApprove={onPressConfirm} />
    </>
  );
}

export default ListOT;

const styles = StyleSheet.create({
  detail: {
    marginTop: 32,
  },
  noData: {
    fontSize: 16,
    alignSelf: 'center',
    marginTop: 24,
  },
});
