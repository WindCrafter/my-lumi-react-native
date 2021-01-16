import React, { useState, useEffect } from 'react';
import {
  Platform,
  StyleSheet,
  View,
  ActivityIndicator,
  Text,
  RefreshControl,
  TouchableOpacity,
  UIManager,
  FlatList,
} from 'react-native';
import moment from 'moment';
import Icon from 'react-native-vector-icons/Feather';
import { Colors } from '../../../../utlis';
import langs from '../../../../common/language';
import CardBreakAll from './components/CardBreakAll';
// import FilterTop from './component/FilterTop';
import { _GET, _POST } from '../../../../utlis/connection/api';
import { URL_STAGING } from '../../../../utlis/connection/url';
import { _global } from '../../../../utlis/global/global';

if (
  Platform.OS === 'android'
  && UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}
const AllBreak = (props) => {
  const {
    navigation,
    token,
  } = props;

  const [date, setDate] = useState('');
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const [type, setType] = useState('Tất cả');
  const [refresh, setRefresh] = useState(false);
  const [onScroll, setOnScroll] = useState(false);
  useEffect(() => {
    getData(1, '', '');
    console.log('onmei');
  }, []);

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
  const getData = async (pageNumber, dateN, nameN, dataN) => {
    const _date = dateN || '';
    const _name = nameN || '';

    const _dataN = dataN || [];
    const apiURL = `${URL_STAGING.LOCAL_HOST}${URL_STAGING.ALL_LIST_TAKE_LEAVE}?page=${pageNumber}&page_size=20&date=${_date}&fullname=${_name}`;
    const response = await _GET(apiURL, token, false);
    console.log('_GET_ALL_LIST_TAKE_LEAVE ===========>', response);
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
    console.log('typeheader', item);
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

  const onChangeStatus = (item) => {
    setData([]);
    setPage(1);
    getData(1, date, item, []);
    onSetType(item);
  };

  const onChangeDate = (datePick) => {
    setData([]);
    setPage(1);
    getData(1, !datePick ? '' : moment(date).format('DD/MM/YYYY'), status, []);
    setDate(!datePick ? '' : date);
  };

  const renderItem = ({ item }) => {
    const _listDate = item.date.map((i) => moment(i, 'DD/MM/YYYY').format(' DD/MM/YYYY'),);
    return (
      <CardBreakAll
        status={item.status}
        type={item.type}
        date={_listDate}
        reason={item.content}
        name={item.fullname}
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

  return (
    <>
      {/* <FilterTop
        title={langs.titleHistoryBreak}
        goBack={goBack}
        fontSize={24}
        onChangeStatus={onChangeStatus}
        onChangeDate={onChangeDate}
        type={type}
        backgroundColor={Colors.white}
        initDate={localDate}
      /> */}
      <View style={styles.backGround}>
        {data.length === 0 && (
          <Text style={styles.noData}>Không có lịch sử.</Text>
        )}
        <FlatList
          data={data}
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
        //   renderHiddenItem={renderHiddenItem}
        //   leftOpenValue={75}
        //   rightOpenValue={-150}
        //   disableRightSwipe
        //   swipeToOpenPercent={20}

          // previewRowKey="0"
          // previewOpenValue={-40}
          // previewOpenDelay={1000}
          // onRowOpen={onRowDidOpen}
          // swipeGestureBegan={onSwipeGestureBegan}
        />
      </View>
    </>
  );
};

export default AllBreak;

const styles = StyleSheet.create({
  noData: { fontSize: 16, alignSelf: 'center', marginTop: 24 },
  backTextWhite: {
    color: '#FFF',
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
  backGround: { flex: 1, backgroundColor: '#f0f0f0' },
});
